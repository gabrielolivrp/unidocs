import fs from "fs";
import { ethers } from "hardhat";

import * as types from "../typechain";

const generatedPath = `${__dirname}/../../web/generated`;

async function deploy(
  contractName: string,
  args: Array<unknown>,
  deployerAddress: string
) {
  console.log(
    `Deploying the contracts ${contractName} with the account: ${deployerAddress}`
  );

  const contract = await ethers.deployContract(contractName, args);
  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log(`Contract address: ${contractAddress}`);

  const factory = types[
    `${contractName}__factory` as keyof typeof types
  ] as any;

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath);
  }

  const data = {
    address: contractAddress,
    abi: factory.abi,
  };

  fs.writeFileSync(
    `${generatedPath}/${contractName}.ts`,
    `export default ${JSON.stringify(data, null, 2)} as const\n`
  );
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();

  await deploy("Greeter", ["Hello, Hardhat!"], deployerAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
