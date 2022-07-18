import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking';
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DIDDataStore } from '@glazed/did-datastore'
import { DIDSession } from '@glazed/did-session'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import React, { useEffect, useState } from 'react';
import { shortenAddress } from '../utils/utils';

// const defaultState = {
//     account: undefined,
//     username: undefined,
//     provider: undefined,
//     chainId: undefined,
//     connect: async () => {
//         throw new Error("Must override connect function")
//     },
//     disconnect: async () => {
//         throw new Error("Must override connect function")
//     },
//     getBalance: async () => {
//         throw new Error("Must override connect function")
//     },
//     getAccounts: async () => {
//         throw new Error("Must override connect function")
//     },
//     connected: false,
//     disconnected: true,
//     isConnecting: false,
//     isDisconnecting: false,
// } 

// const AuthContext = React.createContext(defaultState);

// export function useAuth() {
//     return useContext(AuthContext);
// }

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

const useAuth = () => {
    const [account, setAccount] = useState()
    const [connecting, setConnecting] = useState(false);
    const [disconnecting, setDisconnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [authSession, setAuthSession] = useState(null);
    const [username, setUsername] = useState(null);
    const [chain, setChain] = useState('eth')

    
    // useEffect(() => {
    //     if (chain === 'eth') {
    //         getEthProvider();
    //     }
    // }, [chain])

    // function getEthProvider() {
    //     const { ethereum } = window;
    //     if (ethereum && typeof ethereum !== "undefined") {
    //         console.log('ethereum', ethereum)
    //         setEthProvider(ethereum);
    //         return ethereum;
    //     }

    //     return null;
    // }
    useEffect(() => {
        if (provider) {
            provider.on('accountsChanged', () => {
                console.log('account changed')
            })
        }
        console.log('provider', provider)
    }, [provider])
    

    async function connect() {

        const web3Modal = await getWeb3Modal()
        const connection = await web3Modal.connect()
        // // console.log('connection', connection.cachedProvider)
        const ethProvider = new ethers.providers.Web3Provider(connection)
        const accounts = await ethProvider.listAccounts()
       
        setProvider(ethProvider)
        const { ethereum } = window;
        // if (!ethereum || typeof ethereum === "undefined" ) {
        //     window.open('https://metamask.io/download', '_blank')
        //     return;
        // }
        // console.log('provieer', ethereum)
        // console.log('ethereum address', ethereum.selectedAddress)
        setAccount(ethereum.selectedAddress)
        setUsername(shortenAddress(ethereum.selectedAddress))
        await authenticate(ethereum)
    }
    
    async function authenticate(ethProvider) {
        setConnecting(true);

        try {
            const _account = ethProvider.selectedAddress
            
            const authProvider = new EthereumAuthProvider(ethProvider, _account);
            console.log('authprovider', authProvider)
            const session = new DIDSession({ authProvider });
            
            setAuthSession(session);

            const did = await session.authorize()
            ceramic.did = did
            const name = await getProfileFromCeramic()
            console.log('name', name)
            if (name && typeof name !== "undefined") {
                // if username fetched, update shorted address with username
                setUsername(name)
            }
            setConnected(true)
        } catch (err) {
            console.error('error:', err)
        } finally {
            setConnecting(false);
        }
      }

      function getWeb3Modal() {
        const web3Modal = new Web3Modal({
          cacheProvider: false,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider,
              options: {
                infuraId: "f7b15f0b1a2d49e2b9f0e9b666842ff1"
              },
            },
          },
        })
        return web3Modal
      }

    
    function disconnect() {
        setDisconnecting(true)

        try {
            setAccount(null)
            setUsername(null)
            setAuthSession(null)
            setProvider(null)
            setConnected(false)
        } catch (err) {
            console.error(err)
        } finally {
            setDisconnecting(false)
        }
    }

    async function getProfileFromCeramic() {
        try {
            //use the DIDDatastore to get profile data from Ceramic
            const profile = await datastore.get('BasicProfile')
            console.log('profile', profile)
            return profile?.name

        } catch (error) {
          console.error(error)
          return null;
        }
      }

    async function getBalance() {
        if (!ethProvider) {
            throw new Error("No injected Ethereum provider found")
        }

        try {
            const balance = await ethProvider.request({ method: 'eth_getBalance'})
            return balance
        } catch (err) {
            console.error(err)
        }
    }

    return {
        account,
        username,
        provider,
        chain,
        authSession,
        connected,
        connecting,
        disconnecting,
        connect,
        disconnect,
        getBalance,
    }
}


export default useAuth;