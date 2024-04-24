export default {
  "address": "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "inputs": [],
      "name": "fileCount",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "getFiles",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "fileId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdAt",
              "type": "uint256"
            }
          ],
          "internalType": "struct Unidocs.File[]",
          "name": "",
          "type": "tuple[]"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "createdBy",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "versionId",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "ipfs",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "filesize",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "mimetype",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "checksum",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "createdAt",
              "type": "uint256"
            }
          ],
          "internalType": "struct Unidocs.FileVersion[][]",
          "name": "",
          "type": "tuple[][]"
        },
        {
          "components": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            },
            {
              "internalType": "enum Unidocs.Access",
              "name": "access",
              "type": "uint8"
            }
          ],
          "internalType": "struct Unidocs.AccountAccess[][]",
          "name": "",
          "type": "tuple[][]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fileId",
          "type": "uint256"
        }
      ],
      "name": "getfileVersions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "createdBy",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "versionId",
              "type": "uint256"
            },
            {
              "internalType": "string[]",
              "name": "ipfs",
              "type": "string[]"
            },
            {
              "internalType": "string",
              "name": "filename",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "filesize",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "description",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "mimetype",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "checksum",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "createdAt",
              "type": "uint256"
            }
          ],
          "internalType": "struct Unidocs.FileVersion[]",
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
          "internalType": "uint256",
          "name": "_fileId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        }
      ],
      "name": "revokeAccess",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fileId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_account",
          "type": "address"
        },
        {
          "internalType": "enum Unidocs.Access",
          "name": "_access",
          "type": "uint8"
        }
      ],
      "name": "shareFile",
      "outputs": [],
      "stateMutability": "payable",
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
          "internalType": "string",
          "name": "_description",
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
        },
        {
          "internalType": "uint256",
          "name": "_createdAt",
          "type": "uint256"
        }
      ],
      "name": "storeFile",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_fileId",
          "type": "uint256"
        }
      ],
      "name": "transferFile",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_fileId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_filename",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
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
        },
        {
          "internalType": "uint256",
          "name": "_createdAt",
          "type": "uint256"
        }
      ],
      "name": "updateFile",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]
} as const
