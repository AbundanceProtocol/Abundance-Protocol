import { useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { AccountContext } from '../context'
import { contractAddress, ownerAddress } from '../config'
import { Warning } from './assets'
import { MdRefresh } from 'react-icons/md';
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

export default function Feed() {
  let address = AccountContext._currentValue
  const [ userPosts, setUserPosts] = useState([])
  const account = useContext(AccountContext)

  async function fetchData() {
    let filters = await getUserFilters(address)
    if (typeof filters == 'undefined') {
      filters = ''
    }
    const query = `
      query {
        posts (first: 20, orderBy: timestamp, orderDirection: desc${filters}) {
          contentHash
          initialReview
          CrS
          IS
          timestamp
          authors
        }
      }  
    `
    
    try {
      const ipfsURI = 'https://ipfs.io/ipfs'
      let responseData = []
      let response = await client.query(query).toPromise()
      responseData = response.data.posts
      for (let i = 0; i < responseData.length; i++) {
        const ipfsUrl = `${ipfsURI}/${responseData[i].contentHash}`
        console.log('ipfs url', ipfsUrl)
        const ipfsResponse = await fetch(ipfsUrl)
        const ipfsData = await ipfsResponse.json()
        if (ipfsData.title) {
          responseData[i].title = ipfsData.title
        }
        if (ipfsData.content) {
          responseData[i].content = ipfsData.content
        }
        let date = new Date(0)
        date.setUTCSeconds(responseData[i].timestamp)
        responseData[i].timestamp = date.toLocaleString()
        responseData[i].authorName = await setProfile(responseData[i].authors[0])
      }
      setUserPosts(responseData)
      console.log(userPosts)
    } catch (err) {
      console.log('error:', err)
      return null;
    }
  }
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getUserFilters(userAddress) {
    // need user encrypted category filters from Ceramic
    // ...
    if (userAddress) {
      const data = await datastore.get('BasicProfile', `did:pkh:eip155:80001:${userAddress}`)
      if (data !== null && data.filterCategories !== null) {
        if (typeof data.filterCategories === 'object' && data.filterCategories.length > 0) {
          let categories = String(data.filterCategories[0])
          for (i = 1; i < data.filterCategories.length; i++) {
            if (data.filterCategories[i]) {
              categories += `, ${data.filterCategories[i]}`
            }
          }
          return `, where: {categories: ["${data.filterCategories}"]}`
        } else {
          return ""
        }
      }
    } else {
      return ""
    }
  }

  async function setProfile(userAddress) {
    if (userAddress) {
      const data = await datastore.get('BasicProfile', `did:pkh:eip155:80001:${userAddress}`)
      if (data !== null && data.name.length > 0) {
        return data.name
      } else {
        let shortAddress = (userAddress.slice(0, 5) + '...' + userAddress.slice(38, 42))
        return shortAddress
      }
    } else {
      return null
    }
  }

	function refreshButton() {
    fetchData()
	}

  return (
    <div className="t-p-130">
    <Warning />
    <div className="input-container-wide flex-middle flex-col" style={{margin: '0px auto 50px auto'}}>
      <div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
        <span className='container-title'>Feed</span>
        <div className="flex-row">
          <MdRefresh onClick={refreshButton} className="input-toggle-button toggle-on" style={{fontSize: '22px', padding: '5px 10px'}} />
        </div>
      </div>
      {
          userPosts.length > 0 && userPosts.map((post, index) => (
            <div className="inner-container" key={index} style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
              <div className="flex-col" style={{width: '100%'}}>
                <span className="" style={{fontWeight: '800', fontSize: '18px'}}>{post.title}</span>
                <span className="" style={{fontSize: '15px', margin: '5px 0 0 0'}}>{post.content.slice(0, 50)}{(post.content.length > 50) ? '...' : ''}</span>
                <span className="flex-row" style={{fontSize: '12px', margin: '10px 0 0 0', color: '#555'}}>
                  <span style={{fontWeight: '600', margin: '0 5px 0 0'}}>By: </span>
                  <span style={{fontWeight: '700', color: '#000'}} title={post.author} >{post.authorName} </span>
                  <span style={{fontWeight: '600', margin: '0 5px 0 0', width: '100%', textAlign: 'right'}}>Created: </span>
                  <span style={{fontWeight: '400', minWidth: 'max-content', }}>{post.timestamp}</span>
                  </span>
              </div>
              { (post.initialReview) &&
                (
                  <div className='flex-row'>
                    <input type="button" name="IS" value={post.IS} className="input-toggle-button toggle-on" readOnly />
                    <input type="button" name="CrS" value={post.CrS} className="input-toggle-button toggle-on" readOnly />
                  </div>
                )
              }
            </div>
          ))
        }
    </div>
  </div>
  )
}

Feed.provider = AccountContext
