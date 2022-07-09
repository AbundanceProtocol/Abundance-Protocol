import '../styles/index.css';
import 'easymde/dist/easymde.min.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { HiChevronUp as CollapseIcon, HiMenu } from 'react-icons/hi';
import { BiWalletAlt as WalletIcon } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa';
import { AccountContext } from '../context.js'
import useStore from './utils/store'
import {Logo, LeftCorner, RightCorner, Space } from './assets'
import { button } from './assets/button';

function App({ Component, pageProps }) {
  const router = useRouter()
  const store = useStore()
  const ref = useRef(null)
  const [navSize, setNavSize] = useState(1060)
  const [linkTarget, setLinkTarget] = useState('Vision')
  const [account, setAccount] = useState(null)
  const [accountText, setAccountText] = useState(null)
  const [navMenu, setNavMenu] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuHover, setMenuHover] = useState( {in: Date.now(), out: Date.now() } )
  
  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const setDeviceSize = useCallback(() => {
    const isMobile = window.innerWidth <= 768;
    store.setIsMobile(isMobile)
    if (!isMobile) {
      handleResize();
    }
  }, [store.setIsMobile])

  useEffect(() => {
    if (typeof window !== 'undefined') {

      window.addEventListener('resize', setDeviceSize)
    }
  }, [setDeviceSize])

  useEffect(() => {
    let menuLink = targetLink()
    setLinkTarget(menuLink)
    setNavMenu(button[menuLink].menu)
  }, [])

  useEffect( () => {
    if (menuHover.in > menuHover.out) {
      let subNavBox = document.getElementsByClassName("sub-nav-box")
      subNavBox[0].style.justifyContent = "left";
      subNavBox[0].style.padding = "8px 8px";
      subNavBox[0].style.gridGap = "8px";
      subNavBox[0].style.gridTemplateColumns =!store.isMobile && 'auto auto auto'  
    } else {
      if (typeof linkTarget !== 'object') {
        setNavMenu(button[linkTarget].menu)
        let subNavBox = document.getElementsByClassName("sub-nav-box")
        subNavBox[0].style.padding = "0 8px";
        subNavBox[0].style.gridGap = "4px";
        subNavBox[0].style.gridTemplateColumns =!store.isMobile && "repeat(6, 1fr)";
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


    if (button[linkTarget].link === btn.link && btn.working && accountState) {
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
    // const isEnlarge = !store.isMobile && btnHover
    return store.isMobile ? (
      <Link href={(btn.link && btn.working) ? btn.link : {}}>
        <a className={topBox} style={{borderRadius: '18px', padding: '16px 8px'}} {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          if (btn.link && btn.working) {
            setMobileMenuOpen(false)
          }
          }}>
            <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '8px', alignItems: 'center'}}>
              <div className="sub-cat-box" >
                <Icon className={iconClass} style={{width: '25px', height: '25px'}}/>
              </div>
              <div className="sub-cat-text flex-col" style={{pointerEvents: 'none'}}>
                <span className={titleClass} style={{fontSize: '15px', fontWeight:'800', paddingRight: '10px', pointerEvents: 'none', width: 'max-content'}}>{props.buttonName}</span>
                <span className={textClass} style={{fontSize: '12px', paddingRight: '10px', pointerEvents: 'none'}}>{btn.description}</span>
              </div>
            </div>
        </a>
      </Link>
    ) : (
      <Link href={(btn.link && btn.working) ? btn.link : {}}>
        <a className={topBox} style={{width: btnHover ? 'calc(100vw / 3.4)' : 'min-content', padding: btnHover ? '8px 16px' : '3px 5px 2px 10px', margin: btnHover ? '0' : '5px 10px', borderRadius: '15px'}} {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          }}>
          <div className="sub-cat-box" style={{margin: btnHover ? '8px 0' : '0 10px 0 0', minWidth: btnHover ? '50px' : '15px'}}>
            <Icon className={iconClass} iconsize={btnHover ? '30' : '15'} style={{height: btnHover ? '30px' : '15px', width: btnHover ? '30px' : '15px'}} />
          </div>
          <div className="sub-cat-text flex-col" style={{width: btnHover ? 'auto' : 'min-content', minWidth: btnHover ? null : '50px', pointerEvents: 'none'}}>
            <span className={titleClass} style={{fontSize: btnHover ?  '19px' : '15px', fontWeight: btnHover ? '800' : '600',  pointerEvents: 'none', width: btnHover ? '100%' : 'max-content'}}>{props.buttonName}</span>
            <span className={textClass} style={{fontSize: btnHover ? '15px' : '0', opacity: btnHover ? '1' : '0', pointerEvents: 'none'}}>{btn.description}</span>
          </div>
        </a>
      </Link>
    );
  }

  const ConnectButton = () => {
    return store.isMobile ? (
      <div className="size-icon-button flex-col flex-middle" style={{height: '48px', width: '48px'}}>
          <WalletIconButton onClick={!account ? connect : disconnect}>
            <WalletIcon style={{fontSize: '24px',}}/>
          </WalletIconButton>
      </div>
    ) : (
      <div onClick={!account ? connect : disconnect}>
        <div className="size-button flex-col flex-middle">
          <div className="flex-col flex-middle">
            <div className="font-12 mar-t-6 min-width" style={{fontWeight: '700', fontSize: '15px', margin: '0', padding: '0'}}>{!account ? "connect" : accountText}</div>
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
          <div className="grid-col centered">
            <div className={`logo-wrapper`}>
              <Logo height={store.isMobile ? '25px' : '45px'} width={store.isMobile ? '25px' : '45px'}/>
            </div>
            <div style={{ padding: '15px 15px' }}>
              <h2 className={`nav-title${store.isMobile ? ' mid-frame-font' : ''}`}>Abundance Protocol</h2>
              <p className={`nav-subtitle${store.isMobile ? ' small-font' : ''}`}>Building Web 4</p>
            </div>
          </div>
        </a>
      </Link>
    )
  }

  const TopNav = (props) => {
    let btn = button[props.buttonName]
    const TopIcon = btn.icon
    let menuState = "nav-link"
    let accountState = !btn.account || (account && btn.account)
    if (navMenu === btn.menu && accountState) {
      menuState = "active-nav-link"
    } else if (!accountState) {
      menuState = "inactive-nav-link"
    }

    return (
      <a onMouseEnter={() => {
        setNavMenu(btn.menu)
        setMenuHover({ ...menuHover, in: Date.now() })
      }}
      onMouseLeave={() => setMenuHover({ ...menuHover, out: Date.now() }) } 
      >
        <div className={menuState} style={{paddingRight: store.isMobile && '16px' }}>
          <div className="size-87 flex-col flex-middle">
            <div className="flex-col flex-middle">
              <TopIcon className="size-25" />
              <div className="font-15 mar-t-6">
                {props.buttonName}
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
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
      let accText = accounts[0]
      setAccountText(accText.slice(0, 5) + '...' + accText.slice(38, 42))
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

  const toggleDrawer =
  () =>
  (e) => {
    if (
      e.type === 'keydown' &&
      (e.key === 'Tab' ||
        e.key === 'Shift')
    ) {
      return;
    }

    setMobileMenuOpen( !mobileMenuOpen );
  };

  const MobileNavMenu = () => {
    return (
      <div className="mobile-menu-wrapper" style={{display: 'grid', gridAutoFlow: 'column', height: '100%', justifyContent: 'start', width: 'fit-content'}}>
        <Box height="100%" width="100%">
          <div style={{display: 'grid', gridAutoFlow: 'row'}}>
            {button['top-menu'].map((btn, index) => (
                <TopNav buttonName={btn} key={index} /> ))}
          </div>
        </Box>
        <Box style={{width: 'calc(100vw / 1.5)'}}>
          <div className="sub-nav-box" 
              style={{ 
                marginRight: '16px',
                padding: '24px 32px 32px 32px',
                backgroundColor: '#dddddde6', 
                borderRadius: '20px', 
                display: 'grid',
                gridAutoFlow: 'row',
                gridGap: '8px',
                justifyContent: 'start',
                alignItems: 'start',
              }} 
              onMouseEnter={() => {
              setMenuHover({ ...menuHover, in: Date.now() })
              }} onMouseLeave={() => {
              setMenuHover({ ...menuHover, out: Date.now() })}}>
              <SubCat />
            </div>
        </Box>
      </div>
    )
  }

  return store.isMobile ? (
    <div>
      <nav className="nav-bar-mobile">
        <React.Fragment key="top">
          <MobileAppbar position="fixed" elevation={0}>
            <NavbarHeader>
              <div className="navbar-header">
                <HomeButton />
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '16px', alignItems: 'center'}}>
                  <ConnectButton />
                  <MenuButton onClick={toggleDrawer()}>
                    {mobileMenuOpen ? <CollapseIcon style={{fontSize: '25px', color: '#eee'}}/> : <HiMenu style={{fontSize: '25px', color: '#eee'}} />}
                  </MenuButton>
                </Box>
              </div>
            </NavbarHeader>
          </MobileAppbar> 
          <Drawer elevation={0} anchor="top" variant="temporary" open={mobileMenuOpen} onClose={toggleDrawer()}  
            sx={{
              transform: 'translateY(62px)',
              zIndex: 1,
              background: '#1D3244dd',
              '& .MuiDrawer-paper': { width: 'fit-content',backgroundColor: 'transparent', padding: '16px 8px', overflowX: 'hidden'}
            }}
            >
            <MobileNavMenu />
          </Drawer>
        </React.Fragment>
      </nav>
      <div className="container">
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  ) : (
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
            <div className="sub-nav-box flex-row flex-wr" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                backgroundColor: '#dddddde6', 
                borderRadius: '20px', 
                margin: '0 10px 10px 10px',
              }} onMouseEnter={() => {
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

const MobileAppbar = styled(AppBar)`
  background: #1D3244dd;
  z-index: 2;
  padding: 0 24px;
`;

const NavbarHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  background: transparent;

  .navbar-header {

    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
  }

`;

const MenuButton = styled(Button)`
  width: 100%; 
  justify-content: flex-end; 
  align-items: start; 
  background: transparent;
`;

const WalletIconButton = styled.div`
  cursor: pointer;
`;

export default App;