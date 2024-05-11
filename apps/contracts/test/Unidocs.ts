import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import { getAddress } from "viem";
import hre from "hardhat";

describe("Unidocs", function () {
  async function deployFixture() {
    const [owner, otherAccount, otherAccount2] =
      await hre.viem.getWalletClients();

    const unidocs = await hre.viem.deployContract("Unidocs", []);
    const publicClient = await hre.viem.getPublicClient();
    return {
      owner,
      unidocs,
      otherAccount,
      otherAccount2,
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

  describe("Store file", function () {
    it("Should store a file", async function () {
      const { unidocs, owner } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const [files, versions] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);

      // file
      expect(files.length).to.equal(1);
      expect(files[0].owner).to.equal(getAddress(owner.account.address));
      expect(files[0].createdAt).to.equal(createdAt);

      // version
      expect(versions[0].length).to.equal(1);
      expect(versions[0][0].filename).to.equal(filename);
      expect(versions[0][0].description).to.equal(description);
      expect(versions[0][0].checksum).to.equal(checksum);
      expect(versions[0][0].mimetype).to.equal(mimetype);
      expect(versions[0][0].filesize).to.equal(filesize);
      expect(versions[0][0].createdAt).to.equal(createdAt);
    });

    it("Should store a file and increment fileId", async function () {
      const { unidocs } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);
      expect(await unidocs.read.fileId()).to.equal(BigInt(1));

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);
      expect(await unidocs.read.fileId()).to.equal(BigInt(2));
    });
  });

  describe("Update file", function () {
    it("Should update a file", async function () {
      const { unidocs, owner } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const [files] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);

      const newFilename = "updatedFile.txt";
      const newCreatedAt = BigInt(Date.now());

      await unidocs.write.updateFile([
        files[0].fileId,
        newFilename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        newCreatedAt,
      ]);

      const [_, versions] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);

      expect(versions[0].length).to.equal(2);

      const latestVersion = versions[0][1];
      expect(latestVersion.filename).to.equal(newFilename);
      expect(latestVersion.description).to.equal(description);
      expect(latestVersion.checksum).to.equal(checksum);
      expect(latestVersion.mimetype).to.equal(mimetype);
      expect(latestVersion.filesize).to.equal(filesize);
      expect(latestVersion.createdAt).to.equal(newCreatedAt);
    });

    it("Should throw an error when updating a nonexistent file", async function () {
      const { unidocs, owner } = await loadFixture(deployFixture);
      // Atualizar um arquivo que não existe
      const fileId = BigInt(999); // ID de arquivo inexistente
      const newFilename = "updatedFile.txt";
      const newDescription = "Updated file description";
      const newIpfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const newChecksum = "0x987654321";
      const newMimetype = "application/pdf";
      const newFilesize = BigInt(2048);
      const newCreatedAt = BigInt(Date.now());

      // Tentar atualizar um arquivo que não existe
      try {
        await unidocs.write.updateFile([
          fileId,
          newFilename,
          newDescription,
          newIpfs,
          newChecksum,
          newMimetype,
          newFilesize,
          newCreatedAt,
        ]);
      } catch (error: any) {
        expect(error.message).to.contain("FileNotFound");
      }

      // Asserts
      const [_, versions] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);
      expect(versions.length).to.equal(0);
    });

    it("Should throw an error when updating a file without permission", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const fileId = BigInt(1);
      const newFilename = "updatedFile.txt";
      const newDescription = "Updated file description";
      const newIpfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const newChecksum = "0x987654321";
      const newMimetype = "application/pdf";
      const newFilesize = BigInt(2048);
      const newCreatedAt = BigInt(Date.now());

      try {
        await unidocs.write.updateFile(
          [
            fileId,
            newFilename,
            newDescription,
            newIpfs,
            newChecksum,
            newMimetype,
            newFilesize,
            newCreatedAt,
          ],
          {
            account: otherAccount.account,
          }
        );
      } catch (error: any) {
        expect(error.message).to.contain("Unauthorized");
      }
    });
  });

  describe("Transfer file", function () {
    it("Should transfer a file", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.transferFile([
        getAddress(otherAccount.account.address),
        BigInt(1),
      ]);

      const [filesForNewOwner] = await unidocs.read.getFiles([
        getAddress(otherAccount.account.address),
      ]);
      const [files] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);

      expect(files.length).to.equal(0);
      expect(filesForNewOwner.length).to.equal(1);
    });

    it("Should be able to update a file after receiving it from a transfer", async function () {
      const { unidocs, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.transferFile([
        getAddress(otherAccount.account.address),
        BigInt(1),
      ]);

      const newFilename = "updatedFile.txt";
      const newDescription = "Updated file description";
      const newIpfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const newChecksum = "0x987654321";
      const newMimetype = "application/pdf";
      const newFilesize = BigInt(2048);
      const newCreatedAt = BigInt(Date.now());

      await unidocs.write.updateFile(
        [
          BigInt(1),
          newFilename,
          newDescription,
          newIpfs,
          newChecksum,
          newMimetype,
          newFilesize,
          newCreatedAt,
        ],
        {
          account: otherAccount.account,
        }
      );

      const [_, versions] = await unidocs.read.getFiles([
        getAddress(otherAccount.account.address),
      ]);

      expect(versions[0].length).to.equal(2);

      const latestVersion = versions[0][1];
      expect(latestVersion.filename).to.equal(newFilename);
      expect(latestVersion.description).to.equal(newDescription);
      expect(latestVersion.checksum).to.equal(newChecksum);
      expect(latestVersion.mimetype).to.equal(newMimetype);
      expect(latestVersion.filesize).to.equal(newFilesize);
      expect(latestVersion.createdAt).to.equal(newCreatedAt);
    });

    it("Should throw an error when the old owner of the file tries to update it", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.transferFile([
        getAddress(otherAccount.account.address),
        BigInt(1),
      ]);

      const newFilename = "updatedFile.txt";
      const newDescription = "Updated file description";
      const newIpfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const newChecksum = "0x987654321";
      const newMimetype = "application/pdf";
      const newFilesize = BigInt(2048);
      const newCreatedAt = BigInt(Date.now());

      // Tentar atualizar um arquivo que não existe
      try {
        await unidocs.write.updateFile([
          BigInt(1),
          newFilename,
          newDescription,
          newIpfs,
          newChecksum,
          newMimetype,
          newFilesize,
          newCreatedAt,
        ]);
      } catch (error: any) {
        expect(error.message).to.contain("Unauthorized");
      }
    });

    it("Should throw an error when a non-owner tries to transfer a file", async function () {
      const { unidocs, owner, otherAccount, otherAccount2 } = await loadFixture(
        deployFixture
      );

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const fileId = BigInt(1);

      try {
        await unidocs.write.transferFile(
          [getAddress(otherAccount.account.address), fileId],
          {
            account: otherAccount2.account,
          }
        );
      } catch (error: any) {
        expect(error.message).to.contain("Unauthorized");
      }
    });
  });

  describe("Share file", function () {
    it("Should share a file", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const [files] = await unidocs.read.getFiles([
        getAddress(owner.account.address),
      ]);

      await unidocs.write.shareFile([
        files[0].fileId,
        getAddress(otherAccount.account.address),
        0, // READ
      ]);

      const [filesForNewOwner] = await unidocs.read.getFiles([
        getAddress(otherAccount.account.address),
      ]);
      expect(filesForNewOwner.length).to.equal(1);
    });

    it("Should revoke file access", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.shareFile([
        BigInt(1),
        getAddress(otherAccount.account.address),
        0, // READ
      ]);

      await unidocs.write.revokeFileAccess([
        BigInt(1),
        getAddress(otherAccount.account.address),
      ]);

      const [filesForNewOwner] = await unidocs.read.getFiles([
        getAddress(otherAccount.account.address),
      ]);
      expect(filesForNewOwner.length).to.equal(0);
    });

    it("Should throw an error when a user with 'read' permission tries to update a file", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.shareFile([
        BigInt(1),
        getAddress(otherAccount.account.address),
        0, // WRITE
      ]);

      // ---------------------------
      const newFilename = "updatedFile.txt";
      const newCreatedAt = BigInt(Date.now());

      try {
        await unidocs.write.updateFile(
          [
            BigInt(1),
            newFilename,
            description,
            ipfs,
            checksum,
            mimetype,
            filesize,
            newCreatedAt,
          ],
          {
            account: otherAccount.account,
          }
        );
      } catch (error: any) {
        expect(error.message).to.contain("Unauthorized");
      }
    });

    it("Should allow a user with 'write' permission to update a file", async function () {
      const { unidocs, owner, otherAccount } = await loadFixture(deployFixture);

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      await unidocs.write.shareFile([
        BigInt(1),
        getAddress(otherAccount.account.address),
        1, // WRITE
      ]);

      // ---------------------------
      const newFilename = "updatedFile.txt";
      const newCreatedAt = BigInt(Date.now());

      await unidocs.write.updateFile(
        [
          BigInt(1),
          newFilename,
          description,
          ipfs,
          checksum,
          mimetype,
          filesize,
          newCreatedAt,
        ],
        {
          account: otherAccount.account,
        }
      );

      const [_, versions] = await unidocs.read.getFiles([
        getAddress(otherAccount.account.address),
      ]);

      expect(versions[0].length).to.equal(2);

      const latestVersion = versions[0][1];
      expect(latestVersion.filename).to.equal(newFilename);
      expect(latestVersion.description).to.equal(description);
      expect(latestVersion.checksum).to.equal(checksum);
      expect(latestVersion.mimetype).to.equal(mimetype);
      expect(latestVersion.filesize).to.equal(filesize);
      expect(latestVersion.createdAt).to.equal(newCreatedAt);
    });

    it("Should throw an error when a non-owner tries to share a file", async function () {
      const { unidocs, owner, otherAccount, otherAccount2 } = await loadFixture(
        deployFixture
      );

      const filename = "testFile.txt";
      const description = "Test file for upload";
      const ipfs = ["QmXre8ZieqZfPLs3vp2vHdUzCgTfxFGzvzptTKwScGhC6e"];
      const checksum = "0x123456789";
      const mimetype = "text/plain";
      const createdAt = BigInt(Date.now());
      const filesize = BigInt(1024);

      await unidocs.write.storeFile([
        filename,
        description,
        ipfs,
        checksum,
        mimetype,
        filesize,
        createdAt,
      ]);

      const fileId = BigInt(1);

      try {
        await unidocs.write.shareFile(
          [
            fileId,
            getAddress(otherAccount.account.address),
            0, // READ
          ],
          {
            account: otherAccount2.account,
          }
        );
      } catch (error: any) {
        expect(error.message).to.contain("Unauthorized");
      }
    });
  });
});
