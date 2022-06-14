
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { AccountContext } from '../context'
import { contractAddress, ownerAddress } from '../config'
// import Test1Facet from '../artifacts/contracts/facets/Test1Facet.sol/Test1Facet.json'
// import Test2Facet from '../artifacts/contracts/facets/Test2Facet.sol/Test2Facet.json'
import DiamondLoupeFacet from '../artifacts/contracts/facets/DiamondLoupeFacet.sol/DiamondLoupeFacet.json'
import DiamondCutFacet from '../artifacts/contracts/facets/DiamondCutFacet.sol/DiamondCutFacet.json'
import StructMappingFacet from '../artifacts/contracts/facets/StructMappingFacet.sol/StructMappingFacet.json'





export default function Profile(props) {
  const { posts } = props
  const initialState = { amount: 0.0, percentReturn: 0.0, deadline: 0, reqType: 0 }
	const [request, setRequest] = useState(initialState)
  const account = useContext(AccountContext)
	const [submitMessage, setSubmitMessage] = useState({message: '', status: 'none'})
	const { amount, percentReturn, deadline, reqType } = request

  const router = useRouter()
  async function navigate() {
    router.push('/create-post')
  }

	function onChange(e) {
		setRequest( () => ({ ...request, [e.target.name]: e.target.value }) )
		if (submitMessage.status !== 'none') {
			setSubmitMessage({message: '', status: 'none'})
		}
	}

	function fundingToggle(e) {
		console.log(e.target.name)
		if (e.target.name === 'request') {
			setRequest( () => ({ ...request, reqType: 1, deadline: 0 }) )
		} else if (e.target.name === 'auction') {
			setRequest( () => ({ ...request, reqType: 0 }) )
		}
	}

	const RequestMessage = () => {
		return (
			<>
				{ (submitMessage.status === 'success') && (
					<div className="alert-button flex-col alert-success">
						<span className="alert-text">Funding request submitted successfully!</span>
						<span className="alert-text">Transaction hash:</span>
						<span className="alert-text-tx">{submitMessage.message}</span>
					</div>)
				}
				{ (submitMessage.status === 'failed') && (
					<div className="alert-button alert-fail">
						<p className="alert-text">Funding request failed</p>
					</div>)
				}
			</>
		)
	}

	const RequestFunds = () => {
		if (((reqType == 0 && deadline > 0 && deadline <= 90) || (reqType == 1 && deadline == 0)) && (percentReturn > 0 && percentReturn < 100) && (amount > 0)) {
			return (
				<button className="input-button" type='button' onClick={requestFunding}>Request Funding</button>
			)
		} else {
			return (
				<button className="input-button-off" type='button' disabled>Request Funding</button>
			)
		}
	}
	
//// TEST ENVIRONMENT ////

	async function getcontracttest() {
		let provider 
		// if (process.env.ENVIRONMENT === 'local') {
		//   provider = new ethers.providers.JsonRpcProvider()
		// } else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		// } else {
		//   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		// }
		const contract = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)

		console.log(contract)
		// let num1 = await contract.facets()
		// diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', contractAddress)
		// console.log(diamondCutFacet)
		let txt = await contract.facetFunctionSelectors('0x927b167526bAbB9be047421db732C663a0b77B11')
		console.log(txt)
		// DiamondCutFacet
		// let parsedNum = JSON.parse(JSON.stringify(num1))
		// console.log(num1)
	}

	async function facets() {
		let provider 
		// if (process.env.ENVIRONMENT === 'local') {
		//   provider = new ethers.providers.JsonRpcProvider()
		// } else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		// } else {
		//   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		// }
		const contract = new ethers.Contract(contractAddress, DiamondLoupeFacet.abi, provider)
		let num1 = await contract.facets()
		// let parsedNum = JSON.parse(JSON.stringify(num1))
		console.log(num1)
	}

	async function testFunction() {
		let provider 
		if (process.env.ENVIRONMENT === 'local') {
		  provider = new ethers.providers.JsonRpcProvider()
		} else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		} else {
		  provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		}
		const contract = new ethers.Contract(contractAddress, Test1Facet.abi, provider)
		let num1 = await contract.test2Func1()
		let parsedNum = JSON.parse(JSON.stringify(num1))
		console.log(Number(parsedNum.hex))
	}

	async function getNum1() {
		let provider 
		if (process.env.ENVIRONMENT === 'local') {
		  provider = new ethers.providers.JsonRpcProvider()
		} else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		} else {
		  provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		}
		const contract = new ethers.Contract(contractAddress, Test1Facet.abi, provider)
		let num1 = await contract.getNum1()
		let parsedNum = JSON.parse(JSON.stringify(num1))
		console.log(Number(parsedNum.hex))
	}

	async function getNum2() {
		let provider 
		if (process.env.ENVIRONMENT === 'local') {
		  provider = new ethers.providers.JsonRpcProvider()
		} else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		} else {
		  provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		}
		// console.log(provider)
		const contract = new ethers.Contract(contractAddress, Test2Facet.abi, provider)
	  //   const data = await contract.numReturn()
	//   console.log(contract)
	
		  let num1 = await contract.getNum2()
		  let parsedNum = JSON.parse(JSON.stringify(num1))
	  
		  console.log(Number(parsedNum.hex))
	}
	


	async function runTest1() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(contractAddress, Test1Facet.abi, signer)
			// let _amount = ethers.utils.parseUnits(amount.toString(), 18)
			// let _percentReturn = parseInt(percentReturn * 100)
			// let _deadline = parseInt(deadline)
			// let _reqType = parseInt(reqType)
			// console.log(_amount, _percentReturn, _deadline, _reqType)
            
			try {
				// console.log(_amount)
				const val = await contract.changeNum1(parseInt(2))
				console.log(val)
				const blockHash = await provider.waitForTransaction(val.hash)
				console.log(blockHash)
				// let parsedData = JSON.parse(JSON.stringify(data))
				// setSubmitMessage({message: blockHash.transactionHash, status: 'success'})
				// setRequest({ amount: 0, percentReturn: 0, deadline: 0, reqType: 0 })

				// console.log(submitMessage)
			} catch (err) {
				console.log('Error: ', err)
				// setSubmitMessage({message: '', status: 'failed'})
				// console.log(submitMessage)
			}
		}    
	}

	async function runTest2() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(contractAddress, Test2Facet.abi, signer)
            
			try {
				const val = await contract.changeNum2(parseInt(3))
				console.log(val)
				const blockHash = await provider.waitForTransaction(val.hash)
				console.log(blockHash)
			} catch (err) {
				console.log('Error: ', err)
			}
		}    
	}


	async function mapStruct1() {
		let provider 
		if (process.env.ENVIRONMENT === 'local') {
		  provider = new ethers.providers.JsonRpcProvider()
		} else if (process.env.ENVIRONMENT === 'testnet') {
		  provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
		} else {
		  provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
		}

		const contract = new ethers.Contract(contractAddress, StructMappingFacet.abi, provider)

	
		  let num1 = await contract.mapStruct(1)
		  let parsedNum = JSON.parse(JSON.stringify(num1))
	  
		  console.log(Number(parsedNum.hex))  
	}

	
	async function updateStruct1() {
		if (typeof window.ethereum !== 'undefined') {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const contract = new ethers.Contract(contractAddress, StructMappingFacet.abi, signer)
            
			try {
				const val = await contract.updateStruct(1)
				console.log(val)
				const blockHash = await provider.waitForTransaction(val.hash)
				console.log(blockHash)
			} catch (err) {
				console.log('Error: ', err)
			}
		}    
	}


  return (
    <div>
      <div className="top-frame flex-row">
        <div className="nav-box" style={{margin: '30px 20px'}}>
          <input type="button" name='self-review' value="Profile" className="nav-button-top toggle-on" />
          <input type="button" name='self-review' value="Wallet" className="nav-button toggle-off" />
          <input type="button" name='self-review' value="Expertise" className="nav-button-bottom toggle-off" />

          <input type="button" name='self-review' value="Post" className="nav-button-top toggle-off" />
          <input type="button" name='self-review' value="Initiate Review" className="nav-button toggle-off" />
          <input type="button" name='self-review' value="Fund Project" className="nav-button toggle-off" />
          <input type="button" name='self-review' value="Request Funding" className="nav-button toggle-off" />
          <input type="button" name='self-review' value="Review" className="nav-button toggle-off" />
          <input type="button" name='self-review' value="Request" className="nav-button-bottom toggle-off" />

          <input type="button" name='self-review' value="Feed" className="nav-button-top toggle-off" />
          <input type="button" name='self-review' value="Subscriptions" className="nav-button-bottom toggle-off" />
        </div>
        





<div className="input-container flex-middle flex-col full-w" style={{margin: '30px 0px'}}>
			{ (submitMessage.status !== 'none') && <RequestMessage /> }
			<div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
				<span className='container-title'>Profile</span>
				<div className="flex-row">
					<input type="button" onClick={fundingToggle} name='request' value="Request" className={reqType === 1 ? "input-toggle-button-l toggle-on" : "input-toggle-button-l toggle-off"} />
					<input type="button" onClick={fundingToggle} name='auction' value="Auction" className={reqType === 0 ? "input-toggle-button-r toggle-on" : "input-toggle-button-r toggle-off"} />
				</div>
			</div>
			<div className="inner-container">
				<span className='input-desc'>Amount requested</span>
				<div className="flex-row">
					<input type="number" min="0" onChange={onChange} name='amount' placeholder='0.0' step='0.1' value={request.amount} className="input-field-left" />
					<input type="number" placeholder='WEB' className="input-field-right" disabled />
				</div>
			</div>
			<div className="inner-container">
				<span className='input-desc'>{(reqType === 0) ? "Max r" : "R"}eturn offered</span>
				<div className="flex-row">
					<input type="number" min="0" onChange={onChange} name='percentReturn' placeholder='5.0' step="0.1" value={request.percentReturn} className="input-field-left" />
					<input type="number" placeholder='%' className="input-field-right" disabled />
				</div>
			</div>
			{
				(reqType === 0) && (
					<div className="inner-container">
						<span className='input-desc'>Deadline</span>
						<div className="flex-row">
							<input type="number" min="0" max="90" onChange={onChange} name='deadline' placeholder='21' value={request.deadline} className="input-field-left" />
							<input type="number" placeholder='days' className="input-field-right" disabled />
						</div>
					</div>
				)
			}
			<RequestFunds />

			<div onClick={runTest1}>Test1</div>
			<div onClick={runTest2}>Test2</div>
			<div onClick={getNum1}>Get Num1</div>
			<div onClick={getNum2}>Get Num2</div>
			<div onClick={mapStruct1}>mapStruct</div>
			<div onClick={updateStruct1}>updateStruct</div>
			<div onClick={testFunction}>testFunction</div>
			<div onClick={facets}>facets</div>
			<div onClick={getcontracttest}>getcontracttest</div>
		</div>



        
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  let provider 
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }
//   const contract = new ethers.Contract(contractAddress, Test2Facet.abi, provider)
//   const data = await contract.numReturn()
	// let num = await contract.test2Func2()
	// let parsedData = JSON.parse(JSON.stringify(num))
	// console.log(Number(parsedData.hex))

	// console.log(parsedData)
	// let num1 = await contract.getNum2()
	// let parsedNum = JSON.parse(JSON.stringify(num1))

	// console.log(Number(parsedNum.hex))
  	console.log(contractAddress)
	// console.log(parsedNum)

  // let stringData = JSON.parse(JSON.stringify(data)).hex
  return {
    props: {
      posts: ''
    }
  }
}
