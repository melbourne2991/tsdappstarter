import { ethers } from "hardhat";

// scripts/deploy.js
async function main() {
  const Auth = await ethers.getContractFactory("Auth");
  const Box = await ethers.getContractFactory("Box");

  console.log("Deploying Auth...");
  const auth = await Auth.deploy();

  await auth.deployed();
  console.log("Auth deployed to:", auth.address);

  console.log("Deploying Box...");
  const box = await Box.deploy(auth.address);

  await box.deployed();
  console.log("Box deployed to:", box.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
