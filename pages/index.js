import { useContext, useState, useRef, useEffect } from 'react'
import { ethers } from 'ethers'
import { ExpandIcon, ScienceIcon, CollabIcon, KnowledgeIcon, LogoHD, OpenSeaIcon, PublicGoodsIcon, CodeIcon } from './assets'
import ReactPlayer from "react-player"
import { FaBalanceScale, FaCheckCircle, FaChartLine, FaHandHoldingUsd, FaMoneyBillAlt, FaGithub, FaMediumM, FaYoutube, FaTwitter, FaAt, FaDiscord, FaUsers, FaListAlt, FaCode } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si'
import { MdScience } from 'react-icons/md'
import { AccountContext } from '../context'
import useMatchBreakpoints from '../hooks/useMatchBreakpoints';


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
  }

  return (
    <div className="t-p-130" style={{backgroundColor: '#e4eadf'}}>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
      <div className="top-frame flex-middle">
        <div className="flex-middle flex-row flex-wr" ref={ref}>
          <div className='flex-col flex-2'>
            <p className={isMobile ? "large-font-mobile" : "font-46"}>BUILDING AN ECONOMY OF ABUNDANCE</p>
            <p className="font-30">Abundance Protocol solves two fundamental problems in our economy: market failures in public goods and negative externalities</p>
          </div>
          <div>
            <img className='homepage-img' src={'./images/abundanceisland01.png'} alt="Abundance Paradigm" />
          </div>
        </div>
      </div>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">What can Abundance do:</p>
        </div>
      </div>


      <div className="top-frame flex-middle flex-row flex-wr">

        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <ExpandIcon /> */}
          <p className="frame-title">Earn money while doing what you love</p>
          <p className="frame-desc">Abundance strives for a world where everyone can make a living while working for the benefit of humanity. It&apos;s the world&apos;s first exchange for public and common goods.</p>
        </div>
        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <CollabIcon /> */}
          <p className="frame-title">Sustainable funding of communities & DAOs</p>
          <p className="frame-desc">Abundance&apos;s economic infrastructure helps communities thrive. It offers a framework for funding, coordinating, and incentivizing public resource development.</p>
        </div>
        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <PublicGoodsIcon /> */}
          <p className="frame-title">Open Source Revolution</p>
          <p className="frame-desc">Our vision is to allow any developer to work on any open source project and be rewarded according to their contribution. Creating a rich and deeply integrated open source ecosystem like we&apos;ve never seen before.</p>
        </div>

        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <ExpandIcon /> */}
          <p className="frame-title">Blockchain Progressive Superalignment</p>
          <p className="frame-desc">The potential of blockchains to improve lives is hindered today by coin speculation and digital tribalism. Abundance aligns researchers and developers to work on impactful problems, creating cross-project alignment and progress for all.
          </p>
        </div>

        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <ScienceIcon /> */}
          <p className="frame-title">Scientific Renaissance</p>
          <p className="frame-desc">The Abundance Protocol creates a mechanism for people to invest in scientific research, in return for a share of the impact the research makes.</p>
          <p className="frame-desc">This novel economic paradigm may lead to the next breakthroughs in cancer research or fundamental physics.</p>
        </div>
        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-3">
          {/* <KnowledgeIcon /> */}
          <p className="frame-title">Mapping Humanity&apos;s Knowledge</p>
          <p className="frame-desc">The Abundance Protocol makes it easy for anyone to see the credibility and relatedness of digital information.</p>
          <p className="frame-desc">
          Thus, as projects are reviewed, the protocol produces an ever-growing network of humanity&apos;s knowledge.</p>
        </div>
      </div>

      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>

      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">What is the Abundance Protocol</p>
        </div>
      </div>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col flex-1 min-h">
          <p className="font-24" style={{ textAlign: 'left' }}>Currently, our economy is extremely effective at creating feedback loops for the creation of consumer products and services. However, it disincentivizes creating goods that benefit everyone (public and common goods), since their creation consumes resources but has no exchange value in the market.</p>
          <p className="font-24" style={{ textAlign: 'left' }}>The market also incentivizes the creation of negative externalities, since shifting the cost of production onto the public lowers costs for the business.</p>
          <p className="font-24" style={{ textAlign: 'left' }}>Abundance Protocol is a blockchain-based Proof-of-Impact consensus mechanism that was developed to solve the fundamental problems of negative externalities and public goods in our economy.</p>
          <p className="font-24" style={{ textAlign: 'left' }}>It does so by giving common and public goods an exchange value through its consensus mechanism - thus creating a positive feedback loop for public and common goods (and negative feedback loop for negative externalities).</p>

          <p className="font-26" style={{ textAlign: 'left' }}>Find out more in the <a href="https://mirror.xyz/0xabundance.eth/OfWfXtmKgkpCM_GfRvKQz9Owl-bIXfwpXIny_jtNShE" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', fontWeight: '600' }}>Abundance Protocol Whitepaper</a></p>
          </div>
      </div>
      <div className="top-frame flex-middle">
        <ReactPlayer url="https://youtu.be/CTu9kMtb6vA" width={vidSize.w} height={vidSize.h} className="react-player" />
      </div>

      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>

      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
        <p className="font-46">Get Involved</p>
        </div>
      </div>
      <div className="top-frame flex-middle flex-row flex-wr">
        <a href="https://github.com/AbundanceProtocol/abundance-protocol" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon-40" />
          <p className="frame-title">GitHub</p>
          <p className="frame-desc text-c">Help develop the protocol</p>
        </a>
        <a href="https://discord.com/invite/sHcV7g3nqu" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <FaDiscord className="icon-40" />
          <p className="frame-title">Discord</p>
          <p className="frame-desc text-c">Join AbundanceDAO on Discord</p>
        </a>
        <a href="https://opensea.io/web4" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <OpenSeaIcon iconsize='40' className="icon-40" />
          <p className="frame-title">OpenSea</p>
          <p className="frame-desc text-c">Get our project&apos;s NFTs</p>
        </a>
      </div>
      <div className="top-frame flex-middle flex-row flex-wr">
        <a href="https://abundances.substack.com/" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <SiSubstack className="icon-40" />
          <p className="frame-title">Substack</p>
          <p className="frame-desc text-c">Read our articles</p>
        </a>
        <a href="https://www.youtube.com/@AbundanceProtocol/" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="icon-40" />
          <p className="frame-title">YouTube</p>
          <p className="frame-desc text-c">Subscribe to our channel</p>
        </a>
        <a href="https://twitter.com/BuildingWeb4/" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="icon-40" />
          <p className="frame-title">Twitter</p>
          <p className="frame-desc text-c">Follow us on Twitter</p>
        </a>
        <a href="mailto:info@abundance.id" className="border-style wrap-cln flex-middle flex-col flex-1 min-h flex-4" target="_blank" rel="noopener noreferrer">
          <FaAt className="icon-40" />
          <p className="frame-title">Email</p>
          <p className="frame-desc text-c">Contact us</p>
        </a>
      </div>

      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
    </div>
  )
}
