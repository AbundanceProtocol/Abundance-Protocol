
import { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AccountContext } from '../context'
import { contractAddress, ownerAddress } from '../config'
import { Warning } from './assets'
import { MdRefresh } from 'react-icons/md';
import UserFundingFacet from '../artifacts/contracts/facets/UserFundingFacet.sol/UserFundingFacet.json'

import { createClient } from 'urql'

import { CeramicClient } from '@ceramicnetwork/http-client'
import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'

const APIURL = "https://api.thegraph.com/subgraphs/name/buildingweb4/abundance-protocol"

const client = createClient({
  url: APIURL
})

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
  const [ userPosts, setUserPosts] = useState([])
  const account = useContext(AccountContext)

  async function fetchData() {
    console.log(address)
    const query = `
    query {
      posts (where: {author: "${address}"}) {
        contentHash
        initialReview
        CrS
        IS
      }
    }  
  `
    try {
      const ipfsURI = 'https://ipfs.io/ipfs/'
      let responseData = []
      const response = await client.query(query).toPromise()
      console.log(response)
      console.log(response.data.posts)
      responseData = response.data.posts
      for (let i = 0; i < responseData.length; i++) {
        const ipfsUrl = `${ipfsURI}/${responseData[i].contentHash}`
        const ipfsResponse = await fetch(ipfsUrl)
        const ipfsData = await ipfsResponse.json()
        if (ipfsData.title) {
          responseData[i].title = ipfsData.title
        }
        if (ipfsData.content) {
          responseData[i].content = ipfsData.content
        }
      }
      await setUserPosts(responseData)
      console.log(userPosts)
    } catch (err) {
      console.log('error:', err)
      return null;
    }
  }
  useEffect(() => {
    fetchData()
    console.log(userPosts)
    if (address) { setProfile(address) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function setProfile(address) {
    const data = await datastore.get('BasicProfile', `did:pkh:eip155:80001:${address}`)
    if (data !== null && data.name.length > 0) {
      setSearchAddress(data.name)
    } else {
      let shortAddress = (address.slice(0, 5) + '...' + address.slice(38, 42))
      setSearchAddress(shortAddress)
    }
  }

	function refreshButton() {
    fetchData()
	}

  async function createInitialReview(e) {
    console.log('Create initial review for post:', e.target.name)
    // ...
  }

  return (
    <div className="t-p-130">
    <Warning />
    {/* <div className="top-frame">
        {
          <div className="data-container">
            <span className="container-title">Portfolio</span>
          </div>
        }
      </div> */}
    <div className="input-container-wide flex-middle flex-col" style={{margin: '0px auto 50px auto'}}>
      <div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
        <span className='container-title'>Posts</span>
        <div className="flex-row">
          <MdRefresh onClick={refreshButton} className="input-toggle-button toggle-on" style={{fontSize: '22px', padding: '5px 10px'}} />
        </div>
      </div>
      {
          userPosts.map((post, index) => (
            <div className="inner-container flex-row" key={index} style={{width: '100%'}}>
              <div className="flex-col" style={{width: '100%'}}>
                <span className=""><span style={{fontWeight: '600'}}>Post title: </span>{post.title}</span>
                <span className=""><span style={{fontWeight: '600'}}></span>{post.content.slice(0, 50)}{(post.content.length > 50) ? '...' : ''}</span>
              </div>
              { (post.initialReview) &&
                (
                  <div className='flex-row'>
                    <input type="button" name="IS" value={post.IS} className="input-toggle-button toggle-on" readOnly />
                    <input type="button" name="CrS" value={post.CrS} className="input-toggle-button toggle-on" readOnly />
                  </div>
                )
              }
              { (!post.initialReview) &&
                (
                  <input type="button" onClick={createInitialReview} name={post.contentHash} value="Create Initial Review" className="input-toggle-button toggle-on" />
                )
              }
            </div>
          ))
        }
    </div>

    {/* <div className="input-container-wide flex-middle flex-col" style={{margin: '0px auto 50px auto'}}>
      <div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
        <span className='container-title'>Reviews</span>
        <div className="flex-row">
          <MdRefresh onClick={refreshButton} className="input-toggle-button toggle-on" style={{fontSize: '22px', padding: '5px 10px'}} />
        </div>
      </div>
      {
          userReviews.map((review, index) => (
          ...
        }
    </div> */}


  </div>
  )
}


export async function getServerSideProps() {
  let provider 
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }
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
