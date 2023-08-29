import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

export default function Roadmap() {

  return (
    <div className="t-p-130" style={{backgroundColor: '#ffffff'}}>
      <div className="top-frame flex-middle">
        <div className="border-style wrap-title flex-middle flex-col">
            <p className="font-46">Abundance Roadmap</p>
        </div>
      </div>
      <div className="top-frame flex-middle" style={{width: 'auto'}}>
        <div className='max-container'>
          <div className='flex-row roadmap-container flex-dir border-solid rm-completed'>
            <div className='article-content-container'>
              <div>
                <a href='' target="_blank" rel="noopener noreferrer" className="frame-title">R&D</a>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-solid rm-sub-completed'>
                <div><ImCheckboxChecked className="icon-complete" /></div>
                <div>
                  <p className='frame-desc-top'>Research and development of the protocol. Developing a comprehensive incentive structure that aligns user interests. Identifying and redteaming potential attack vectors. Developing mechanisms to address sybil attacks, collusion, bad actors gaming protocol, and so on.</p>
                  <p className='frame-desc' style={{fontSize: '14px'}}>See: <a href='https://abundances.substack.com/p/how-crypto-solves-the-problem-of-public-goods-8ae7125459a8' target="_blank" rel="noopener noreferrer" className="frame-desc-link" style={{fontSize: '14px'}}>Abundance Protocol Whitepaper</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-row'>
          <div className='connect-solid'></div>
          <div></div>
        </div>
        <div className='max-container'>
          <div className='flex-row roadmap-container flex-dir border-dashed rm-progress'>
            <div className='article-content-container '>
              <div>
                <a href='' target="_blank" rel="noopener noreferrer" className="frame-title">Testnet</a>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed rm-sub-progress' style={{border: '3px dashed #a00'}}>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Development</strong> - Smart contract logic and data flow development. User interface buildout</p>
                  <p className='frame-desc' style={{fontSize: '14px'}}>See: <a href='https://github.com/AbundanceProtocol/abundance-protocol' target="_blank" rel="noopener noreferrer" className="frame-desc-link" style={{fontSize: '14px'}}>GitHub repo</a></p>
                </div>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Live Testnet</strong> - Smart contract performance testing and auditing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-row'>
          <div className='connect-dashed'></div>
          <div></div>
        </div>
        <div className='max-container'>
          <div className='flex-row roadmap-container flex-dir border-dashed rm-future'>
            <div className='article-content-container '>
              <div>
                <a href='' target="_blank" rel="noopener noreferrer" className="frame-title">Mainnet</a>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Mainnet Alpha</strong> - live testing of protocol & economic modeling</p>
                </div>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Mainnet Beta</strong> - battle testing of protocol </p>
                </div>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Mainnet Launch</strong> - completion of first development phase. Continual improvement of the protocol</p>
                </div>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Empowering Communities</strong> - supporting projects, DAOs and local communities in launching their own Abundance Ecosystem for funding common goods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-row'>
          <div className='connect-dashed'></div>
          <div></div>
        </div>
        <div className='max-container'>
          <div className='flex-row roadmap-container flex-dir border-dashed rm-future'>
            <div className='article-content-container '>
              <div>
                <a href='' target="_blank" rel="noopener noreferrer" className="frame-title">Superalignment </a>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>Multi-chain + L1 Launch</strong> - One of Abundance&apos;s superpowers is the ability to create alignment between competing communities (projects, blockchains, etc.) In a Scarcity Paradigm, groups compete over resources and speculate over coin prices (regardless of the underlying value of the project).</p>
                  <p className='frame-desc'>
                  Abundance creates a new dynamic. It rewards everyone based on their contribution to a project. This makes people focus on creating the most impact in the broader ecosystem – which means creating real value, efficiently distributing resources and building cross-project collaborations.</p>
                  <p className='frame-desc'>This is achieved by running the protocol on every blockchain and on its own dedicated chain, so all the different projects and ecosystems can work together smoothly.</p>
                  <p className='frame-desc' style={{fontSize: '14px'}}>Read more: <a href='https://abundances.substack.com/p/abundance-roadmap-everywhere-all' target="_blank" rel="noopener noreferrer" className="frame-desc-link" style={{fontSize: '14px'}}>Abundance Roadmap: Everywhere All at Once</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-row'>
          <div className='connect-dashed'></div>
          <div></div>
        </div>
        <div className='max-container'>
          <div className='flex-row roadmap-container flex-dir border-dashed rm-future'>
            <div className='article-content-container '>
              <div>
                <a href='' target="_blank" rel="noopener noreferrer" className="frame-title">AI-powered Endgame</a>
              </div>
              <div className='flex-row roadmap-sub-container border-sub-dashed article-grey'>
                <div className='img-container'>
                  <ImCheckboxUnchecked className="icon-incomplete" />
                </div>
                <div>
                  <p className='frame-desc-top'><strong>AI-based Consensus Mechanism</strong> - over time more and more parts of the validation process can be automated/powered by AI. Though initially these will just assist validators, at some stage AI can be directly integrated into the protocol until AI replaces manual reviewers entirely (the AI will be trained on the inputs from validators until it is sufficiently effective at replacing them).</p>
                  <p className='frame-desc'>No user will be expected to validate the entire AI process - that is of course impossible. The process will work based on Validation by Sampling, where the entire AI response is chunked into verifiable subsets, and each subset can be verified by users.</p>
                  <p className='frame-desc'>Since a verified process doesn&apos;t ensure that the AI&apos;s output is exactly the project&apos;s economic impact, only that the system correctly produced a result based on the input and training it received, the user-based challenge period will remain.</p>
                  {/* <p className='frame-desc'>Read more: <a href='https://abundances.substack.com/p/abundance-roadmap-everywhere-all' target="_blank" rel="noopener noreferrer" className="frame-desc-link">Abundance Roadmap: AI Endgame</a></p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top-frame flex-middle flex-row">
        <div className="border-style wrap-cln flex-middle flex-col">
          <p className="frame-title">&nbsp;</p>
        </div>
      </div>
    </div>
  )
}