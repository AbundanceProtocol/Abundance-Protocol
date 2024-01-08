import { useContext, useState, useRef, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { parseStringPromise } from 'xml2js';

export default function Blog(feed) {
  const [posts, setPosts] = useState(feed.item)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false);
  }, []);

  const Articles = (props) => {
    const artPost = props.postName
    const artCount = props.postNum
    const isEven = artCount % 2 === 0
    const artTitle = artPost.title[0]
    const artLink = artPost.link[0]
    const artImg = artPost.enclosure[0].$.url
    let artDesc = artPost.description[0]
    artDesc = artDesc.replace(/&#8217;|&#173;/g, "'")
    artDesc = artDesc.replace(/&#8212;|&#8221;|&#8230;|&#8220;/g, "")
    if (artDesc.length > 500) {
      artDesc = artDesc.slice(0, 500) + '...';
    }
    return (
      <div className='max-container'>
        <div className={`flex-row article-container ${isEven ? 'article-even' : 'article-odd'} flex-dir`}>
          <div className='img-container'>
            <img className='article-img' src={artImg} alt={`${artTitle} + ' image'`} />
          </div>
          <div className='article-content-container'>
            <div>
              <a href={artLink} target="_blank" rel="noopener noreferrer" className="frame-title">{artTitle}</a>
            </div>
            <div>{artDesc}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="t-p-130" style={{backgroundColor: '#e4eadf'}}>
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">Abundance Blog</p>
        </div>
      </div>
      <div className="top-frame flex-middle" style={{width: 'auto'}}>
        { (loading) && <div>Loading...</div>}
        { ( typeof posts !== 'undefined' ) && ( posts.map((post, index) => (<Articles postName={post} postNum={index} key={index} />))) }
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