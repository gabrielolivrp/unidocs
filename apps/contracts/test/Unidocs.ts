import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { getAddress } from "viem";
import hre from "hardhat";

describe("Unidocs", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const unidocs = await hre.viem.deployContract("Unidocs", []);
    const publicClient = await hre.viem.getPublicClient();
    return {
      owner,
      unidocs,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { unidocs, owner } = await loadFixture(deployFixture);
      expect(await unidocs.read.owner()).to.equal(
        getAddress(owner.account.address)
      );
    });
  });
});
