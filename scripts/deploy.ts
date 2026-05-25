import hre from "hardhat";

async function main() {

  const LegacyVault = await hre.ethers.getContractFactory("LegacyVault");

  // 30 days inactivity
  const inactivityLimit = 30 * 24 * 60 * 60;

  const vault = await LegacyVault.deploy(inactivityLimit);

  await vault.waitForDeployment();

  console.log("LegacyVault deployed to:", await vault.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});