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

  useEffect(() => {
    if (authorAddress) { getBalance() } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	async function getBalance() {
    try {
      let provider 
      // if (process.env.ENVIRONMENT === 'local') {
        // provider = new ethers.providers.JsonRpcProvider()
      // } else if (process.env.ENVIRONMENT === 'testnet') {
        provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
      // } else {
      //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
      // }
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
        <input name='total' placeholder='0 WEB' value={userWallet.total + ' WEB'} className="input-field edit-toggle-off" />
      </div>

      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>Project earnings</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input name='projects' placeholder='0 WEB' value={userWallet.projects + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} />
      </div>

      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>Review earnings</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input name='reviews' placeholder='0 WEB' value={userWallet.reviews + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} />
      </div>

      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>Funding received</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input name='funding' placeholder='0 WEB' value={userWallet.funding + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} />
      </div>

      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>Locked funds</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input name='locked' placeholder='0 WEB' value={userWallet.locked + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} />
      </div>

      <div className="inner-container">
        <div className="flex-row" style={{padding: '0', width: '100%'}}>
          <span className='input-desc' style={{width: '100%'}}>Investments</span>
          <FaChevronCircleDown style={{fontSize: '18px', color: '#999'}} />
        </div>
        <input name='investments' placeholder='0 WEB' value={userWallet.investments + ' WEB'} className="input-field edit-toggle-off" style={{margin: '0', fontSize: '16px', height: '28px'}} />
      </div>
    </div>
  </div>
	)
}

export default Wallet

Wallet.provider = AccountContext