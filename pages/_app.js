import '../styles/index.css';
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { HiChevronUp as CollapseIcon, HiMenu } from 'react-icons/hi';
import { FaPen } from 'react-icons/fa';
import { AccountContext } from '../context.js'
import useStore from '../utils/store'
import useMatchBreakpoints from '../hooks/useMatchBreakpoints';
import useAuth from '../hooks/useAuth';
import {Logo, LeftCorner, RightCorner, Space } from './assets'
import { button } from './assets/button';
import ConnectButton from '../components/ConnectButton';

function App({ Component, pageProps }) {
  const store = useStore()
  const auth = useAuth();
  const { isMobile, isTablet } = useMatchBreakpoints();
  const ref = useRef(null)
  const [navSize, setNavSize] = useState(1060)
  const router = useRouter()
  const [navWidth, setNavWidth] = useState((ref?.current?.offsetWidth - 1312)/2 - 167)
  const [linkTarget, setLinkTarget] = useState('Vision')
  const [account, setAccount] = useState(null)
  const [navMenu, setNavMenu] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuHover, setMenuHover] = useState( {in: Date.now(), out: Date.now() } )
  const Col = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    justify-content: space-between;
    grid-gap: 32px;
    width: 100%;

    @media(min-width: 1440px) {
      grid-gap: ${navWidth}px;
    }
  `;

  useEffect(() => {
    // console.log('route', router.route)
    useStore.setState({ router })
  }, [router])

  useEffect(() => {
    let menuLink = targetLink()
    setNavSize(ref?.current?.offsetWidth - 60)
    setLinkTarget(menuLink)
    setNavMenu(button[menuLink].menu)
    handleNavResize()
    window.addEventListener("resize", handleNavResize);
    return () => window.removeEventListener("resize", handleNavResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  function handleNavResize() {
    setNavWidth((ref?.current?.offsetWidth - 1312)/2 - 167)
  }

  const onAccount = useCallback(() => {
    store.setAccount(auth.account)
    store.setUsername(auth.username)
    setAccount(auth.account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.account, auth.username, setAccount])

  useEffect(() => {
    onAccount()
  }, [onAccount])

useEffect( () => {
  if (menuHover.in <= menuHover.out && typeof linkTarget !== 'object') {
    setNavMenu(button[linkTarget].menu)
  }
}, [linkTarget, menuHover.in, menuHover.out])

  function handleResize() {
    setNavSize(ref?.current?.offsetWidth - 60)
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

    return isMobile ? (
      <Link href={(btn.link && btn.working) ? btn.link : router.route}>
        <a className={topBox} style={{borderRadius: '18px', padding: '16px 8px'}} {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          if (btn.link && btn.working) {
            setMobileMenuOpen(false)
          }
          }}>
            <div style={{display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '8px', alignItems: 'center'}}>
              <div className="sub-cat-box" >
                <Icon className={iconClass} iconsize="25"  style={{width: '25px', height: '25px'}}/>
              </div>
              <div className="sub-cat-text flex-col" style={{pointerEvents: 'none'}}>
                <span className={titleClass} style={{fontSize: '15px', fontWeight:'800', paddingRight: '10px', pointerEvents: 'none', width: 'max-content'}}>{props.buttonName}</span>
                <span className={textClass} style={{fontSize: '12px', paddingRight: '10px', pointerEvents: 'none'}}>{btn.description}</span>
              </div>
            </div>
        </a>
      </Link>
    ) : (
      <Link href={(btn.link && btn.working) ? btn.link : router.route}>
        <a className={topBox}  {...attributes} onClick={() => {
          setLinkTarget(props.buttonName)
          }}>
          <div className="sub-cat-box" style={{margin: btnHover ? '8px 0' : '0 10px 0 0', minWidth: btnHover ? '50px' : '15px'}}>
            <Icon className={iconClass} iconsize={btnHover ? isTablet ? '25' : '30' : '15'} style={{height: btnHover ? '30px' : '15px', width: btnHover ? '30px' : '15px'}} />
          </div>
          <div className="sub-cat-text flex-col" style={{width: btnHover ? 'auto' : 'min-content', minWidth: btnHover ? null : '50px', pointerEvents: 'none'}}>
            <span className={titleClass} style={{fontSize: btnHover ?  isTablet ? '15px' : '19px' : isTablet ? '13px' : '15px', fontWeight: btnHover ? '800' : '600',  pointerEvents: 'none', width: btnHover ? '100%' : 'max-content'}}>{props.buttonName}</span>
            <span className={textClass} style={{fontSize: btnHover ? isTablet ? '12px' : '15px' : '0', opacity: btnHover ? '1' : '0', pointerEvents: 'none'}}>{btn.description}</span>
          </div>
        </a>
      </Link>
    );
  }

  const HomeButton = () => {
    const isSmall = isMobile || isTablet;
    return (
      <Link href="/">
        <a className={navMenu === "Home" ? "nav-home-button-active" : "nav-home-button"} onMouseEnter={() => {
          setNavMenu('Home')
          setMenuHover({ ...menuHover, in: Date.now() })
        }} onMouseLeave={() => {
          // setMenuHover({ ...menuHover, out: Date.now() })
        }}>
          <div className="grid-col centered">
            <div className="logo-wrapper">
              <Logo height={isSmall ? '25px' : '45px'} width={isSmall ? '25px' : '45px'}/>
            </div>
            <TitleWrapper >
              <h2 className={`nav-title${isSmall ? ' mid-frame-font' : ''}`}>Abundance Protocol</h2>
              <p className={`nav-subtitle${isSmall ? ' small-font' : ''}`}>building an economy of abundance</p>
            </TitleWrapper>
          </div>
        </a>
      </Link>
    )
  }

  const TopNav = (props) => {
    let btn = button[props.buttonName]
    let btnName = props.buttonName
    // let textSize = '15px'
    if (btnName === 'portal' && account) {
      btnName = store.username
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
      <div style={{padding: '0 8px'}} onMouseEnter={() => {
        setNavMenu(btn.menu)
        setMenuHover({ ...menuHover, in: Date.now() })
      }}
      onMouseLeave={() => setMenuHover({ ...menuHover, out: Date.now() }) }>
        <a style={{maxWidth: '87px'}}  
        >
          <div className={menuState} style={{paddingRight: isMobile ? '1em' : 'unset' }}>
            <div className="flex-col flex-middle" style={{height: '87px', padding: '0 10px'}}>
              <div className="flex-col flex-middle">
                <TopIcon className="size-25" />
                <div className="font-15 mar-t-6" style={{textAlign: 'center', fontSize: isTablet ? '12px' : '15px'}}>
                  {btnName}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
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
  
  const connect = async () => {
    await auth.connect()
  }


  async function disconnect() {
    auth.disconnect();
    store.setAccount(null)

    setAccount(null)
    setTimeout(() => {
      console.log('rerouting')
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
      <div className="mobile-menu-wrapper" style={{display: 'grid', gridAutoFlow: 'column', height: '100%', justifyContent: 'start', width: '100%'}}>
        <Box height="100%" width="100%">
          <div style={{display: 'grid', gridAutoFlow: 'row'}}>
            {button['top-menu'].map((btn, index) => (
                <TopNav buttonName={btn} key={index} /> ))}
          </div>
        </Box>
        <Box style={{width: 'calc(100vw / 1.4)'}}>
          <MobileNavBox className="sub-nav-box" 
              onMouseEnter={() => {
              setMenuHover({ ...menuHover, in: Date.now() })
              }} onMouseLeave={() => {
              setMenuHover({ ...menuHover, out: Date.now() })}}>
              <SubCat />
            </MobileNavBox>
        </Box>
      </div>
    )
  }

  return isMobile ? (
    <div>
        <React.Fragment key="top">
        <MobileAppbar className='top-layer' position="fixed" elevation={0} sx={{paddingRight: 0}}>
      <nav className="nav-bar-mobile">
            <NavbarHeader>
              <div className="navbar-header">
                <HomeButton />
                <div style={{padding: '0 0px', margin: '0 0 0 20px'}}>
                <a style={{maxWidth: '87px'}} href="https://impact.abundance.id" target="_blank" rel="noopener noreferrer">
                  <div className='nav-link' style={{paddingRight: isMobile ? '1em' : 'unset' }}>
                    <div className="flex-col flex-middle" style={{height: '60px', padding: '0 0px'}}>
                      <div className="flex-col flex-middle app-lnk" style={{padding: '5px'}}>
                        <div className="font-15 app-txt" style={{fontSize: isTablet ? '10px' : '10px'}}>Launch App</div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
                <Box className="navbar-header-end" sx={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', alignItems: 'center', justifyContent: 'space-between'}}>
                  {/* <ConnectButton 
                    account={store.account}
                    isMobile={isMobile}
                    onConnect={connect}
                    onDisconnect={disconnect}
                    /> */}
                  <MenuButton onClick={toggleDrawer()}>
                    {mobileMenuOpen ? <CollapseIcon/> : <HiMenu />}
                  </MenuButton>
                </Box>
              </div>
            </NavbarHeader>
          </nav>
          </MobileAppbar> 
          <Drawer className='top-layer' elevation={0} anchor="top" variant="temporary" open={mobileMenuOpen} onClose={toggleDrawer()}  
            sx={{
              transform: window.innerWidth <= 360 ? 'translateY(56px)' :'translateY(62px)',
              zIndex: 1,
              background: '#1D3244dd',
              '& .MuiDrawer-paper': { width: 'fit-content',backgroundColor: 'transparent', padding: '16px', overflowX: 'hidden'}
            }}
            >
            <MobileNavMenu />
          </Drawer>
        </React.Fragment>
      <div className="container">
        <AccountContext.Provider value={store.account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  ) : (
      <div style={{width: '100%'}}>
        <nav className="nav-bar top-layer flex-row" style={{justifyContent: 'center', width: '100%'}}>
          <div className="flex-row top-nav-wrap" ref={ref} style={{width: '100%'}}
            >
            <div className='flex-row' style={{justifyContent: 'center', width: '100%'}}>
              <div className="nav-head" style={{display: 'grid', gridAutoFlow: 'column', justifyContent: 'space-between', alignItems: 'center', gridGap: '16px', maxWidth: '1280px'}}>
                <HomeButton />
                <Col>
                  <TopNavWrapper>
                      { button['top-menu'].map((btn, index) => (
                        <TopNav buttonName={btn} key={index} /> ))}
                      <div style={{padding: '0 0px', margin: '0 0 0 20px'}}>
                        <a style={{maxWidth: '87px'}} href="https://impact.abundance.id" target="_blank" rel="noopener noreferrer">
                          <div className='nav-link' style={{paddingRight: isMobile ? '1em' : 'unset' }}>
                            <div className="flex-col flex-middle" style={{height: '87px', padding: '0 0px'}}>
                              <div className="flex-col flex-middle app-lnk" style={{}}>
                                <div className="font-15 app-txt" style={{fontSize: isTablet ? '12px' : '15px'}}>Launch Impact App</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </TopNavWrapper>
                    {/* <ConnectButton 
                      account={account}
                      isMobile={isMobile}
                      onConnect={connect}
                      onDisconnect={disconnect}
                    /> */}
                </Col>
              </div>
            </div>
            <Space />
          </div>
          <div className="flex-row" style={{width: '100%', alignItems: 'flex-start' }}>
            <div className="nav-shadow" style={{width: '100%', height: '1px', backgroundColor: ''}}>
              <div className="flex-row flex-right"><RightCorner /></div>
            </div>
            <div className="nav-shadow" style={{height: 'min-content', width: 'min-content', backgroundColor: '#1D3244dd', borderRadius: '0 0 30px 30px', justifyContent: 'center'}}>
              <SubNavBoxWrapper isHover={menuHover.in > menuHover.out} className="flex-row flex-middle">
              <div className="sub-nav-box" onMouseEnter={() => {
                setMenuHover({ ...menuHover, in: Date.now() })
                }} onMouseLeave={() => {
                setMenuHover({ ...menuHover, out: Date.now() })}}>
                  <SubCat />
                </div>
              </SubNavBoxWrapper>
            </div>
            <div className="nav-shadow" style={{height: '1px', backgroundColor: '', width: '100%'}}>
              <div className="flex-row flex-left"><LeftCorner /></div>
            </div>
          </div>
        </nav>
        <div className="container">
          <AccountContext.Provider value={store.account}>
            <Component {...pageProps} connect={connect} />
          </AccountContext.Provider>
        </div>
      </div>
  )
}


const MobileAppbar = styled(AppBar)`
  background: #1D3244dd;
  z-index: 2;
  padding: 0 16px;

  @media(max-width: 360px) {
    padding: 0 16px 0 8px;
  }


`;

const NavbarHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: baseline;
  background: transparent;
  

  .navbar-header {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
    // grid-gap: 16px;

    // @media(max-width: 360px) {
    //   grid-gap: 4px;
    // }
  
    .navbar-header-end {
      grid-gap: 16px;
      @media(max-width: 360px) {
        grid-gap: 4px;
      }
    }
  }

`;

const MobileNavBox = styled.div`
  margin-right: 16px;
  padding: 16px 24px 24px 24px;
  background-color: #dddddde6; 
  border-radius: 20px; 
  display: grid;
  grid-auto-flow: row;
  grid-gap: 8px;
  justify-content: start;
  alignItems: start;
  
  @media(max-width: 360px) {
    padding: 8px;
  }
`;

const MenuButton = styled(Button)`
  width: 100%; 
  justify-content: center; 
  align-items: start; 
  background: transparent;
  min-width: 48px;
  max-width: 48px;
  font-size: 25px;
  color: #eee;

  @media(max-width: 360px) {
    font-size: 22px;
    min-width: 40px;
    max-width: 40px;
  }
`;



const TopNavWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: center;

  > * svg {
    width: 18px;
    height: 18px;
  }
  @media(min-width: 1024px) {
    > * svg {
      width: 25px;
      height: 25px;
    }
  }
`;



const TitleWrapper = styled.div`
  padding: 15px;

  @media(max-width: 360px) {
    h2 {

      font-size: 14px;
    }

    p {
      font-size: 10px;
    }
  }

  
`;

const SubNavBoxWrapper = styled.div`
  width: 100%;
  margin: 0;
  justify-content: center;

  @media(min-width: 638px) {
    .sub-nav-box {
      background: #dddddde6;
      border-radius: 20px;
      margin: 0 10px 10px 10px;
      padding: ${props => props.isHover ? '8px' : '0 8px'};
      display: grid;

      grid-gap: ${props => props.isHover ? '8px' : '4px'};
      grid-template-columns:${props => props.isHover ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'};
      transition: all ease-in-out 0.1s;
      
      .sub-cat-top-box {
        border-radius: 15px;
        display: grid;
        grid-auto-flow: column;
        justify-content: center;
        align-items: center;
        padding: ${props => props.isHover ? '8px 16px' : '4px 8px'};
        margin: ${props => props.isHover ? '0' : '5px 0'};
        width: ${props => props.isHover ? 'calc(100vw / 3.4)' : '100%'};
        justify-content: start;
      }
      @media(min-width: 1024px) {
        .sub-cat-top-box {
            width: ${props => props.isHover ? 'calc(100vw / 3.4)' : '100%'};
            padding: ${props => props.isHover ? '4px 8px' : '3px 5px 2px 10px'};
            margin: ${props => props.isHover ? '0' : '5px 10px'};
            border-radius: 15px;
            justify-content: start;
        }
      }
  
      @media(min-width: 1440px) {
        .sub-cat-top-box {
          width: ${props => props.isHover ? '420px' : 'min-content'};
          padding: ${props => props.isHover ? '4px 8px' : '3px 5px 2px 10px'};
          margin: ${props => props.isHover ? '0' : '5px 10px'};
          border-radius: 15px;
          justify-content: start;
        }
      }
  
    }
  }

`;

export default App;
