// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

contract Unidocs {
  struct FileVersion {
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

  enum Access {
    WRITE,
    READ
  }

  struct AccountAccess {
    address account;
    Access access;
  }

  address public owner;

  uint256 public fileCount = 0;

  mapping(uint256 => address) private fileOwners;
  mapping(address => File[]) private ownerFiles;
  mapping(uint256 => FileVersion[]) private fileVersions;
  mapping(uint256 => AccountAccess[]) private fileAccess;
  mapping(address => uint256[]) private accountFiles;

  event FileCreated(uint256 indexed fileId, address indexed owner);
  event FileUpdated(uint256 indexed fileId, address indexed owner);
  event FileTransferred(uint256 indexed fileId, address indexed previousOwner, address indexed newOwner);
  event FileAccessShared(uint256 indexed fileId, address indexed owner, address indexed account, Unidocs.Access access);
  event FileAccessRevoked(uint256 indexed fileId, address indexed owner, address indexed account);
  event FileAccessUpdated(uint256 indexed fileId, address indexed owner, address indexed account);

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
    address _owner = msg.sender;
    uint256 fileId = fileCount + 1;

    File memory doc = File({
      fileId: fileId,
      owner: _owner,
      createdAt: _createdAt
    });

    FileVersion memory version = FileVersion({
      versionId: 1,
      createdBy: msg.sender,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      ipfs: _ipfs,
      createdAt: _createdAt
    });

    AccountAccess memory access = AccountAccess({
      account: _owner,
      access: Access.WRITE
    });

    ownerFiles[_owner].push(doc);
    fileVersions[fileId].push(version);
    fileOwners[fileId] = _owner;
    accountFiles[_owner].push(fileId);
    fileAccess[fileId].push(access);

    fileCount += 1;

    emit FileCreated(fileId, _owner);
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
    require(fileOwners[_fileId] != address(0), "File not found");
    require(_hasAccess(_fileId, msg.sender) == Access.WRITE || fileOwners[_fileId] == msg.sender, "No write permission");

    uint256 versionId = fileVersions[_fileId].length + 1;

    FileVersion memory newVersion = FileVersion({
      createdBy: msg.sender,
      versionId: versionId,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      ipfs: _ipfs,
      createdAt: _createdAt
    });

    fileVersions[_fileId].push(newVersion);

    emit FileUpdated(_fileId, msg.sender);
  }

  function transferFile(address _to, uint256 _fileId) public {
    require(fileOwners[_fileId] != address(0), "File not found");
    require(fileOwners[_fileId] == msg.sender, "Not the File owner");
    uint256 index = _findFileIndex(ownerFiles[msg.sender], _fileId);
    require(index < ownerFiles[msg.sender].length, "Invalid File index");

    File memory file = ownerFiles[msg.sender][index];
    ownerFiles[msg.sender][index] = ownerFiles[msg.sender][ownerFiles[msg.sender].length - 1];
    ownerFiles[msg.sender].pop();

    file.owner = _to;
    ownerFiles[_to].push(file);
    fileOwners[_fileId] = _to;

    emit FileTransferred(_fileId, msg.sender, _to);
  }

  function shareFile(uint256 _fileId, address _account, Access _access) public {
    require(fileOwners[_fileId] != address(0), "File not found");
    require(fileOwners[_fileId] == msg.sender, "Not the File owner");
    require(_account != msg.sender, "Cannot share with owner");

    accountFiles[_account].push(_fileId);
    AccountAccess memory access = AccountAccess({
      account: _account,
      access: _access
    });
    fileAccess[_fileId].push(access);

    emit FileAccessShared(_fileId, msg.sender, _account, _access);
  }

  function revokeAccess(uint256 _fileId, address _account) public {
    require(fileOwners[_fileId] != address(0), "File not found");
    require(fileOwners[_fileId] == msg.sender, "Not the File owner");
    require(_account != msg.sender, "Cannot revoke owner's access");

    uint256 accessIndex = _findAccessIndex(_fileId, _account);
    require(accessIndex < fileAccess[_fileId].length, "Access not found");

    for (uint256 i = accessIndex; i < fileAccess[_fileId].length - 1; i++) {
      fileAccess[_fileId][i] = fileAccess[_fileId][i + 1];
    }
    fileAccess[_fileId].pop();

    uint256 userAccessIndex = _findUserAccessIndex(_account, _fileId);
    if (userAccessIndex < accountFiles[_account].length) {
      for (uint256 j = userAccessIndex; j < accountFiles[_account].length - 1; j++) {
        accountFiles[_account][j] = accountFiles[_account][j + 1];
      }
      accountFiles[_account].pop();
    }

    emit FileAccessRevoked(_fileId, msg.sender, _account);
  }

  function accessUpdate(uint256 _fileId, address _account, Access _access) public {
    require(fileOwners[_fileId] != address(0), "File not found");
    require(fileOwners[_fileId] == msg.sender, "Not the File owner");
    require(_account != msg.sender, "Cannot revoke owner's access");

    uint256 accessIndex = _findAccessIndex(_fileId, _account);
    require(accessIndex < fileAccess[_fileId].length, "Access not found");

    fileAccess[_fileId][accessIndex].access = _access;

    emit FileAccessUpdated(_fileId, msg.sender, _account);
  }

  function getfileVersions(uint256 _fileId) public view returns (FileVersion[] memory) {
    return fileVersions[_fileId];
  }

  function getFiles(address _account) public view returns (File[] memory, FileVersion[][] memory, AccountAccess[][] memory) {
    File[] memory docs = new File[](accountFiles[_account].length);
    FileVersion[][] memory versions = new FileVersion[][](docs.length);
    AccountAccess[][] memory accesses = new AccountAccess[][](docs.length);

    for (uint256 i = 0; i < accountFiles[_account].length; i++) {
      uint256 fileId = accountFiles[_account][i];
      uint256 index = _findFileIndex(ownerFiles[fileOwners[fileId]], fileId);
      docs[i] = ownerFiles[fileOwners[fileId]][index];
      versions[i] = fileVersions[fileId];
      accesses[i] = fileAccess[fileId];
    }

    return (docs, versions, accesses);
  }

  function _findFileIndex(File[] memory docs, uint256 _fileId) private pure returns (uint256) {
    for (uint256 i = 0; i < docs.length; i++) {
      if (docs[i].fileId == _fileId) {
        return i;
      }
    }
    revert("File not found");
  }

  function _hasAccess(uint256 _fileId, address _account) private view returns (Access) {
    for (uint i = 0; i < fileAccess[_fileId].length; i++) {
      if (fileAccess[_fileId][i].account == _account) {
        return fileAccess[_fileId][i].access;
      }
    }
    revert("No access");
  }

  function _findAccessIndex(uint256 _fileId, address _account) private view returns (uint256) {
    for (uint256 i = 0; i < fileAccess[_fileId].length; i++) {
      if (fileAccess[_fileId][i].account == _account) {
        return i;
      }
    }
    return fileAccess[_fileId].length;
  }

  function _findUserAccessIndex(address _account, uint256 _fileId) private view returns (uint256) {
    for (uint256 i = 0; i < accountFiles[_account].length; i++) {
      if (accountFiles[_account][i] == _fileId) {
        return i;
      }
    }
    return accountFiles[_account].length;
  }
}
