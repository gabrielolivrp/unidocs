export default {
  "address": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "oldGreeting",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newGreeting",
          "type": "string"
        }
      ],
      "name": "GreetingChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
} as const
