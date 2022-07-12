import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { AccountContext } from '../context.js'
import { ethers } from 'ethers'
import { contractAddress } from '../config'
import AbundanceFacet from '../artifacts/contracts/facets/AbundanceFacet.sol/AbundanceFacet.json'
import { FaChevronCircleDown } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import { Warning } from './assets'

function Wallet() {
  let authorAddress = AccountContext._currentValue
  if (!authorAddress) {authorAddress = ''}
	const router = useRouter()
  const initialBalances = { total: 0, projects: 0, reviews: 0, funding: 0, locked: 0, investments: 0 }
  const [userWallet, setUserWallet] = useState(initialBalances)
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
  const walletFields = {
    'walletParams': ['Project earnings', 'Review earnings', 'Funding received', 'Locked funds', 'Investments'],
    'Project earnings': userWallet.projects,
    'Review earnings': userWallet.reviews,
    'Funding received': userWallet.funding,
    'Locked funds': userWallet.locked,
    'Investments': userWallet.investments
  }

  useEffect(() => {
    if (authorAddress) { getBalance() } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const WalletField = (props) => {
    let field = props.fieldName
    return (
      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>{field}</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input placeholder='0 WEB' value={walletFields[field] + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} readOnly />
      </div>
    )
  }

	async function getBalance() {
    try {
      let provider 
      if (process.env.ENVIRONMENT === 'local') {
        provider = new ethers.providers.JsonRpcProvider()
      } else if (process.env.ENVIRONMENT === 'testnet') {
        provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
      } else {
        provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
      }
      const contract = new ethers.Contract(contractAddress, AbundanceFacet.abi, provider)
      let balance = await contract.balanceOf(authorAddress)
      setUserWallet(() => ({ ...userWallet, total: Number(balance._hex) }))
      console.log(Number(balance._hex))
    } catch (error) {
      console.error(error)
    }
	}

	function refreshButton() {
    getBalance()
	}

	return (
	<div className="t-p-130">
    <Warning />
    <div className="input-container flex-middle flex-col" style={{margin: '0px auto 50px auto'}}>
      <div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
        <span className='container-title'>Wallet</span>
        <div className="flex-row">
          <MdRefresh onClick={refreshButton} className="input-toggle-button toggle-on" style={{fontSize: '22px', padding: '5px 10px'}} />
        </div>
      </div>
      <div className="inner-container" style={{marginBottom: '25px'}}>
        <span className='input-desc'>Total account balance</span>
        <input placeholder='0 WEB' value={userWallet.total + ' WEB'} className="input-field edit-toggle-off" readOnly />
      </div>
      { walletFields['walletParams'].map((field, index) => (
        <WalletField fieldName={field} key={index} /> ))}
    </div>
  </div>
	)
}

export default Wallet

Wallet.provider = AccountContext