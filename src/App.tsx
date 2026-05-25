import { useEffect, useRef, useState } from 'react'
import alexandreImg from './assets/img/Alexandre01.png'
import alexandre2Img from './assets/img/Alexandre02.png'
import './index.css'

// ── Config ────────────────────────────────────────────────────
const WA_NUMBER = '5579999999999' // DDI + DDD + número
const WA_MSG    = 'Olá Alexandre! Vim pelo seu site e quero realizar meu sonho do imóvel próprio!'
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`

// ── Contratos: carrega Screenshot_*.png automaticamente ───────
const modules = import.meta.glob<{ default: string }>('./assets/img/Screenshot_*.png', { eager: true })
const contractImages = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, m]) => m.default)

// ── Hook reveal ao scroll ─────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true) },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, on] as const
}

// Wrapper que aplica o efeito de entrada suave
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [ref, on] = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${on ? 'on' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

// ── Ícone WhatsApp ────────────────────────────────────────────
function WaIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [['#sobre','Sobre'],['#servicos','Serviços'],['#contratos','Contratos'],['#contato','Contato']]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* inner centraliza o conteúdo */}
        <div className="navbar-inner">
          <a href="#" className="logo">
            <span className="logo-badge">AF</span>
            <span className="logo-name">Alexandre Farias</span>
          </a>

          <button
            className={`hamburger ${open ? 'active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-links ${open ? 'open' : ''}`}>
            {links.map(([href, label]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
            <li>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="nav-cta" onClick={() => setOpen(false)}>
                Falar Agora
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}
    </>
  )
}

// ── HERO ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-content">

        <Reveal className="hero-text">
          <p className="eyebrow">CRECI 5653 · Sergipe</p>
          <h1 className="hero-title">
            Mais que imóveis,<br /><em>entrego confiança.</em>
          </h1>
          <p className="hero-desc">
            Em 6 anos de mercado já realizei mais de{' '}
            <strong>400 sonhos</strong> em Sergipe. O seu pode ser o próximo —
            vou te acompanhar em cada etapa com total transparência e dedicação.
          </p>
          <div className="hero-actions">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WaIcon size={20} /> Quero Realizar Meu Sonho
            </a>
            <a href="#sobre" className="btn-ghost">Conheça minha história</a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="hero-visual">
          <div className="hero-img-wrap">
            <img src={alexandreImg} alt="Alexandre Farias — Corretor de Imóveis CRECI 5653" />
            <div className="hero-badge">
              <span>400+</span>
              <small>Sonhos Realizados</small>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

// ── STATS BAR ─────────────────────────────────────────────────
function Stats() {
  const items = [
    { value: '400+', label: 'Sonhos Realizados' },
    { value: '6',    label: 'Anos de Experiência' },
    { value: '5653', label: 'CRECI Sergipe' },
    { value: '100%', label: 'Comprometimento' },
  ]
  return (
    <div className="stats-bar">
      {items.map((s, i) => (
        <Reveal key={i} delay={i * 0.1} className="stat-item">
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </Reveal>
      ))}
    </div>
  )
}

// ── SOBRE ─────────────────────────────────────────────────────
function About() {
  return (
    <section className="about section-pad" id="sobre">
      <div className="container about-grid">

        <Reveal className="about-visual">
          <div className="about-img-wrap">
            <img src={alexandre2Img} alt="Alexandre Farias" loading="lazy" />
          </div>
          <div className="about-quote">
            <blockquote>"Mais que imóveis,<br />entregando confiança."</blockquote>
            <cite>— Alexandre Farias</cite>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="about-text">
          <p className="eyebrow">Sobre mim</p>
          <h2 className="section-title">
            Cada conquista sua é<br />minha maior recompensa
          </h2>
          <p>
            Sou Alexandre Farias, corretor de imóveis com 6 anos de dedicação ao mercado
            imobiliário em Sergipe. Escolhi essa profissão porque ajudar alguém a realizar
            o sonho da casa própria é um dos atos mais significativos que posso fazer.
          </p>
          <p>
            Ao longo da minha trajetória, já acompanhei mais de <strong>400 famílias</strong> em
            momentos que mudam suas vidas. Cada contrato representa uma história — e eu sinto
            o peso e a alegria de cada uma delas.
          </p>
          <p>
            Com registro no CRECI 5653, atuo com total transparência, segurança jurídica e
            respeito pelo seu tempo e pelo seu dinheiro. Aqui você não é mais um cliente:
            é alguém cujo sonho eu vou tratar como se fosse meu.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt">
            <WaIcon size={18} /> Vamos conversar
          </a>
        </Reveal>

      </div>
    </section>
  )
}

// ── SERVIÇOS ─────────────────────────────────────────────────
function Services() {
  const items = [
    { icon: '🏠', title: 'Compra e Venda',    desc: 'Te ajudo a encontrar o imóvel ideal dentro do seu orçamento, ou vender o seu pelo melhor preço.' },
    { icon: '📋', title: 'Documentação',       desc: 'Cuido de todo o processo burocrático. Da proposta ao registro em cartório, sem dor de cabeça.' },
    { icon: '🏦', title: 'Financiamento',      desc: 'Oriento e acompanho todo o processo de financiamento imobiliário com as melhores condições.' },
    { icon: '🔑', title: 'Locação',            desc: 'Para alugar ou colocar seu imóvel na locação, garanto um processo seguro e ágil.' },
  ]
  return (
    <section className="services section-pad" id="servicos">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">O que ofereço</p>
          <h2 className="section-title">Serviços pensados <span className="gold">para você</span></h2>
        </Reveal>
        <div className="services-grid">
          {items.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="service-card">
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CONTRATOS ────────────────────────────────────────────────
function Contracts() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [idx, setIdx]           = useState(0)

  const open  = (src: string, i: number) => { setLightbox(src); setIdx(i) }
  const close = () => setLightbox(null)
  const prev  = (e: React.MouseEvent) => {
    e.stopPropagation()
    const i = (idx - 1 + contractImages.length) % contractImages.length
    setLightbox(contractImages[i]); setIdx(i)
  }
  const next  = (e: React.MouseEvent) => {
    e.stopPropagation()
    const i = (idx + 1) % contractImages.length
    setLightbox(contractImages[i]); setIdx(i)
  }

  useEffect(() => {
    if (!lightbox) return
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      close()
      if (e.key === 'ArrowLeft')  { const i = (idx - 1 + contractImages.length) % contractImages.length; setLightbox(contractImages[i]); setIdx(i) }
      if (e.key === 'ArrowRight') { const i = (idx + 1) % contractImages.length; setLightbox(contractImages[i]); setIdx(i) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [lightbox, idx])

  return (
    <section className="contracts section-pad" id="contratos">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">Histórias reais</p>
          <h2 className="section-title">Contratos que <span className="gold">transformaram vidas</span></h2>
          <p className="section-sub">Cada imagem representa um sonho realizado, uma família com um novo lar.</p>
        </Reveal>

        {contractImages.length === 0 ? (
          <div className="contracts-empty">
            <span>📄</span>
            <p>Adicione <code>Screenshot_1.png</code>, <code>Screenshot_2.png</code>... em <code>src/assets/img/</code> — aparecem automaticamente.</p>
          </div>
        ) : (
          <>
            <p className="contracts-count">
              <span className="gold">{contractImages.length}</span> contratos realizados
            </p>
            <div className="contracts-grid">
              {contractImages.map((src, i) => (
                <Reveal key={i} delay={Math.min(i * 0.06, 0.5)} className="contract-item">
                  <img src={src} alt={`Contrato ${i + 1}`} loading="lazy" onClick={() => open(src, i)} />
                  <div className="contract-overlay" onClick={() => open(src, i)}>
                    <span>🔍 Ver</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={close}>
          <button className="lb-close" onClick={close}>✕</button>
          {contractImages.length > 1 && <>
            <button className="lb-nav lb-prev" onClick={prev}>‹</button>
            <button className="lb-nav lb-next" onClick={next}>›</button>
          </>}
          <div className="lb-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox} alt={`Contrato ${idx + 1}`} />
            <p className="lb-counter">{idx + 1} / {contractImages.length}</p>
          </div>
        </div>
      )}
    </section>
  )
}

// ── DEPOIMENTOS ──────────────────────────────────────────────
function Testimonials() {
  const items = [
    { name: 'isac_araujo_oficial', text: 'Sucesso meu amigo! Meu corretor top, sempre indicarei.' },
    { name: 'princeroob',          text: 'Meu primo é um Corretor Modelo. Muito orgulho da sua dedicação!' },
    { name: 'neeto.n8',            text: 'Corretor não, uma máquina! Profissionalismo em outro nível.' },
    { name: 'jucilenesantana02',   text: 'Parabéns! Um profissional que faz diferença na vida das pessoas.' },
    { name: 'vanildaimoveis',      text: 'Que o Senhor te cubra de bençãos! Profissional incrível.' },
    { name: 'marcosbarberpmu',     text: 'Referência no mercado imobiliário de Sergipe! 👏' },
  ]
  return (
    <section className="testimonials section-pad">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow">Depoimentos</p>
          <h2 className="section-title">O que dizem sobre mim</h2>
        </Reveal>
        <div className="testimonials-grid">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.08} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">
                <div className="avatar">{t.name[0].toUpperCase()}</div>
                <span>@{t.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CTA FINAL ────────────────────────────────────────────────
function CTA() {
  return (
    <section className="cta section-pad" id="contato">
      <div className="cta-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="cta-inner">
          <p className="eyebrow">Pronto para o próximo passo?</p>
          <h2 className="cta-title">Seu sonho começa<br />com uma conversa</h2>
          <p className="cta-desc">
            Não deixe para amanhã o que pode ser o início da sua nova história.
            Me chame agora no WhatsApp e vamos encontrar juntos o imóvel perfeito.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
            <WaIcon size={22} /> Falar com Alexandre agora
          </a>
          <p className="cta-note">Atendimento rápido, sem compromisso.</p>
        </Reveal>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="logo-badge">AF</span>
          <div>
            <strong>Alexandre Farias</strong>
            <small>Corretor de Imóveis · CRECI 5653 · Sergipe</small>
          </div>
        </div>
        <div className="footer-links">
          <a href="https://instagram.com/corretor_alexandrefarias" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={WA_URL}                                          target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Alexandre Farias. Todos os direitos reservados.</span>
        <p className="footer-dev">
          Desenvolvido por{' '}
          <a
            href="https://heverecstudiocode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-dev-link"
          >
            Heverec Studio Code
          </a>
        </p>
      </div>
    </footer>
  )
}

// ── FAB WHATSAPP ─────────────────────────────────────────────
function Fab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000)
    return () => clearTimeout(t)
  }, [])
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`fab ${show ? 'fab-on' : ''}`}
      aria-label="Falar no WhatsApp"
    >
      <WaIcon size={26} />
      <span>Falar no WhatsApp</span>
      <div className="fab-ring" />
    </a>
  )
}

// ── ROOT ─────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Contracts />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <Fab />
    </>
  )
}