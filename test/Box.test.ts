import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token", function () {
  let box: Contract;
  let owner: SignerWithAddress, addr1: SignerWithAddress;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Auth = await ethers.getContractFactory("Auth", owner);
    const Box = await ethers.getContractFactory("Box", owner);
    const auth = await Auth.deploy();

    await auth.deployed();

    box = await Box.deploy(auth.address);

    await box.deployed();
  });

  it("should allow retrieval of value by owner", async function () {
    await box.store(42);
    expect((await box.retrieve()).toString()).to.equal("42");
  });

  it("should not allow retrieval by non-owner", async () => {
    expect(box.connect(addr1).store(56)).be.revertedWith("Unauthorized");
    expect((await box.retrieve()).toString()).to.equal("42");
  });
});
