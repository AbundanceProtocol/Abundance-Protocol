/* global describe it before ethers */
const { contractAddress, ownerAddress, diamondInitAddress } = require('../config')
const DiamondCutFacet = require('../artifacts/contracts/facets/DiamondCutFacet.sol/DiamondCutFacet.json')
const DiamondLoupeFacet = require('../artifacts/contracts/facets/DiamondLoupeFacet.sol/DiamondLoupeFacet.json')
const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

let tx
let receipt
let result

// get address from facet to replace/remove functions
let test3FacetAddress = "0xB0D4afd8879eD9F52b28595d31B441D079B2Ca07"
let userFundingFacetAddress = "0x6630557B85A74a8a63dD49F0f346da239450533c"
const UserFundingFacet = require('../artifacts/contracts/facets/UserFundingFacet.sol/UserFundingFacet.json')


//////    ADD FUNCTIONS   //////
async function addFunction() {
  let provider 
  // if (process.env.ENVIRONMENT === 'local') {
  //   provider = new ethers.providers.JsonRpcProvider()
  // } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  // } else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }
  const signer = provider.getSigner(ownerAddress)
  const diamondCutFacet = new ethers.Contract(contractAddress, DiamondCutFacet.abi, signer)
  const diamondLoupeFacet = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)
  const UserFundingFacet = await ethers.getContractFactory('UserFundingFacet')
  const userFundingFacet = await UserFundingFacet.deploy()
  await userFundingFacet.deployed()
  let selectors = getSelectors(userFundingFacet)
  tx = await diamondCutFacet.diamondCut(
    [{
      facetAddress: userFundingFacet.address,
      action: FacetCutAction.Add,
      functionSelectors: selectors
    }],
    ethers.constants.AddressZero, '0x', { gasLimit: 800000 })
  receipt = await tx.wait()
  console.log('receipt', receipt)
  
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  result = await diamondLoupeFacet.facetFunctionSelectors(userFundingFacet.address)
  console.log('result', result)
}

//////    REPLACE FUNCTIONS   //////
async function replaceFunction() {
  let provider 
  // if (process.env.ENVIRONMENT === 'local') {
  //   provider = new ethers.providers.JsonRpcProvider()
  // } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  // } else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }
  const signer = provider.getSigner(ownerAddress)
  const diamondCutFacet = new ethers.Contract(contractAddress, DiamondCutFacet.abi, signer)
  const diamondLoupeFacet = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)
  const UserFundingFacet = await ethers.getContractFactory('UserFundingFacet')
  const userFundingFacet = await UserFundingFacet.deploy()
  await userFundingFacet.deployed()
  let selectors = getSelectors(userFundingFacet)
  console.log(selectors)
  tx = await diamondCutFacet.diamondCut(
    [{
      facetAddress: userFundingFacetAddress,
      action: FacetCutAction.Replace,
      functionSelectors: selectors
    }],
    ethers.constants.AddressZero, '0x', { gasLimit: 800000 })
  receipt = await tx.wait()
  console.log('receipt', receipt)
  
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  result = await diamondLoupeFacet.facetFunctionSelectors(test3Facet.address)
  console.log('result', result)
}


//////    REMOVE FUNCTIONS   //////
async function removeFunction() {
  let provider 
  // if (process.env.ENVIRONMENT === 'local') {
  //   provider = new ethers.providers.JsonRpcProvider()
  // } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  // } else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }
  const signer = provider.getSigner()
  const diamondCutFacet = new ethers.Contract(contractAddress, DiamondCutFacet.abi, signer)
  const diamondLoupeFacet = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)
  const userFundingFacet = new ethers.Contract(contractAddress, UserFundingFacet.abi, provider)
  let selectors = getSelectors(userFundingFacet)
  tx = await diamondCutFacet.diamondCut(
    [{
      facetAddress: ethers.constants.AddressZero,
      action: FacetCutAction.Remove,
      functionSelectors: selectors
    }],
    ethers.constants.AddressZero, '0x', { gasLimit: 800000 })
  receipt = await tx.wait()
  console.log('receipt', receipt)
  
  if (!receipt.status) {
    throw Error(`Diamond upgrade failed: ${tx.hash}`)
  }
  result = await diamondLoupeFacet.facetFunctionSelectors(userFundingFacetAddress)
  console.log('result', result)

  let facets = await diamondLoupeFacet.facets()
  console.log(facets)
}


//////    CHECK FACETS   //////
async function getFacets() {
  let provider 
  // if (process.env.ENVIRONMENT === 'local') {
    // provider = new ethers.providers.JsonRpcProvider()
  // } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  // } else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }
  const diamondLoupeFacet = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)
  let facets = await diamondLoupeFacet.facets()
  console.log(facets)
}

// comment out not used add/replace/remove functions
// run in console: npx hardhat run scripts/upgrade.js --network mumbai
if (require.main === module) {
  // addFunction()
  // replaceFunction()
  removeFunction()
  // getFacets()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}