// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

contract Unidocs {
  enum Permission {
    READ,
    WRITE
  }

  struct AccessControl {
    address account;
    Permission permission;
  }

  struct Version {
    address createdBy;
    uint versionId;
    string[] ipfs;
    string filename;
    uint256 filesize;
    string description;
    string mimetype;
    string checksum;
    uint createdAt;
  }

  struct File {
    uint256 fileId;
    address owner;
    uint createdAt;
  }

  /// @dev The owner of the contract.
  address public owner;

  /// @dev Current fileId, used as token id.
  uint256 public fileId = 0;

  /// @dev Mapping of fileId to address.
  mapping(uint256 => address) private fileAccount;

  /// @dev Mapping of address to files.
  mapping(address => File[]) private accountFiles;

  /// @dev Mapping of address to fileIds.
  mapping(address => uint256[]) private accessibleFiles;

  /// @dev Mapping of fileId to file versions.
  mapping(uint256 => Version[]) private fileVersions;

  /// @dev Mapping of fileId to access control.
  mapping(uint256 => AccessControl[]) private accessControls;

  /// @dev Emitted when file is created.
  event FileCreated(uint256 indexed fileId, address indexed owner);

  /// @dev Emitted when file is updated.
  event FileUpdated(uint256 indexed fileId, address indexed owner);

  /// @dev Emitted when file is trasferred.
  event FileTransferred(uint256 indexed fileId, address indexed previousOwner, address indexed newOwner);

  /// @dev Emitted when file is shared.
  event FileAccessShared(uint256 indexed fileId, address indexed owner, address indexed account, Permission permission);

  /// @dev Emitted when file access is revoked.
  event FileAccessRevoked(uint256 indexed fileId, address indexed owner, address indexed account);

  /// @dev Emitted when file access is updated.
  event AccessPermissionUpdated(uint256 indexed fileId, address indexed owner, address indexed account);

  /// @dev Emitted when `msg.sender` is not authorized to operate the contract.
  error Unauthorized(address operator);

  /// @dev Emitted when file is not found.
  error FileNotFound(uint256 fileId);

  constructor() {
    owner = msg.sender;
  }

  function storeFile(
    string memory _filename,
    string memory _description,
    string[] memory _ipfs,
    string memory _checksum,
    string memory _mimetype,
    uint256 _filesize,
    uint _createdAt
  ) public {
    uint256 _fileId = fileId + 1;
    address _owner = msg.sender;

    File memory _file = File({
      fileId: _fileId,
      owner: _owner,
      createdAt: _createdAt
    });

    Version memory _version = Version({
      versionId: 1,
      createdBy: _owner,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      createdAt: _createdAt,
      ipfs: _ipfs
    });

    AccessControl memory _accessControl = AccessControl({
      account: _owner,
      permission: Permission.WRITE
    });

    fileAccount[_fileId] = _owner;
    fileVersions[_fileId].push(_version);
    accessibleFiles[_owner].push(_fileId);
    accountFiles[_owner].push(_file);
    accessControls[_fileId].push(_accessControl);

    fileId += 1;

    emit FileCreated(_fileId, _owner);
  }

  function updateFile(
    uint256 _fileId,
    string memory _filename,
    string memory _description,
    string[] memory _ipfs,
    string memory _checksum,
    string memory _mimetype,
    uint256 _filesize,
    uint _createdAt
  ) public {
    address _createdBy = msg.sender;

    if (fileAccount[_fileId] == address(0)) {
      revert FileNotFound(_fileId);
    }

    (, AccessControl memory _accessControl) = _findAccessControl(_fileId, _createdBy);
    if (_accessControl.permission != Permission.WRITE) {
      revert Unauthorized(_createdBy);
    }

    uint256 _versionId = fileVersions[_fileId].length + 1;
    Version memory newVersion = Version({
      createdBy: _createdBy,
      versionId: _versionId,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      createdAt: _createdAt,
      ipfs: _ipfs
    });

    fileVersions[_fileId].push(newVersion);

    emit FileUpdated(_fileId, msg.sender);
  }

  function transferFile(address _to, uint256 _fileId) public {
    address _owner = msg.sender;
    if (fileAccount[_fileId] == address(0)) {
      revert FileNotFound(_fileId);
    }

    if (fileAccount[_fileId] != _owner) {
      revert Unauthorized(_owner);
    }

    (uint256 fileIndex, File memory file) = _findFile(_fileId);
    for (uint256 i = fileIndex; i < accountFiles[_owner].length - 1; i++) {
      accountFiles[_owner][i] = accountFiles[_owner][i + 1];
    }
    accountFiles[_owner].pop();

    file.owner = _to;
    fileAccount[_fileId] = _to;
    accountFiles[_to].push(file);

    emit FileTransferred(_fileId, _owner, _to);
  }

  function shareFile(uint256 _fileId, address _account, Permission _permission) public {
    address _owner = msg.sender;
    if (fileAccount[_fileId] == address(0)) {
      revert FileNotFound(_fileId);
    }

    if (fileAccount[_fileId] != _owner || _account == _owner) {
      revert Unauthorized(_owner);
    }

    AccessControl memory _accessControl = AccessControl({
      account: _account,
      permission: _permission
    });
    accessibleFiles[_account].push(_fileId);
    accessControls[_fileId].push(_accessControl);

    emit FileAccessShared(_fileId, _owner, _account, _permission);
  }

  function revokeFileAccess(uint256 _fileId, address _account) public {
    address _owner = msg.sender;
    if (fileAccount[_fileId] == address(0)) {
      revert FileNotFound(_fileId);
    }

    if (fileAccount[_fileId] != _owner || _account == _owner) {
      revert Unauthorized(_owner);
    }

    (uint256 accessControlIndex,) = _findAccessControl(_fileId, _account);
    for (uint256 i = accessControlIndex; i < accessControls[_fileId].length - 1; i++) {
      accessControls[_fileId][i] = accessControls[_fileId][i + 1];
    }
    accessControls[_fileId].pop();

    (uint256 accessibleFileIndex, )= _findAccessibleFile(_fileId, _account);
    for (uint256 j = accessibleFileIndex; j < accessibleFiles[_account].length - 1; j++) {
      accessibleFiles[_account][j] = accessibleFiles[_account][j + 1];
    }
    accessibleFiles[_account].pop();

    emit FileAccessRevoked(_fileId, msg.sender, _account);
  }

  function updateAccessPermission(uint256 _fileId, address _account, Permission _permission) public {
    address _owner = msg.sender;
    if (fileAccount[_fileId] == address(0)) {
      revert FileNotFound(_fileId);
    }

    if (fileAccount[_fileId] != _owner || _account == _owner) {
      revert Unauthorized(_owner);
    }

    (uint256 accessControlIndex,) = _findAccessControl(_fileId, _account);
    accessControls[_fileId][accessControlIndex].permission = _permission;

    emit AccessPermissionUpdated(_fileId, _owner, _account);
  }

  function getFiles(address _account) public view returns (File[] memory, Version[][] memory, AccessControl[][] memory) {
    File[] memory _files = new File[](accessibleFiles[_account].length);
    Version[][] memory _versions = new Version[][](_files.length);
    AccessControl[][] memory _accessControls = new AccessControl[][](_files.length);

    for (uint256 i = 0; i < accessibleFiles[_account].length; i++) {
      uint256 _fileId = accessibleFiles[_account][i];
      (, File memory file) = _findFile(_fileId);
      _versions[i] = fileVersions[_fileId];
      _accessControls[i] = accessControls[_fileId];
      _files[i] = file;
    }

    return (_files, _versions, _accessControls);
  }

  function _findAccessibleFile(uint256 _fileId, address _account) private view returns (uint256, uint256) {
    for (uint256 i = 0; i < accessibleFiles[_account].length; i++) {
      if (accessibleFiles[_account][i] == _fileId) {
        return (i, accessibleFiles[_account][i]);
      }
    }
    revert Unauthorized(_account);
  }

  function _findFile(uint256 _fileId) private view returns (uint256, File memory) {
    File[] memory files = accountFiles[fileAccount[_fileId]];
    for (uint256 i = 0; i < files.length; i++) {
      if (files[i].fileId == _fileId) {
        return (i, files[i]);
      }
    }
    revert FileNotFound(_fileId);
  }

  function _findAccessControl(uint256 _fileId, address _account) private view returns (uint256, AccessControl memory) {
    for (uint256 i = 0; i < accessControls[_fileId].length; i++) {
      if (accessControls[_fileId][i].account == _account) {
        return (i, accessControls[_fileId][i]);
      }
    }
    revert Unauthorized(_account);
  }
}
