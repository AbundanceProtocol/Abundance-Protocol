import { FaSearch, FaCode, FaUser, FaLightbulb, FaKey, FaLockOpen, FaGlobe, FaPen, FaCoins, FaLink, FaAddressCard, FaWallet, FaAward, FaQuestionCircle, FaMap, FaCogs, FaFileAlt, FaGithub, FaMediumM, FaYoutube, FaTwitter, FaAt, FaDiscord, FaFolderOpen, FaTasks, FaScroll, FaSearchDollar, FaHandshake, FaRegListAlt, FaToolbox, FaBookOpen, FaChalkboard, FaRocket } from 'react-icons/fa';
import OpenSeaIcon from './OpenSeaIcon';
import Farcaster from './Farcaster';
import Paragraph from './Paragraph';
import { GiTwoCoins, GiReceiveMoney } from 'react-icons/gi'
import { BsBarChartFill, BsFillDiagram3Fill, BsFillHandThumbsDownFill, BsListColumnsReverse } from 'react-icons/bs'
import { MdCastConnected, MdNotifications, MdFavorite, MdFilterFrames, MdMail, MdWork, MdRequestPage, MdDesignServices } from 'react-icons/md'
import { RiTeamFill, RiFileSearchFill } from 'react-icons/ri'
import { HiBadgeCheck, HiThumbDown, HiUserGroup, HiViewGridAdd } from 'react-icons/hi'
import { IoReader, IoDocumentsSharp } from 'react-icons/io5'
import { SiSubstack } from 'react-icons/si'

const Buttons = () => {
    return <div className="button" />
  }

export default Buttons;

const button = {
    'top-menu': ['discover', 'create', 'connect'],
    'nav-menu': {

        'Home': ['Vision', 'Roadmap', 'Miro board', 'Blog', 'Book'],
        'Create': ['Impact Center', 'GitHub', 'Docs', 'Whitepaper'],
        'Connect': ['Farcaster', 'X (Twitter)', 'YouTube', 'Discord', 'OpenSea', 'Email'],
        
        // 'Portal': ['Profile', 'Wallet', 'Expertise', 'Portfolio'],
        // 'Studio': ['Contribute', 'Collaborate'],
        // 'Consensus': ['Propose', 'Validate', 'Challenge', 'Explore', 'Notifications'],
        // 'Funding': ['Project Funding', 'Review Funding', 'Funding Proposal', 'Search Requests'],
        // 'Ecosystem': ['Communities', 'Resources', 'Search', 'Trending', 'Curated', 'Favorites', 'Feed'],
        // 'Home': ['Vision', 'Roadmap', 'Docs', 'FAQ', 'Blog', 'Contact'],
        // 'Connect': ['YouTube', 'Docs'],
    },




    ////// MENUS //////
    'discover': {
        link: '/portal',
        menu: 'Home',
        description: 'Your activity hub',
        account: false,
        working: true,
        icon: FaLightbulb
    },
    'create': {
        link: '/create',
        menu: 'Create',
        description: 'Your activity hub',
        account: false,
        working: true,
        icon: FaRocket
    },
    'connect': {
        link: '/connect',
        menu: 'Connect',
        description: 'Your activity hub',
        account: false,
        working: true,
        icon: FaLink
    },


    // 'portal': {
    //     link: '/portal',
    //     menu: 'Portal',
    //     description: 'Your activity hub',
    //     account: true,
    //     working: true,
    //     icon: FaUser
    // },
    // 'studio': {
    //     link: '/create',
    //     menu: 'Studio',
    //     description: 'Create. Contribute. Collaborate',
    //     account: true,
    //     working: true,
    //     icon: FaPen
    // },
    // 'consensus': {
    //     link: '/consensus',
    //     menu: 'Consensus',
    //     description: 'Proof-of-Impact Consensus Validation',
    //     account: true,
    //     working: true,
    //     icon: FaHandshake
    // },
    // 'funding': {
    //     link: '/fund',
    //     menu: 'Funding',
    //     description: 'Give and get funding',
    //     account: true,
    //     working: true,
    //     icon: FaCoins
    // },
    // 'ecosystem': {
    //     link: '/explore',
    //     menu: 'Ecosystem',
    //     description: 'Explore the ecosystem, your communities, and resources',
    //     account: false,
    //     working: true,
    //     icon: FaGlobe
    // },




    ////// HOME //////

    'Vision': {
        link: '/',
        menu: 'Home',
        description: 'The Abundance Protocol vision for a decentralized economy',
        account: false,
        working: true,
        icon: FaLightbulb
    },
    'Roadmap': {
        link: '/roadmap',
        menu: 'Home',
        description: "The Protocol's Master Plan",
        account: false,
        working: true,
        icon: FaMap
    },
    'Miro board': {
        link: false,
        url: 'https://miro.com/app/board/uXjVPUvJDaU=/',
        menu: 'Home',
        description: 'Check out our project Miro board',
        account: false,
        working: true,
        icon: FaChalkboard
    },
    'Blog': {
        link: false,
        url: 'https://paragraph.xyz/@abundance',
        menu: 'Home',
        description: 'Read our articles on paragraph.xyz',
        account: false,
        working: true,
        icon: Paragraph
    },
    'Book': {
        link: false,
        url: 'https://book.abundance.id',
        menu: 'Home',
        description: 'Read The Abundance Economy book',
        account: false,
        working: true,
        icon: FaBookOpen
    },

    // 'Mechanism': {
    //     link: '/mechanism',
    //     menu: 'Home',
    //     description: 'How it all works',
    //     account: false,
    //     working: false,
    //     icon: FaCogs
    // },
    // 'FAQ': {
    //     link: '/faq',
    //     menu: 'Home',
    //     description: 'Frequently asked questions',
    //     account: false,
    //     working: false,
    //     icon: FaQuestionCircle
    // },
    // 'Contact': {
    //     link: '/contact',
    //     menu: 'Home',
    //     description: 'Connect with us',
    //     account: false,
    //     working: false,
    //     icon: FaLink
    // },

    
    ////// CREATE //////

    'Impact Center': {
        link: false,
        url: 'https://abundance-protocol.notion.site/Abundance-Impact-Center-553d59e1280e41d990967fb786c8948e',
        menu: 'Create',
        description: 'Get involved and contribute to Abundance',
        account: false,
        working: true,
        icon: MdDesignServices
    },
    'GitHub': {
        link: false,
        url: 'https://github.com/AbundanceProtocol/',
        menu: 'Create',
        description: 'Help us develop the protocol on GitHub',
        account: false,
        working: true,
        icon: FaGithub
    },
    'Docs': {
        link: false,
        url: 'https://docs.abundance.id/',
        menu: 'Create',
        description: 'In-depth explanation of the Protocol',
        account: false,
        working: true,
        icon: IoDocumentsSharp
    },
    'Whitepaper': {
        link: false,
        url: 'https://whitepaper.abundance.id/',
        menu: 'Create',
        description: 'Abundance Protocol Whitepaper',
        account: false,
        working: true,
        icon: FaFileAlt
    },




    ////// CONNECT //////

    'Farcaster': {
        link: false,
        url: 'https://warpcast.com/0xabundance.eth',
        menu: 'Connect',
        description: 'Follow us on Farcaster',
        account: false,
        working: true,
        icon: Farcaster
    },
    'X (Twitter)': {
        link: false,
        url: 'https://twitter.com/Abundance_DAO',
        menu: 'Connect',
        description: 'Follow us on Twitter',
        account: false,
        working: true,
        icon: FaTwitter
    },
    'YouTube': {
        link: false,
        url: 'https://www.youtube.com/@AbundanceProtocol/',
        menu: 'Connect',
        description: 'Subscribe to our channel',
        account: false,
        working: true,
        icon: FaYoutube
    },
    'Discord': {
        link: false,
        url: 'https://discord.com/invite/sHcV7g3nqu',
        menu: 'Connect',
        description: 'Join our Discord community',
        account: false,
        working: true,
        icon: FaDiscord
    },
    'OpenSea': {
        link: false,
        url: 'https://opensea.io/AbundanceDAO',
        menu: 'Connect',
        description: "Get our project's NFTs",
        account: false,
        working: true,
        icon: OpenSeaIcon
    },
    'Email': {
        link: false,
        url: 'mailto:info@abundance.id',
        menu: 'Connect',
        description: 'Contact us',
        account: false,
        working: true,
        icon: FaAt
    },




    ////// PORTAL //////

    // 'Profile': {
    //     link: '/profile',
    //     menu: 'Portal',
    //     description: 'Update your PFP and bio',
    //     account: true,
    //     working: true,
    //     icon: FaAddressCard
    // },
    // 'Wallet': {
    //     link: '/wallet',
    //     menu: 'Portal',
    //     description: 'Manage your funds, investments & bids',
    //     account: true,
    //     working: true,
    //     icon: FaWallet
    // },
    // 'Expertise': {
    //     link: '/expertise',
    //     menu: 'Portal',
    //     description: 'Review your scores across fields',
    //     account: true,
    //     working: false,
    //     icon: FaAward
    // },
    // 'Portfolio': {
    //     link: '/portfolio',
    //     menu: 'Portal',
    //     description: 'Check your projects & proposals',
    //     account: true,
    //     working: true,
    //     icon: FaFolderOpen
    // },

    


    ////// STUDIO //////

    // 'Create': {
    //     link: '/create-post',
    //     menu: 'Studio',
    //     description: 'Create a project',
    //     account: true,
    //     working: false,
    //     icon: MdWork
    // },
    // 'Contribute': {
    //     link: '/contribute',
    //     menu: 'Studio',
    //     description: 'Contribute to an existing project',
    //     account: true,
    //     working: false,
    //     icon: HiViewGridAdd
    // },
    // 'Collaborate': {
    //     link: '/collaboration',
    //     menu: 'Studio',
    //     description: 'Collaborate with others on a project',
    //     account: true,
    //     working: false,
    //     icon: RiTeamFill
    // },

    


    ////// CONSENSUS //////

    // 'Propose': {
    //     link: '/init-review',
    //     menu: 'Consensus',
    //     description: 'Create a proposal',
    //     account: true,
    //     working: false,
    //     icon: MdRequestPage
    // },
    // 'Validate': {
    //     link: '/validation-pool',
    //     menu: 'Consensus',
    //     description: 'Join a validation pool',
    //     account: true,
    //     working: false,
    //     icon: FaRegListAlt
    // },
    // 'Challenge': {
    //     link: '/challenge',
    //     menu: 'Consensus',
    //     description: 'Challenge a proposal',
    //     account: true,
    //     working: false,
    //     icon: BsFillHandThumbsDownFill
    // },
    // 'Explore': {
    //     link: '/explore-proposals',
    //     menu: 'Consensus',
    //     description: 'Explore proposals',
    //     account: false,
    //     working: false,
    //     icon: RiFileSearchFill
    // },
    // 'Notifications': {
    //     link: '/inbox',
    //     menu: 'Consensus',
    //     description: 'Validation notifications',
    //     account: true,
    //     working: false,
    //     icon: MdMail
    // },

    


    ////// FUNDING //////

    // 'Project Funding': {
    //     link: '/project-funding',
    //     menu: 'Funding',
    //     description: 'Request funding for a public goods project',
    //     account: true,
    //     working: false,
    //     icon: GiTwoCoins
    // },
    // 'Review Funding': {
    //     link: '/funding',
    //     menu: 'Funding',
    //     description: 'Request or auction funding for reviews',
    //     account: true,
    //     working: true,
    //     icon: GiReceiveMoney
    // },
    // 'Funding Proposal': {
    //     link: '/funding-proposal',
    //     menu: 'Funding',
    //     description: 'Create an ecosystem improvement proposal',
    //     account: true,
    //     working: false,
    //     icon: FaGlobe
    // },
    // 'Search Requests': {
    //     link: '/search-requests',
    //     menu: 'Funding',
    //     description: 'Find funding requests and auctions',
    //     account: false,
    //     working: true,
    //     icon: FaSearchDollar
    // },

    


    ////// ECOSYSTEM //////
    
    // 'Communities': {
    //     link: '/communities',
    //     menu: 'Ecosystem',
    //     description: 'Explore your communities',
    //     account: true,
    //     working: false,
    //     icon: HiUserGroup
    // },
    // 'Resources': {
    //     link: '/resources',
    //     menu: 'Ecosystem',
    //     description: 'Access resources from across the ecosystem',
    //     account: false,
    //     working: false,
    //     icon: FaToolbox
    // },
    // 'Trending': {
    //     link: '/trending',
    //     menu: 'Ecosystem',
    //     description: 'Trending projects',
    //     account: false,
    //     working: true,
    //     icon: BsBarChartFill
    // },
    // 'Curated': {
    //     link: '/curated',
    //     menu: 'Ecosystem',
    //     description: 'Curated projects',
    //     account: false,
    //     working: false,
    //     icon: MdFilterFrames
    // },
    // 'Favorites': {
    //     link: '/favorites',
    //     menu: 'Ecosystem',
    //     description: 'Your favorite project categories',
    //     account: true,
    //     working: false,
    //     icon: MdFavorite
    // },
    // 'Search': {
    //     link: '/searchbar',
    //     menu: 'Ecosystem',
    //     description: 'Search for communities, projects, users, and proposals',
    //     account: false,
    //     working: false,
    //     icon: FaSearch
    // },
    // 'Feed': {
    //     link: '/feed',
    //     menu: 'Ecosystem',
    //     description: 'Latest projects',
    //     account: true,
    //     working: true,
    //     icon: FaScroll
    // },
  }

export { button }