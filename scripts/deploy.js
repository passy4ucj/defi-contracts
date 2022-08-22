const { BigNumber, utils } = require("ethers");
const hardhat = require("hardhat");
async function main() {
  const PTLToken = await hardhat.ethers.getContractFactory("PTLToken");
  const ptltoken = await PTLToken.deploy();
  await ptltoken.deployed();
  console.log("[📥] PTLToken deployed to address: " + ptltoken.address);
  const PTLVendor = await hardhat.ethers.getContractFactory("PTLVendor");
  const ptlvendor = await PTLVendor.deploy(ptltoken.address);
  console.log("[📥] PTLVendor deployed to address: " + ptlvendor.address);
  await ptltoken.deployed();
  // Transfer ptltokens to vendor
  await ptltoken.functions.transfer(ptlvendor.address, utils.parseEther("10000"));
  console.log("[🚀] Tokens transferred to OKVendor");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});