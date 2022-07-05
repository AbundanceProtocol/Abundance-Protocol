import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { AccountContext } from '../context.js'
// import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import { contractAddress } from '../config'
// import PostsFacet from '../artifacts/contracts/facets/PostsFacet.sol/PostsFacet.json'
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import { Warning } from './assets'

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

// const client = create('https://ipfs.infura.io:5001/api/v0')

function Profile() {
  let authorAddress = AccountContext._currentValue
  if (!authorAddress) {authorAddress = ''}
	const [editToggle, setEditToggle] = useState(false)
	const initialState = { name: '', bio: '', url: '' }
	const [userProfile, setUserProfile] = useState(initialState)
	const [userDID, setUserDID] = useState(initialState)
	const router = useRouter()
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    if (authorAddress) {
      updateProfile()
    } else {
      setUserProfile({name: '', bio: '', url: ''})
    }
  }, [])

	function onChange(e) {
		setUserProfile( () => ({ ...userProfile, [e.target.name]: e.target.value }) )
	}

  async function updateProfile() {
    const data = await datastore.get('BasicProfile', `did:pkh:eip155:80001:${authorAddress}`)
    if (data !== null) {
      setUserDID({name: data.name, bio: data.bio, url: data.url})
      setUserProfile({name: data.name, bio: data.bio, url: data.url})
    } else {
      setUserDID({name: '', bio: '', url: ''})
      setUserProfile({name: '', bio: '', url: ''})
    }
  }

	async function saveProfile() {
    await updateProfileOnCeramic()
	}

	function shortenName(longName) {
		if (longName) {
			let shortName = (longName.slice(0, 5) + '...' + longName.slice(38, 42))
			return shortName
		}
		return null
	}

	const SaveProfileButton = () => {
		if ( editToggle && (userProfile.name !== userDID.name || userProfile.bio !== userDID.bio || userProfile.url !== userDID.url) ) {
			return (
				<button className="input-button" type='button' onClick={saveProfile}>Save Profile</button>
			)
		} else {
			return (
				<button className="input-button-off" type='button' disabled>Save Profile</button>
			)
		}
	}

  function getFormProfile() {
      const name = userProfile.name
      const bio = userProfile.bio
      const url = userProfile.url

      // object needs to conform to the datamodel
      // name -> exists
      // hair-color -> DOES NOT EXIST
      return { name, bio, url }
  }

	async function updateProfileOnCeramic() {
    if (typeof window.ethereum !== 'undefined') {
      const ethereumProvider = window.ethereum
      const accounts = await ethereumProvider.request({method: 'eth_requestAccounts',})
      const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
      const session = new DIDSession({ authProvider })
      const did = await session.authorize()
      ceramic.did = did

      try {
        const updatedProfile = getFormProfile()

        //use the DIDDatastore to merge profile data to Ceramic
        await datastore.merge('BasicProfile', updatedProfile)
      
        //use the DIDDatastore to get profile data from Ceramic
        const profile = await datastore.get('BasicProfile')
        setUserDID({name: profile.name, bio: profile.bio, url: profile.url})
        editButton()
      } catch (error) {
        console.error(error)
      }
    }
	}

	function editButton(e) {
		if (editToggle) {
      updateProfile()
			setEditToggle(false)
		} else if (!editToggle) {
			setEditToggle(true)
		}
	}

	return (
	<div className="t-p-130">
      <Warning />
      <div className="input-container flex-middle flex-col" style={{margin: '0px auto 50px auto'}}>
        <div className="flex-row" style={{padding: '0 0 10px 0', width: '100%'}}>
          <span className='container-title'>Profile</span>
          <div className="flex-row">
            <input type="button" onClick={editButton} name='self-review' value={editToggle ? "Cancel" : "Edit"} className={editToggle ? "input-toggle-button toggle-off" : "input-toggle-button toggle-on"} />
          </div>
        </div>

        <div className="inner-container">
          <span className='input-desc'>Name</span>
          <input onChange={onChange} name='name' placeholder='User name' value={userProfile.name} className={editToggle ? "input-field edit-toggle-on" : "input-field edit-toggle-off"} />
        </div>

        <div className="inner-container">
          <span className='input-desc'>User bio</span>
          <textarea  onChange={onChange} name='bio' placeholder='Update bio' value={userProfile.bio} className={editToggle ? "input-field edit-toggle-on" : "input-field edit-toggle-off"} rows="3" style={{height: '150px', fontSize: '20px', padding: '15px', resize: 'none'}} />
        </div>

        <div className="inner-container">
          <span className='input-desc'>Website</span>
          <input onChange={onChange} name='url' placeholder='Update website url' value={userProfile.url} className={editToggle ? "input-field edit-toggle-on" : "input-field edit-toggle-off"} />
        </div>
        <SaveProfileButton />
      </div>
    </div>
	)
}

export default Profile

Profile.provider = AccountContext