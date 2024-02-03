// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

// import "hardhat/console.sol";

contract Unidocs {
  struct Document {
    uint256 tokenId;
    string filename;
    string checksum;
    string mimetype;
    uint256 filesize;
    string[] ipfs;
  }

  address public owner;
  uint256 public total = 0;
  mapping(address => Document[]) private ownerDocuments;
  mapping(uint256 => address) private documentOwners;

  event DocumentStored(
    address indexed owner,
    uint256 indexed tokenId,
    string filename,
    string checksum,
    string mimetype,
    uint256 filesize,
    string[] ipfs
  );

  constructor() {
    owner = msg.sender;
  }

  receive() external payable {}

  fallback() external payable {}
  
  function storeDocument(
    string memory _filename,
    string[] memory _ipfs,
    string memory _checksum,
    string memory _mimetype,
    uint256 _filesize
  ) public {
    Document memory document = Document({
      tokenId: total,
      filename: _filename,
      checksum: _checksum,
      mimetype: _mimetype,
      filesize: _filesize,
      ipfs: _ipfs
    });

    ownerDocuments[msg.sender].push(document);
    documentOwners[total] = msg.sender;
    total++;

    emit DocumentStored(msg.sender, total, _filename, _checksum, _mimetype, _filesize, _ipfs);
  }

  function getDocuments(address account) public view returns (Document[] memory) {
    return ownerDocuments[account];
  }

  function getDocument(uint256 tokenId) public view returns (Document memory) {
    require(documentOwners[tokenId] != address(0), "Not found");
    address account = documentOwners[tokenId];
    return _findDocumentByToken(ownerDocuments[account], tokenId);
  }

  function _findDocumentByToken(Document[] memory documents, uint256 tokenId) private pure returns (Document memory) {
    for (uint i = 0; i < documents.length; i++) {
      if (documents[i].tokenId == tokenId) {
        return documents[i];
      }
    }
    revert("Document not found");
  }
}