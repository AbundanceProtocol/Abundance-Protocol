import { useContext, useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import { Swords, CoinBag, CoinStack, Waste, AbundanceStar, FeedbackLoop } from './assets'
import ReactPlayer from "react-player"
import Link from 'next/link'
import { AccountContext } from '../context'
import { Circles } from './assets'
import useMatchBreakpoints from '../hooks/useMatchBreakpoints'

export default function Home(props) {
  const ref = useRef(null)
  const { isMobile } = useMatchBreakpoints();
  const [vidSize, setVidSize] = useState({w: 1220 + 'px', h: 1220/16*9 + 'px'})
  const { posts } = props
  const account = useContext(AccountContext)
  const [viewToggle, setViewToggle] = useState({record: false, source: false, media: false, science: false})
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  function handleResize() {
    setVidSize({w: ref.current.offsetWidth - 40 + 'px', h: (ref.current.offsetWidth - 40)/16*9 + 'px'})

    for (let i = 0; i <= 12; i++) {
      // Get the elements by their IDs or classes
      const AB1 = document.getElementById(`AB${i}`);
      const SC1 = document.getElementById(`SC${i}`);

      // Find the maximum height
      const maxHeight = Math.max(AB1.clientHeight, SC1.clientHeight);

      // Set the height for both elements
      AB1.style.height = `${maxHeight}px`;
      SC1.style.height = `${maxHeight}px`;
    }
  }

  const LineBreak = () => {
    return (
      <div style={{padding: '50px 0 0 0'}}>
        <p style={{fontSize: 0}}>&nbsp;</p>
      </div>
    )
  }

  return (
  <div>
    <div className="t-p-130 top layer" style={{backgroundColor: '#e4eadf'}}>
      <Circles />
      <div className="top-frame flex-middle flex-row top-layer">
        <div className="border-style wrap-cln flex-middle flex-col top-layer">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
      <div className="top-frame flex-middle mid-layer">
        <div className="flex-middle flex-row flex-wr mid-layer" ref={ref}>
          <div className='flex-col flex-2 mid-layer'>
            <p className={`${isMobile ? "large-font-mobile" : "font-46"} mid-layer`}>BUILDING AN ECONOMY OF ABUNDANCE</p>
            <p className="font-30">Abundance Protocol solves two fundamental problems in our economy: market failures in public goods and negative externalities</p>
          </div>
          <div className='mid-layer'>
            <img className='homepage-img' src={'./images/abundanceisland01.png'} alt="Abundance Paradigm" />
          </div>
        </div>
      </div>

      <LineBreak />
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">Why Abundance?</p>
        </div>
      </div>
        <LineBreak />
      </div>
      <div className="mid-layer flex-row flex-wr" style={{backgroundColor: '#e4eadf', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>

        <div className='flex-col left-side dashed-br'>

          <div className="flex-row left-side bg-container">
            <div id='SC0' className='side-container mid-layer'>
              <p className="h2-title">Current Paradigm</p>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-grey1 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <div className="flex-row left-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='SC1' className='mid-layer centralize' style={{width: 100}}>
                  <CoinStack />
                </div>
              </div>
              <div className='mid-layer'>
                <p id='SC2' className="frame-title">Scarce Funding</p>
              </div>
              <div id='SC3' className='' style={{padding: '0 17%'}}>
                <p id='SC4' className="title-desc">The current econommic paradigm has no effective mechanisms to capture the value of public goods (scientific research, open source software, public infrastructure, and so on). Thus funding for these goods is limited</p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-grey2 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <LineBreak />
          <div className="flex-row left-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='SC5' className='mid-layer centralize' style={{width: 300}}>
                  <Swords />
                </div>
              </div>
              <div className='mid-layer'>
                <p id='SC6' className="frame-title">Digital Tribalism</p>
              </div>
              <div id='SC7' className='' style={{padding: '0 17%'}}>
                <p id='SC8' className="title-desc">Speculatoin and lack of funding for public goods create a dynamic where every person, project, company and ecosystem compete for attention, talent and users - resulting in tribalism that hurts the common good.</p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-grey1 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <LineBreak />
          <div className="flex-row left-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='SC9' className='mid-layer centralize' style={{width: 300}}>
                  <Waste />
                </div>
              </div>
              <div className='mid-layer'>
                <p id='SC10' className="frame-title">Negative Externalities</p>
              </div>
              <div id='SC11' className='' style={{padding: '0 17%'}}>
                <p id='SC12' className="title-desc">There is an incentive in the economy to offload proudction costs onto the public. This way the private business gets all the returns while the public suffers the harms. There is no effective feedback loop in the market to fix this problem.
                </p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-grey2 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
        </div>
        <div className='flex-col left-side' style={{overflow: 'hidden', width: '100%'}}> 
          <div className="flex-row right-side">
            <div id='AB0' className='side-container mid-layer'>
              <p className="h2-title">Abundance Paradigm</p>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-green1 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <div className="flex-row right-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='AB1' className='mid-layer centralize' style={{width: 350}}>
                  <CoinBag />
                </div>
              </div>
              <div className='mid-layer'>
                <p id='AB2' className="frame-title">Funding Public Goods</p>
              </div>
              <div id='AB3' className='' style={{padding: '0 17%'}}>
                <p id='AB4' className="title-desc">Protocols like Bitcoin and Ethereum funded the common good of network security to the tune of over $1 trillion through their consensus mechanism. Abundance Protocol aims to expand this mechanism to all common and public goods (<a href="https://docs.abundance.id/docs/articles/introducing-abundance-protocol" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>learn more</a>)</p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-green2 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <LineBreak />
          <div className="flex-row right-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='AB5' className='mid-layer centralize rotate' style={{width: 350}}>
                  <AbundanceStar />
                </div>
              </div>
              <div className='mid-layer'>
                <p id='AB6' className="frame-title">Superalignment</p>
              </div>
              <div id='AB7' className='' style={{padding: '0 17%'}}>
                <p id='AB8' className="title-desc">Abundance&apos;s superpower is the ability to align the economic incentives of rival communities and organizations. It aligns researchers and developers to work on impactful problems, creating cross-project alignment and progress for all (<a href="https://book.abundance.id/part-iii/chapter-8-superalignment" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>learn more</a>)</p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-green3 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
          <LineBreak />
          <LineBreak />
          <div className="flex-row right-side bg-container">
            <div className='flex-col side-container' style={{width: '100%'}}>
              <div className='flex-row centralize'>
                <div id='AB9' className='mid-layer centralize' style={{width: 350}}>
                  <FeedbackLoop />
                </div>
              </div>
              <div className=''>
                <p id='AB10' className="frame-title">Feedback Loops</p>
              </div>
              <div id='AB11' className='' style={{padding: '0 17%'}}>
                <p id='AB12' className="title-desc">Abundance Protocol creates effective loops for both public goods and negative externalities. By incentivizing public goods proudction and disincentivizing externalities, abundance creates alignment between individual self-interest and the public interest  (<a href="https://book.abundance.id/part-iii/chapter-7-the-abundance-protocol" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>learn more</a>)</p>
              </div>
            </div>
            <div className='bottom-layer bg-container'>
              <div className='cr-green2 cr-opacity cr-blur bottom-layer side-container'></div>
            </div>
          </div>
        </div>
      </div>
      <div className="top layer" style={{backgroundColor: '#e4eadf'}}>
      <LineBreak />
      <LineBreak />
      <LineBreak />
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">Proof-of-Impact Consensus Mechanism</p>
        </div>
      </div>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h">
          <p className="font-24" style={{ textAlign: 'justify' }}>Bitcoin and Ethereum, the two most prominent blockchain protocols, have funded the common good of network security to the tune of over 1 trillion dollars. Abundance Protocol aims to build on this success, and progressively expand this capability to all common and public goods through a Proof-of-Impact Consensus Mechanism.</p>
          <p className="font-26" style={{ textAlign: 'left' }}>Find out more in the <a href="https://whitepaper.abundance.id/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>Abundance Protocol Whitepaper</a></p>
          </div>
      </div>

      <LineBreak />
      <LineBreak />
      <LineBreak />
      <LineBreak />
      <LineBreak />


      <div className="top-frame flex-row flex-wr">
        <div className="flex-col flex-1 min-h flex-4" style={{paddingLeft: '10px'}}>
          <p className="frame-title" style={{textAlign: 'left'}}>Discover</p>
          <p className="frame-desc text-l ftr-lnk"><Link className="frame-desc text-l" href="/">Home</Link></p>
          <p className="frame-desc text-l ftr-lnk" style={{color: '#999'}}><Link className="frame-desc text-l" href="/">Vision</Link></p>
          <p className="frame-desc text-l ftr-lnk"><Link className="frame-desc text-l" href="/roadmap">Roadmap</Link></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://miro.com/app/board/uXjVPUvJDaU=/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Miro project board</a></p>
          {/* <p className="frame-desc text-l ftr-lnk"><Link className="frame-desc text-l" href="/blog">Blog</Link></p> */}
          {/* <p className="frame-desc text-l ftr-lnk"><a href="https://mirror.xyz/0xabundance.eth" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Mirror</a></p> */}
          <p className="frame-desc text-l ftr-lnk"><a href="https://paragraph.xyz/@abundance" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Paragraph</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://book.abundance.id/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Abundance Economy Book</a></p>
        </div>

        <div className="flex-col flex-1 min-h flex-4 flex-wr" style={{paddingLeft: '10px'}}>
          <p className="frame-title text-l">Create</p>
          <p className="frame-desc text-l"><a href="https://abundance-protocol.notion.site/Abundance-Impact-Center-553d59e1280e41d990967fb786c8948e" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Impact Center</a></p>
          <p className="frame-desc text-l"><a href="https://github.com/AbundanceProtocol/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p className="frame-desc text-l"><a href="https://docs.abundance.id/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Docs</a></p>
          <p className="frame-desc text-l"><a href="https://whitepaper.abundance.id/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Whitepaper</a></p>
          <p className="frame-desc text-l" style={{color: '#999'}}>Promote</p>
          <p className="frame-desc text-l" style={{color: '#999'}}>Affiliates</p>
          <p className="frame-desc text-l" style={{color: '#999'}}>Contribute</p>
        </div>

        <div className="flex-col flex-1 min-h flex-4" style={{paddingLeft: '10px'}}>
          <p className="frame-title text-l">Connect</p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://warpcast.com/0xabundance.eth" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Farcaster</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://twitter.com/Abundance_DAO" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">X (Twitter)</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://www.youtube.com/@AbundanceProtocol/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">YouTube</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://discord.com/invite/sHcV7g3nqu" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Discord</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="https://opensea.io/AbundanceDAO" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">OpenSea</a></p>
          <p className="frame-desc text-l ftr-lnk"><a href="mailto:info@abundance.id" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Email us</a></p>
        </div>
        
        <div className="flex-col flex-1 min-h flex-4" style={{paddingLeft: '10px'}}>
          <p className="frame-title text-l">Try</p>
          <p className="frame-desc text-l"><a href="https://impact.abundance.id/" className="frame-desc text-l ftr-lnk" target="_blank" rel="noopener noreferrer">Impact App</a></p>
        </div>

      </div>
      <LineBreak />
    </div>
  </div>
  )
}
