/* global ethers */
/* eslint prefer-const: "off" */
const fs = require('fs');
const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')
const { ethers } = require('hardhat')
async function deployDiamond() {
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]

  // deploy DiamondCutFacet
  const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
  const diamondCutFacet = await DiamondCutFacet.deploy()
  await diamondCutFacet.deployed()
  console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

  // deploy Diamond
  const Diamond = await ethers.getContractFactory('Diamond')
  const diamond = await Diamond.deploy(
    contractOwner.address,
    diamondCutFacet.address,
  )
  await diamond.deployed()
  console.log('Diamond deployed:', diamond.address)

  // deploy DiamondInit
  // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
  // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const DiamondInit = await ethers.getContractFactory('DiamondInit')
  const diamondInit = await DiamondInit.deploy()
  await diamondInit.deployed()
  console.log('DiamondInit deployed:', diamondInit.address)
  fs.writeFileSync('./config.js', `
  const contractAddress = "${diamond.address}"
  const ownerAddress = "${diamond.signer.address}"
  const diamondInitAddress = "${diamondInit.address}"
  
  module.exports = { contractAddress, ownerAddress, diamondInitAddress }
  `)

  // deploy facets
  console.log('')
  console.log('Deploying facets')
  const FacetNames = [
    'DiamondLoupeFacet',
    'OwnershipFacet',
    'AbundanceFacet',
    'CategoriesFacet',
    'InitialReviewFacet',
    'PostsFacet',
    'StructMappingFacet',
    'UserFundingFacet',
    'UserScoreFacet'
  ]
  const cut = []
  for (const FacetName of FacetNames) {
    const Facet = await ethers.getContractFactory(FacetName)
    const facet = await Facet.deploy()
    await facet.deployed()
    console.log(`${FacetName} deployed: ${facet.address}`)
    cut.push({
      facetAddress: facet.address,
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(facet),
    })
  }

  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', diamond.address)
  let tx
  let receipt
  // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData('init')
  tx = await diamondCut.diamondCut(cut, diamondInit.address, functionCall)
  console.log('Diamond cut tx: ', tx.hash)
  receipt = await tx.wait()
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  console.log('Completed diamond cut')
  return diamond.address
}


if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond


















// const hre = require("hardhat");
// const fs = require('fs');


// async function main() {
//   const Abundance = await hre.ethers.getContractFactory("Abundance");
//   const abundance = await Abundance.deploy(0);
//   await abundance.deployed();
//   console.log("Contract deployed to:", abundance.address);

//   fs.writeFileSync('./config.js', `
//   export const contractAddress = "${abundance.address}"
//   export const ownerAddress = "${abundance.signer.address}"
//   export const fullContract = "${abundance}"
//   `)
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
