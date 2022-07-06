
import { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AccountContext } from '../context'
import { contractAddress, ownerAddress } from '../config'
import { Warning } from './assets'
import UserFundingFacet from '../artifacts/contracts/facets/UserFundingFacet.sol/UserFundingFacet.json'

import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com")
const aliases = {
    schemas: {
        basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
    },
    definitions: {
        BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
    },
    tiles: {},
}
const datastore = new DIDDataStore({ ceramic, model: aliases })

export default function Proposals(props) {
  const { proposals, address } = props
  const [searchAddress, setSearchAddress] = useState(address)
  const account = useContext(AccountContext)

  useEffect(() => {
    if (address) { setProfile(address) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function setProfile(userAddress) {
    const data = await datastore.get('BasicProfile', `did:pkh:eip155:80001:${userAddress}`)
    // console.log(userAddress)
    // console.log(data)
    if (data !== null && data.name.length > 0) {
      setSearchAddress(data.name)
    } else {
      let shortAddress = (userAddress.slice(0, 5) + '...' + userAddress.slice(38, 42))
      setSearchAddress(shortAddress)
    }
  }

  async function proposalBid(e) {
    console.log('bid on', e.target.name)
  }

  async function proposalFund(e) {
    console.log('bid on', e.target.name)
  }

  function timeCoverter(epoch) {
    let date = new Date(epoch * 1000)
    return date.toLocaleString()
  }

  return (
    <div style={{padding: '130px 0 0 0'}}>
      <Warning />
      <div className="top-frame">
        {
          <div className="data-container">
            <span className="container-title">Search Funding Requests</span>
          </div>
        }
      </div>

      <div className="">
        {
          proposals.map((proposal, index) => (
            <div className="flex-row data-container" key={index}>
              <div className="flex-col" style={{width: '100%'}}>
                <span className=""><span style={{fontWeight: '600'}}>User: </span>{searchAddress}</span>
                <span className=""><span style={{fontWeight: '600'}}>Amout requested: </span>{proposal.amountRequested} WEB</span>
                <span className=""><span style={{fontWeight: '600'}}>Return rate: </span>{proposal.returnRate}%</span>
                <span className=""><span style={{fontWeight: '600'}}>Funding type: </span>{proposal.reqType === 0 ? "Auction" : "Request"}</span>
                <span className=""><span className="" style={{fontWeight: '600'}}>{proposal.reqType === 0 ? "Deadline: " : ''}</span>{proposal.reqType === 0 ? (timeCoverter(proposal.deadline)) : ''}</span>
              </div>
              { (proposal.reqType === 0) &&
                (
                  <input type="button" onClick={proposalBid} name={proposal.reqId} value="Bid" className="input-toggle-button toggle-on" />
                )
              }
              { (proposal.reqType === 1) &&
                (
                  <input type="button" onClick={proposalFund} name={proposal.reqId} value="Fund" className="input-toggle-button toggle-on" />
                )
              }
            </div>
          ))
        }

      </div>
    </div>
  )
}


export async function getServerSideProps() {
  let provider 
  // if (process.env.ENVIRONMENT === 'local') {
  //   provider = new ethers.providers.JsonRpcProvider()
  // } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  // } else {
  //   provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  // }
  const contract = new ethers.Contract(contractAddress, UserFundingFacet.abi, provider)
  const data = await contract.getAllFundingReqs(ownerAddress)
  console.log(data)
  let parsedData = JSON.parse(JSON.stringify(data))
  console.log(parsedData)
  const sortedData = parsedData.map(d => (
    { 
      reqId: parseInt(Number(d[0].hex)), 
      amountRequested: ethers.utils.formatEther(d[1].hex),
      returnRate: parseInt(Number(d[2].hex))/100,
      reqType: d[3],
      deadline: parseInt(Number(d[4].hex))
    })
   )
   console.log(sortedData)

  return {
    props: {
      proposals: sortedData,
      address: ownerAddress
    }
  }
}
