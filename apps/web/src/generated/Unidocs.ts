export default {
  "address": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "filename",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "checksum",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "mimetype",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "filesize",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string[]",
          "name": "ipfs",
          "type": "string[]"
        }
      ],
      "name": "DocumentStored",
      "type": "event"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getDocument",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "checksum",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "mimetype",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "filesize",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "ipfs",
              "type": "string[]"
            }
          ],
          "internalType": "struct Unidocs.Document",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getDocuments",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "checksum",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "mimetype",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "filesize",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "ipfs",
              "type": "string[]"
            }
          ],
          "internalType": "struct Unidocs.Document[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_filename",
          "type": "string"
        },
        {
          "internalType": "string[]",
          "name": "_ipfs",
          "type": "string[]"
        },
        {
          "internalType": "string",
          "name": "_checksum",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_mimetype",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_filesize",
          "type": "uint256"
        }
      ],
      "name": "storeDocument",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "total",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
} as const
