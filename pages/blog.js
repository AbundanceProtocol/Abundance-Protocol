import { useContext, useState, useRef, useEffect } from 'react'
import fetch from 'isomorphic-unfetch';
import { parseStringPromise } from 'xml2js';
import { AccountContext } from '../context'
import useMatchBreakpoints from '../hooks/useMatchBreakpoints';

export default function Blog(feed) {
  const ref = useRef(null)
  const { isMobile } = useMatchBreakpoints();
  const [vidSize, setVidSize] = useState({w: 1220 + 'px', h: 1220/16*9 + 'px'})
  const [imgSize, setImgSize] = useState({w: 600 + 'px'})
  const [posts, setPosts] = useState(feed.item)
  const Articles = (props) => {
    const artPost = props.postName
    const artTitle = artPost.title[0];
    const artLink = artPost.link[0];
    const artImg = artPost.enclosure[0].$.url;
    const artDesc = artPost.description[0]
    artDesc = artDesc.replace(/&#8217;|&#173;/g, "'")
    artDesc = artDesc.replace(/&#8212;|&#8221;|&#8230;|&#8220;/g, "")
    if (artDesc.length > 500) {
      artDesc = artDesc.slice(0, 500) + '...';
    }
    return (
      <div className='flex-row article-container'>
        <div className='img-container'>
          <img className='article-img' src={artImg} alt="My Image" />
        </div>
        <div className='article-content-container'>
          <div>
            <a href={artLink} target="_blank" rel="noopener noreferrer" className="frame-title">{artTitle}</a>
          </div>
          <div>{artDesc}</div>
        </div>
      </div>
    )
  }

  const account = useContext(AccountContext)
  const [viewToggle, setViewToggle] = useState({record: false, source: false, media: false, science: false})
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  function handleResize() {
    setVidSize({w: ref.current.offsetWidth - 40 + 'px', h: (ref.current.offsetWidth - 40)/16*9 + 'px'})
    if (ref.current.offsetWidth >= 1200)
      setImgSize({w: 600 + 'px'})
    else if (ref.current.offsetWidth > 800 && ref.current.offsetWidth < 1200)
      setImgSize({w: 500 + 'px'})
    else
      setImgSize({w: 400 + 'px'})
  }

  return (
    <div className="t-p-130" style={{backgroundColor: '#e4eadf'}}>
      <div className="top-frame flex-middle">
        <div className="flex-middle flex-row flex-wr" ref={ref}>
        </div>
      </div>
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">Abundance Blog</p>
        </div>
      </div>
      <div className="top-frame flex-middle" style={{width: 'auto'}}>
        { ( typeof posts !== 'undefined' ) && ( posts.map((post, index) => (<Articles postName={post} key={index} />))) }
      </div>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const res = await fetch('https://abundances.substack.com/feed.xml');
    const xmlData = await res.text();
    const jsonData = await parseStringPromise(xmlData); // convert XML to JSON
    return { props: jsonData.rss.channel[0] };
  } catch (err) {
    console.log('error:', err)
    return { props: {} };
  }
}