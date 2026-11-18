import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight,
  CircleHelp, Cpu, Fingerprint, LockKeyhole, Menu, MousePointer2,
  ShieldCheck, Smartphone, Sparkles, Wallet, X
} from 'lucide-react';
import { getWalletRecommendation } from './recommendation';
import './styles.css';

const NETWORKS = [
  { id: 'Bitcoin', ticker: 'BTC', icon: '₿', tone: 'orange' },
  { id: 'Ethereum', ticker: 'ETH', icon: '◆', tone: 'violet' },
  { id: 'EVM', ticker: 'EVM', icon: '◈', tone: 'blue' },
  { id: 'Solana', ticker: 'SOL', icon: '◎', tone: 'green' },
  { id: 'ICP', ticker: 'ICP', icon: '∞', tone: 'pink' },
  { id: 'Not sure yet', ticker: '?', icon: '?', tone: 'slate' }
];

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></div>;
}

function DeviceArt({ variant = 'x1' }) {
  return (
    <div className={`device-art device-${variant}`} aria-label={`${variant.toUpperCase()} product concept illustration`}>
      {variant === 'x1' ? <>
        <div className="vault-device"><div className="vault-screen"><span className="screen-dot"/><span className="screen-line"/><span className="screen-line short"/></div><div className="vault-port"/><div className="vault-label">CYPHEROCK</div></div>
        <div className="card-stack"><div className="nfc-card card-back"><span>01</span><i>✳</i></div><div className="nfc-card card-front"><BrandMark/><span>SECURE ELEMENT</span><b>01 / 04</b></div></div>
      </> : <>
        <div className="phone-device"><div className="phone-island"/><div className="phone-ui"><BrandMark/><div className="phone-balance"/><div className="phone-bars"><i/><i/><i/></div><div className="phone-card"/></div></div>
        <div className="nfc-card x0-card"><BrandMark/><span> CYPHEROCK</span><b>01 / 04</b></div>
      </>}
      <div className="device-glow" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><a className="brand" href="#top" aria-label="Wallet Fit home"><BrandMark/><span>WALLET<span className="brand-muted">FIT</span></span><em>INDEPENDENT CONCEPT</em></a>
    <nav className={open ? 'nav-open' : ''}><a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a><a href="#compare" onClick={() => setOpen(false)}>Compare</a><a href="#security" onClick={() => setOpen(false)}>Security model</a></nav>
    <a className="header-cta" href="#finder">Find your fit <ArrowUpRight size={15}/></a>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [networks, setNetworks] = useState([]);
  const [priority, setPriority] = useState('');
  const [setup, setSetup] = useState('');
  const [showResult, setShowResult] = useState(false);
  const result = useMemo(() => getWalletRecommendation({ networks, priority, setup }), [networks, priority, setup]);
  const toggleNetwork = (id) => setNetworks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current.filter((item) => item !== 'Not sure yet' && id !== 'Not sure yet'), id]);
  const next = () => { if (step < 2) setStep(step + 1); else setShowResult(true); };
  const reset = () => { setStep(0); setNetworks([]); setPriority(''); setSetup(''); setShowResult(false); };
  const canContinue = step === 0 ? networks.length > 0 : step === 1 ? Boolean(priority) : Boolean(setup);

  return <section className="finder-panel" id="finder">
    <div className="finder-top"><div><span className="eyebrow"><Sparkles size={13}/> THE WALLET FIT FINDER</span><h2>Start with what<br/><span>you actually need.</span></h2><p>Three quick questions. No wallet jargon, no commitment.</p></div><div className="finder-count">{showResult ? 'DONE' : `0${step + 1}`}<span> / 03</span></div></div>
    {!showResult ? <>
      <div className="progress-track"><span style={{ width: `${((step + 1) / 3) * 100}%` }}/></div>
      <div className="quiz-content" key={step}>
        {step === 0 && <>
          <div className="question-kicker">01 — YOUR ASSETS</div><h3>Which networks do you use?</h3><p className="question-help">Select all that apply. If you're unsure, choose “Not sure yet”.</p>
          <div className="network-grid">{NETWORKS.map((network) => <button key={network.id} className={`network-option ${networks.includes(network.id) ? 'selected' : ''}`} onClick={() => toggleNetwork(network.id)} aria-pressed={networks.includes(network.id)}><span className={`network-icon ${network.tone}`}>{network.icon}</span><span><b>{network.id}</b><small>{network.ticker}</small></span><span className="option-check">{networks.includes(network.id) && <Check size={13}/>}</span></button>)}</div>
        </>}
        {step === 1 && <>
          <div className="question-kicker">02 — YOUR PRIORITY</div><h3>What matters most to you?</h3><p className="question-help">Choose the factor that best describes your preference.</p>
          <div className="choice-list">{[{id:'mobile',icon:<Smartphone/>,title:'Phone-led convenience',desc:'I prefer a mobile-first experience.'},{id:'coverage',icon:<Wallet/>,title:'Wider network coverage',desc:'I use several networks, including non-EVM chains.'},{id:'security',icon:<ShieldCheck/>,title:'Understand the security model',desc:'I want to compare how each setup works.'}].map((item) => <button key={item.id} className={`choice-option ${priority === item.id ? 'selected' : ''}`} onClick={() => setPriority(item.id)}><span className="choice-icon">{item.icon}</span><span><b>{item.title}</b><small>{item.desc}</small></span><span className="radio-dot"/></button>)}</div>
        </>}
        {step === 2 && <>
          <div className="question-kicker">03 — YOUR SETUP</div><h3>How would you prefer to get started?</h3><p className="question-help">This helps you explore the setup flow that suits you.</p>
          <div className="choice-list">{[{id:'phone',icon:<Smartphone/>,title:'With my phone',desc:'I want to explore a phone-led setup.'},{id:'desktop',icon:<Cpu/>,title:'With my computer',desc:'A desktop setup works for me.'},{id:'either',icon:<MousePointer2/>,title:'No preference',desc:'Show me both options.'}].map((item) => <button key={item.id} className={`choice-option ${setup === item.id ? 'selected' : ''}`} onClick={() => setSetup(item.id)}><span className="choice-icon">{item.icon}</span><span><b>{item.title}</b><small>{item.desc}</small></span><span className="radio-dot"/></button>)}</div>
        </>}
      </div>
      <div className="quiz-actions"><button className="back-button" onClick={() => step === 0 ? reset() : setStep(step - 1)} disabled={step === 0}><ChevronLeft size={16}/> Back</button><button className="primary-button" disabled={!canContinue} onClick={next}>{step === 2 ? 'See my direction' : 'Continue'} <ChevronRight size={16}/></button></div>
    </> : <div className="result-view">
      <div className="result-icon"><Check size={23}/></div><span className="question-kicker">YOUR STARTING POINT</span><h3>{result.title}</h3><p>{result.reason}</p>
      <div className="result-note"><CircleHelp size={16}/><span>{result.certainty}. Always verify the exact asset on the official live support list.</span></div>
      <a className="primary-button result-link" href={result.href} target="_blank" rel="noreferrer">Explore official details <ArrowUpRight size={16}/></a>
      <button className="text-button" onClick={reset}>Start again</button>
    </div>}
    <div className="finder-foot"><LockKeyhole size={12}/> Your answers stay in this demo. No wallet details or personal information are requested.</div>
  </section>;
}

function Hero() {
  return <section className="hero" id="top"><div className="hero-copy"><div className="status-pill"><span/> AN INDEPENDENT PRODUCT CONCEPT</div><h1>Self-custody<br/>should feel <span>clear.</span></h1><p className="hero-lede">Choosing a hardware wallet starts with understanding your assets, your setup, and what matters to you. Find a useful place to start.</p><div className="hero-actions"><a className="primary-button" href="#finder">Find my wallet <ArrowUpRight size={16}/></a><a className="quiet-link" href="#how-it-works">See how it works <ArrowDown size={15}/></a></div><div className="hero-proof"><div className="proof-avatars"><span>₿</span><span>Ξ</span><span>◎</span></div><p><b>Start with your networks.</b><br/>Verify exact assets before you buy.</p></div></div>
    <div className="hero-visual"><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-grid"/><div className="visual-label label-top"><span>01 / PRODUCT FIT</span><i/></div><DeviceArt variant="x1"/><div className="floating-chip chip-security"><ShieldCheck size={14}/><span>2-of-5 key sharing</span></div><div className="floating-chip chip-control"><span className="green-dot"/> <span>Self-custody, your control</span></div><div className="visual-label label-bottom">HARDWARE WALLET / EXPLORER CONCEPT</div></div>
  </section>;
}

function HowItWorks() {
  const items = [
    {n:'01',title:'Tell us what you use',desc:'Choose the networks and assets you care about. No wallet jargon required.',icon:<Wallet/>},
    {n:'02',title:'See a useful direction',desc:'Get a starting point based on public product information and your preferences.',icon:<Sparkles/>},
    {n:'03',title:'Verify before deciding',desc:'Check the official live coin list and setup guides for your exact requirements.',icon:<Check/>}
  ];
  return <section className="section how-section" id="how-it-works"><div className="section-heading"><span className="eyebrow">A CLEARER FIRST STEP</span><h2>Less guessing.<br/><span>More confidence.</span></h2><p>A guided path from “which one?” to the official details that matter to you.</p></div><div className="steps-grid">{items.map((item) => <article className="step-card" key={item.n}><div className="step-card-top"><span>{item.n}</span><div>{item.icon}</div></div><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></section>;
}

function Compare() {
  return <section className="section compare-section" id="compare"><div className="section-heading centered"><span className="eyebrow">TWO WAYS TO SELF-CUSTODY</span><h2>Know the difference.<br/><span>Then choose.</span></h2><p>A quick orientation based on Cypherock's publicly available product information.</p></div><div className="product-grid">
    <article className="product-card product-x0"><div className="product-tag">PHONE-LED SETUP</div><DeviceArt variant="x0"/><div className="product-copy"><div className="product-name-row"><h3>Cypherock X0</h3><span className="product-index">01</span></div><p>Explore X0 if your requirements align with its published Bitcoin, Ethereum and EVM-compatible network coverage.</p><ul><li><Check/> Phone with NFC required</li><li><Check/> Bitcoin, Ethereum & 50+ EVM-compatible chains (Founder’s Edition FAQ)</li><li><Check/> Same 2-of-5 security standard as X1</li></ul><a href="https://www.cypherock.com/cypherock-x0" target="_blank" rel="noreferrer" className="product-link">Explore X0 <ArrowUpRight size={15}/></a></div></article>
    <article className="product-card product-x1"><div className="product-tag">DESKTOP-LED SETUP</div><DeviceArt variant="x1"/><div className="product-copy"><div className="product-name-row"><h3>Cypherock X1</h3><span className="product-index">02</span></div><p>Explore X1 if you need wider chain coverage, including non-EVM networks such as Solana or ICP.</p><ul><li><Check/> Desktop cySync setup</li><li><Check/> Wider chain coverage</li><li><Check/> Same 2-of-5 security standard as X0</li></ul><a href="https://www.cypherock.com/cypherock-x1" target="_blank" rel="noreferrer" className="product-link">Explore X1 <ArrowUpRight size={15}/></a></div></article>
  </div><p className="compare-disclaimer"><CircleHelp size={14}/> This is a simplified orientation, not a complete feature comparison. Product editions and supported assets can change. Verify the exact coin, token, chain and device compatibility on Cypherock's official support pages.</p><a className="coin-link" href="https://www.cypherock.com/coin-support" target="_blank" rel="noreferrer">Check the official live coin-support list <ArrowUpRight size={15}/></a></section>;
}

function Security() {
  return <section className="security-section" id="security"><div className="security-copy"><span className="eyebrow">SECURITY, WITHOUT THE JARGON</span><h2>One key.<br/><span>Five separate parts.</span></h2><p>Cypherock describes its approach as Shamir’s Secret Sharing: the private key is split into five shards, and any two can be used to reconstruct it for wallet access.</p><div className="security-facts"><div><b>5</b><span>key shards</span></div><div><b>2</b><span>required to access</span></div><div><b>0</b><span>single point of failure by design</span></div></div><a href="https://docs.cypherock.com/design-decisions/using-shamir-secret-sharing-vs.-multi-sig/why-cypherock-has-a-default-2-5-threshold-scheme" target="_blank" rel="noreferrer" className="quiet-link">Read Cypherock's explanation <ArrowUpRight size={15}/></a></div><div className="shard-visual"><div className="shard-center"><Fingerprint size={35}/><span>PRIVATE KEY</span><b>2 OF 5</b></div>{[0,1,2,3,4].map((n) => <div key={n} className={`shard shard-${n+1}`}><span>{String(n+1).padStart(2,'0')}</span><i/></div>)}<div className="shard-caption">ILLUSTRATIVE DIAGRAM · NOT A TECHNICAL SCHEMATIC</div></div></section>;
}

function Insight() {
  return <section className="insight-section"><div className="insight-top"><span className="eyebrow">WHY THIS CONCEPT EXISTS</span><span className="concept-stamp">PRODUCT / GROWTH EXPLORATION — 2026</span></div><div className="insight-grid"><div><h2>A small change<br/>to the <span>first decision.</span></h2><p>Cypherock already provides a live coin-support lookup. This concept explores whether a short, preference-led flow could help a first-time visitor understand which product information to inspect before using that detailed list.</p></div><div className="insight-metrics"><h3>What I'd measure</h3><div className="metric-row"><span>01</span><div><b>Finder completion rate</b><small>Do visitors finish the questions?</small></div></div><div className="metric-row"><span>02</span><div><b>Official product click-through</b><small>Do recommendations lead to deeper research?</small></div></div><div className="metric-row"><span>03</span><div><b>Product-page → checkout conversion</b><small>Does the flow improve purchase progression?</small></div></div><div className="metric-row"><span>04</span><div><b>Pre-purchase support themes</b><small>Do product-fit questions change over time?</small></div></div><p className="metric-caveat">No internal analytics were available for this concept. These are proposed measures, not claimed results or forecasted lifts.</p></div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="footer-brand"><BrandMark/><span>WALLET<span className="brand-muted">FIT</span></span></div><p>Independent concept by Mohd Rehan. Not affiliated with, endorsed by, or operated by Cypherock.</p><div className="footer-links"><a href="https://www.cypherock.com/" target="_blank" rel="noreferrer">Cypherock official site <ArrowUpRight size={13}/></a><a href="https://www.cypherock.com/faq" target="_blank" rel="noreferrer">FAQs <ArrowUpRight size={13}/></a></div><span className="copyright">© 2026 · CONCEPT DEMO</span></footer>;
}

function App() {
  return <div className="min-h-screen"><Header/><main><Hero/><div className="finder-wrap"><Quiz/></div><HowItWorks/><Compare/><Security/><Insight/><section className="closing-cta"><span className="eyebrow">MAKE THE FIRST STEP CLEAR</span><h2>Know what to check<br/><span>before you choose.</span></h2><a className="primary-button" href="#finder">Try the wallet finder <ArrowUpRight size={16}/></a></section></main><Footer/><div className="disclaimer-bar">Independent concept · Always verify current compatibility with Cypherock's official documentation.</div></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
