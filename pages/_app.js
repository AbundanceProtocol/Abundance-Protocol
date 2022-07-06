import '../styles/index.css';
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { Logo, LeftCorner, RightCorner, Space } from './assets'
import { useRouter } from 'next/router'
import 'easymde/dist/easymde.min.css'
import { FaPen } from 'react-icons/fa';
import { button } from './assets/button';

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

function App({ Component, pageProps }) {
  const ref = useRef(null)
  const [navSize, setNavSize] = useState(1060)
  const router = useRouter()
  const [linkTarget, setLinkTarget] = useState('Vision')
  const [account, setAccount] = useState(null)
  const [accountText, setAccountText] = useState(null)
  const [navMenu, setNavMenu] = useState('Home')
  const [menuHover, setMenuHover] = useState( {in: Date.now(), out: Date.now() } )

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  useEffect(() => {
    let menuLink = targetLink()
    setNavSize(ref.current.offsetWidth - 60)
    setLinkTarget(menuLink)
    setNavMenu(button[menuLink].menu)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect( () => {
    if (menuHover.in > menuHover.out) {
      let subNavBox = document.getElementsByClassName("sub-nav-box")
      subNavBox[0].style.justifyContent = "left";  
    } else {
      if (typeof linkTarget !== 'object') {
        setNavMenu(button[linkTarget].menu)
      }
    }
  }, [menuHover, linkTarget])

  function handleResize() {
    setNavSize(ref.current.offsetWidth - 60)
  }

  const NavItem = (props) => {
    let btnHover = menuHover.in > menuHover.out
    let btn = button[props.buttonName]
    let Icon = btn.icon
    let menuVar = "pop-menu"
    let contentVar = "bg-blue"
    let textVar = ""
    let accountState = !btn.account || (account && btn.account)
    if (button[linkTarget].link === btn.link && btn.link && btn.working && accountState) {
      menuVar = "red-menu"
      contentVar = "bg-red"
      textVar = "bg-red"
    }
    if (!accountState) {
      menuVar = "grey-menu"
      contentVar = "bg-inactive"
      textVar = "bg-inactive"
    }
    if (!btn.working) {
      menuVar = "grey-menu"
      contentVar = "bg-grey"
      textVar = "bg-grey"
    }
    let topBox = `sub-cat-top-box flex-row ${menuVar}`
    let iconClass = `sub-cat-icon ${contentVar} size-30`
    let titleClass = `sub-cat-title nav-frame-title ${textVar} full-w`
    let textClass = `sub-cat-desc nav-frame-desc ${textVar} full-w`
    if (typeof Icon == 'undefined') { Icon = FaPen }
    let attributes = {}
    if (!btn.link) {
      attributes = {target: '_blank', rel: 'noopener noreferrer', href: btn.url}
    }
    return (
      <Link href={(btn.link && btn.working) ? btn.link : {}}>
        <a className={topBox} style={{width: btnHover ? '333px' : 'min-content', padding: btnHover ? '10px' : '3px 5px 2px 10px', margin: btnHover ? '10px' : '5px 10px', borderRadius: '15px'}} {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          }}>
          <div className="sub-cat-box" style={{margin: btnHover ? '8px 0 8px 8px' : '0 10px 0 0', minWidth: btnHover ? '50px' : '15px'}}>
            <Icon className={iconClass} iconsize={btnHover ? '30' : '15'} style={{height: btnHover ? '30px' : '15px', width: btnHover ? '30px' : '15px'}} />
          </div>
          <div className="sub-cat-text flex-col" style={{width: btnHover ? 'auto' : 'min-content', minWidth: btnHover ? '260px' : '50px', pointerEvents: 'none'}}>
            <span className={titleClass} style={{fontSize: btnHover ?  '19px' : '15px', fontWeight: btnHover ? '800' : '600', paddingRight: '10px', pointerEvents: 'none', width: btnHover ? '100%' : 'max-content'}}>{props.buttonName}</span>
            <span className={textClass} style={{fontSize: btnHover ? '15px' : '0', opacity: btnHover ? '1' : '0', paddingRight: '10px', pointerEvents: 'none'}}>{btn.description}</span>
          </div>
        </a>
      </Link>
    );
  }

  const ConnectButton = () => {
    return (
      <div onClick={!account ? connect : disconnect}>
        <div className="size-button flex-col flex-middle">
          <div className="flex-col flex-middle">
            <div className="font-12 mar-t-6 min-width" style={{fontWeight: '700', fontSize: '15px', margin: '0', padding: '0'}}>{!account ? "connect" : "disconnect"}</div>
          </div>
        </div>
      </div>
    );
  }

  const HomeButton = () => {
    return (
      <Link href="/">
        <a className={navMenu === "Home" ? "nav-home-button-active" : "nav-home-button"} onMouseEnter={() => {
          setNavMenu('Home')
          setMenuHover({ ...menuHover, in: Date.now() })
        }} onMouseLeave={() => {
          setMenuHover({ ...menuHover, out: Date.now() })
        }}>
          <div className="flex-row">
            <Logo />
            <div style={{ padding: '15px 15px' }}>
              <h2 className="nav-title">Abundance Protocol</h2>
              <p className="nav-subtitle">Building Web 4</p>
            </div>
          </div>
        </a>
      </Link>
    )
  }

  const TopNav = (props) => {
    let btn = button[props.buttonName]
    let btnName = props.buttonName
    let textSize = '15px'
    if (btnName === 'portal' && account) {
      btnName = accountText
    }
    const TopIcon = btn.icon
    let menuState = "nav-link"
    let accountState = !btn.account || (account && btn.account)
    if (navMenu === btn.menu && accountState) {
      menuState = "active-nav-link"
    } else if (!accountState) {
      menuState = "inactive-nav-link"
    }
    return (
      <a style={{maxWidth: '87px'}} onMouseEnter={() => {
        setNavMenu(btn.menu)
        setMenuHover({ ...menuHover, in: Date.now() })
      }} onMouseLeave={() => { setMenuHover({ ...menuHover, out: Date.now() }) }}>
        <div className={menuState}>
          <div className="size-87 flex-col flex-middle">
            <div className="flex-col flex-middle">
              <TopIcon className="size-25" />
              <div className="font-15 mar-t-6" style={{textAlign: 'center'}}>
                {btnName}
              </div>
            </div>
          </div>
        </div>
      </a>
    )
  }

  const SubCat = () => {
    try {
      let subButtons = button['nav-menu'][navMenu]
      if (typeof subButtons == 'undefined') {
        subButtons = button['nav-menu']['Home']
      }
      return (
        subButtons.map((btn, index) => (
          <NavItem buttonName={btn} key={index} /> ))
      )
    } catch (err) {
      console.log('error:', err)
      return null;
    }
  }

  function targetLink() {
    let search = router.asPath
    for (let key in button) {
      if (button[key].link === search) {
        return key
      }
    }
    return "Vision"
  }

  async function getWeb3Modal() {
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

  async function connect() {
    if (window.ethereum == null) {
      throw new Error('No injected Ethereum provider found')
    }
    await authenticate(window.ethereum)
  }

  async function authenticate(ethereumProvider) {
    try {
      const accounts = await ethereumProvider.request({method: 'eth_requestAccounts',})
      const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
      const session = new DIDSession({ authProvider })
      const did = await session.authorize()
      ceramic.did = did
      setAccount(accounts[0])
      let name = await getProfileFromCeramic()
      let accText = accounts[0]
      if (!name) {
        setAccountText(accText.slice(0, 5) + '...' + accText.slice(38, 42))
      } else {
        setAccountText(name)
      }
    } catch (err) {
      console.log('error:', err)
    }
  }

  async function disconnect() {
    setAccountText(null)
    setAccount(null)
    setTimeout(() => {
      router.push('/')
    }, 100)
  }

  async function getProfileFromCeramic() {
    try {
      //use the DIDDatastore to get profile data from Ceramic
      const profile = await datastore.get('BasicProfile')
      if (profile !== null) {
        return profile.name
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <nav className="nav-bar">
        <div className="flex-row top-nav-wrap" ref={ref}>
          <Space />
          <div className="nav-head">
            <HomeButton />
            <Space />
            { button['top-menu'].map((btn, index) => (
              <TopNav buttonName={btn} key={index} /> ))}
            <ConnectButton />
          </div>
          <Space />
        </div>
        <div className="flex-row" style={{width: '100%', alignItems: 'flex-start' }}>
          <div className="nav-shadow" style={{width: '100%', height: '1px', backgroundColor: ''}}>
            <div className="flex-row flex-right"><RightCorner /></div>
          </div>
          <div className="nav-shadow" style={{height: 'min-content', width: 'min-content', backgroundColor: '#1D3244dd', borderRadius: '0 0 30px 30px', justifyContent: 'center'}}>
            <div className="flex-row flex-middle" style={{width: '100%', margin: '0', justifyContent: 'center'}}>
              <div className="sub-nav-box flex-row flex-wr" style={{width: 'max-content', maxWidth: (navSize < 1000) ? navSize + 'px' : '1060px', backgroundColor: '#dddddde6', borderRadius: '20px', margin: '0 10px 10px 10px'}} onMouseEnter={() => {
              setMenuHover({ ...menuHover, in: Date.now() })
              }} onMouseLeave={() => {
              setMenuHover({ ...menuHover, out: Date.now() })}}>
                <SubCat />
              </div>
            </div>
          </div>
          <div className="nav-shadow" style={{height: '1px', backgroundColor: '', width: '100%'}}>
            <div className="flex-row flex-left"><LeftCorner /></div>
          </div>
        </div>
      </nav>
      <div className="container">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  )
}

export default App