import fs from "fs";
import hre from "hardhat";
import { Address, getAddress } from "viem";

const generatedPath = `${__dirname}/../../web/src/generated`;

async function deploy(
  deployerAddress: Address,
  contractName: string,
  args: any[]
) {
  console.log(
    `Deploying the contracts ${contractName} with the account: ${deployerAddress}`
  );

  const contract = await hre.viem.deployContract(contractName, args);
  console.log(`Contract address: ${contract.address}`);

  if (!fs.existsSync(generatedPath)) {
    fs.mkdirSync(generatedPath);
  }

  const data = {
    address: contract.address,
    abi: contract.abi,
  };

  fs.writeFileSync(
    `${generatedPath}/${contractName}.ts`,
    `export default ${JSON.stringify(data, null, 2)} as const\n`
  );
}

async function main() {
  const [deployer, _] = await hre.viem.getWalletClients();
  const deployerAddress = getAddress(deployer.account.address);
  await deploy(deployerAddress, "Unidocs", []);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
