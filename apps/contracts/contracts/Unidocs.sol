// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Unidocs {
  struct Version {
    uint versionId;
    string[] ipfs;
    string filename;
    uint256 filesize;
    string description;
    string mimetype;
    string checksum;
    uint createdAt;
  }

  struct Document {
    uint256 fileId;
    address owner;
    uint256 totalVersions;
    uint createdAt;
  }

  address public owner;
  uint256 public totalDocuments = 0;

  // owner => documents
  mapping(address => Document[]) private ownerDocuments;
  // fileId => versions
  mapping(uint256 => Version[]) private documentVersions;
  // fileId => owner
  mapping(uint256 => address) private documentOwners;

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {}

  fallback() external payable {}

  function storeDocument(
    string memory _filename,
    string memory  _description,
    string[] memory _ipfs,
    string memory _checksum,
    string memory _mimetype,
    uint256 _filesize
  ) public payable {
    Document memory document = Document({
      fileId: totalDocuments,
      owner: msg.sender,
      totalVersions: 1,
      createdAt: _getCurrentTime()
    });

    Version memory newVersion = Version({
      versionId: 1,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      ipfs: _ipfs,
      createdAt: _getCurrentTime()
    });

    ownerDocuments[msg.sender].push(document);
    documentVersions[totalDocuments].push(newVersion);
    documentOwners[totalDocuments] = msg.sender;

    totalDocuments++;
  }

  function updateDocument(
    uint256 _fileId,
    string memory _filename,
    string memory _description,
    string[] memory _ipfs,
    string memory _checksum,
    string memory _mimetype,
    uint256 _filesize
  ) public payable {
    require(documentOwners[_fileId] != address(0), "Document not found");
    require(documentOwners[_fileId] == msg.sender, "You are not the owner of this document");

    Version memory newVersion = Version({
      versionId: ownerDocuments[msg.sender][_fileId].totalVersions + 1,
      filename: _filename,
      description: _description,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      ipfs: _ipfs,
      createdAt: _getCurrentTime()
    });

    ownerDocuments[msg.sender][_fileId].totalVersions += 1;
    documentVersions[_fileId].push(newVersion);
  }

  function transferDocument(address _to, uint256 _fileId) public {
    require(documentOwners[_fileId] == msg.sender, "You are not the owner of this document");
    uint256 index = _findDocumentIndexByToken(ownerDocuments[msg.sender], _fileId);
    require(index < ownerDocuments[msg.sender].length, "Document index out of bounds");

    Document memory document = ownerDocuments[msg.sender][index];
    for (uint256 i = index; i < ownerDocuments[msg.sender].length - 1; i++) {
      ownerDocuments[msg.sender][i] = ownerDocuments[msg.sender][i + 1];
    }
    ownerDocuments[msg.sender].pop();

    document.owner = _to;
    ownerDocuments[_to].push(document);
    documentOwners[_fileId] = _to;
  }

  function getDocumentVersions(uint256 _fileId) public view returns (Version[] memory) {
    return documentVersions[_fileId];
  }

  function getDocuments(address _account) public view returns (Document[] memory, Version[][] memory) {
    Document[] memory documents = ownerDocuments[_account];
    Version[][] memory versions = new Version[][](documents.length);

    for (uint256 i = 0; i < documents.length; i++) {
      uint256 fileId = documents[i].fileId;
      versions[i] = documentVersions[fileId];
    }

    return (documents, versions);
  }

  function getDocument(uint256 _fileId) public view returns (Document memory, Version[] memory) {
    require(documentOwners[_fileId] != address(0), "Not found");
    address account = documentOwners[_fileId];
    uint256 index = _findDocumentIndexByToken(ownerDocuments[account], _fileId);
    return (ownerDocuments[account][index], documentVersions[_fileId]);
  }

  function _findDocumentIndexByToken(Document[] memory documents, uint256 _fileId) private pure returns (uint256) {
    for (uint256 i = 0; i < documents.length; i++) {
      if (documents[i].fileId == _fileId) {
        return i;
      }
    }
    revert("Document not found");
  }

  function _getCurrentTime() public view returns(uint){
    return block.timestamp;
  }
}
