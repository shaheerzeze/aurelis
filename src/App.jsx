import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import './design-system.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const asset = (name) => `${import.meta.env.BASE_URL}${name}`

function SportBackdrop({ image, className = '', strength = 44, position = 'center' }) {
  const root = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: root, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength])

  return <div ref={root} className={`sport-backdrop ${className}`} aria-hidden="true"><motion.div style={{ y: reduceMotion ? 0 : y, backgroundImage: `url("${image}")`, backgroundPosition: position }} /></div>
}

const HERO_VIDEOS = [
  { src: asset('hero-1-desktop.mp4'), mobile: asset('hero-1-mobile.mp4'), label: 'Signature court film' },
  { src: asset('hero-2-desktop.mp4'), mobile: asset('hero-2-mobile.mp4'), label: 'Club atmosphere film' },
  { src: asset('hero-3-desktop.mp4'), mobile: asset('hero-3-mobile.mp4'), label: 'Match experience film' },
]

const courts = [
  { name: 'Padel court', price: '24€', image: asset('court-padel.jpg') },
  { name: 'Single padel court', price: '26€', image: asset('court-tennis.jpg') },
  { name: 'Tennis court', price: '36€', image: asset('court-double.jpg') },
]

const academy = [
  { name: 'Kids & juniors', copy: 'Fun, learning and progress.', pos: 'left' },
  { name: 'Group training', copy: 'Improve technique and strategy.', pos: 'center' },
  { name: 'Private coaching', copy: 'One-to-one sessions, tailored to you.', pos: 'right' },
]

const events = [
  ['12', 'Sep', 'Social', 'Beginner Padel Evening'],
  ['21', 'Sep', 'Tournament', 'Mixed Doubles Tournament'],
  ['05', 'Oct', 'Academy', 'Academy Open Day'],
]

const faqs = [
  ['How do I book a court?', 'Choose a court and time online. Your booking is confirmed instantly by email.'],
  ['Is parking available?', 'Yes. Free parking is available directly beside the club entrance.'],
  ['What is your cancellation policy?', 'Cancel up to 24 hours before your booking for a full credit.'],
  ['Are membership and refunds available?', 'Flexible monthly and annual memberships are available. Our team can help find the right option.'],
  ['Do you offer coaching for beginners?', 'Yes. Private, group and junior coaching are available at every level.'],
  ['What are your opening hours?', 'The courts are open 24/7 for members with a confirmed booking.'],
]

const Arrow = () => <i className="ri-arrow-right-line ui-icon" aria-hidden="true" />

function PadelIcon({ className = '' }) {
  return (
    <svg className={`padel-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m18.6 22l-5.825-5.8l-.7.7q-.575.575-1.312.875t-1.513.3t-1.525-.3T6.4 16.9l-4.225-4.25q-.575-.575-.875-1.312T1 9.825t.3-1.512T2.175 7L5 4.175Q5.575 3.6 6.313 3.3T7.825 3t1.513.3t1.312.875L14.9 8.4q.575.575.875 1.325t.3 1.525t-.3 1.513t-.875 1.312l-.7.7L20 20.6zm-9.35-5.925q.375 0 .738-.137t.662-.438l2.85-2.85q.3-.275.438-.65t.137-.75t-.137-.75t-.438-.675L9.25 5.6q-.275-.3-.65-.45T7.85 5t-.75.15t-.675.45L3.6 8.425q-.3.3-.437.663t-.138.737t.138.75t.437.675l4.25 4.25q.275.3.65.438t.75.137M5.175 11.1q.325 0 .538-.212t.212-.538t-.212-.537t-.538-.213t-.537.213t-.213.537t.213.538t.537.212m1.6-1.575q.325 0 .538-.212t.212-.538t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212m.175 3.35q.325 0 .538-.213t.212-.537t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212m1.4-4.95q.325 0 .538-.213t.212-.537t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212m.2 3.375q.325 0 .537-.213t.213-.537t-.213-.537T8.55 9.8t-.537.213t-.213.537t.213.538t.537.212m.15 3.35q.325 0 .538-.213t.212-.537t-.212-.537t-.538-.213t-.537.213t-.213.537t.213.538t.537.212m1.425-4.95q.325 0 .538-.213t.212-.537t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212m.175 3.35q.325 0 .538-.213t.212-.537t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212m1.6-1.6q.325 0 .538-.212t.212-.538t-.213-.537t-.537-.213t-.537.213t-.213.537t.213.538t.537.212M19.5 9q-1.45 0-2.475-1.025T16 5.5t1.025-2.475T19.5 2t2.475 1.025T23 5.5t-1.025 2.475T19.5 9m0-2q.625 0 1.063-.437T21 5.5t-.437-1.062T19.5 4t-1.062.438T18 5.5t.438 1.063T19.5 7m0-1.5" />
    </svg>
  )
}

function CoachIcon({ className = '' }) {
  return (
    <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM17.8 9.2L19.2 10.6L22.5 7.3L21.1 5.9L17.8 9.2Z" />
    </svg>
  )
}

function EventsIcon({ className = '' }) {
  return (
    <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM10.56 17.46L7.4 14.3L8.81 12.89L10.56 14.64L15.15 10.05L16.56 11.46L10.56 17.46Z" />
    </svg>
  )
}

function GroupIcon({ className = '' }) {
  return (
    <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z" />
    </svg>
  )
}

function Brand() {
  return <a className="brand" href="#home" aria-label="Aurelis home"><img src={asset('aurelis-mark.svg')} alt="" /><span><b>Aurelis</b><small>Padel & tennis club</small></span></a>
}

function Button({ children, secondary = false, href = '#courts' }) {
  return <a href={href} className={`button ${secondary ? 'button--secondary' : ''}`}><span>{children}</span><Arrow /></a>
}

function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const currentY = Math.max(0, window.scrollY)
      const delta = currentY - lastY
      setScrolled(currentY > 24)
      if (currentY < 24) setHidden(false)
      else if (delta > 5) setHidden(true)
      else if (delta < -3) setHidden(false)
      lastY = currentY
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [['Courts', '#courts'], ['Academy', '#academy'], ['Club', '#experience'], ['Events', '#events'], ['Contact', '#contact'], ['Wanna be a sponsor', '#sponsors']]
  return <header className={`header ${hidden ? 'header--hidden' : ''} ${scrolled ? 'header--scrolled' : ''}`}><Brand /><nav className="nav">
    {links.map(([label, href]) => <a key={label} href={href}><span>{label}</span></a>)}
  </nav><a className="header-book" href="#courts">Book a court</a></header>
}

function TypewriterPhrase() {
  const phrases = ['the game', 'the limits', 'the ordinary', 'the moment']
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState(phrases[0])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIndex]
    const complete = text === phrase
    const empty = text.length === 0
    const delay = complete && !deleting ? 1500 : deleting ? 48 : 82
    const timer = window.setTimeout(() => {
      if (complete && !deleting) return setDeleting(true)
      if (empty && deleting) {
        setDeleting(false)
        setPhraseIndex(index => (index + 1) % phrases.length)
        return
      }
      setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1))
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, phraseIndex])

  return <em className="typewriter" aria-live="polite">{text}<span className="typewriter__caret" aria-hidden="true" /></em>
}

function HeroTargetCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const hero = cursor?.closest('.hero--campaign')
    if (!cursor || !hero || !window.matchMedia('(pointer: fine)').matches) return

    let frame = 0
    let x = -100
    let y = -100
    let targetX = x
    let targetY = y
    let width = 34
    let height = 34
    let targetWidth = width
    let targetHeight = height
    let activeTarget = null

    const render = () => {
      x += (targetX - x) * .24
      y += (targetY - y) * .24
      width += (targetWidth - width) * .2
      height += (targetHeight - height) * .2
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`
      cursor.style.width = `${width}px`
      cursor.style.height = `${height}px`
      frame = requestAnimationFrame(render)
    }

    const move = event => {
      const snapTarget = event.target.closest('.hero__actions .button, .hero__previews button, .hero-cinematic__films button, .hero-cinematic__reserve, .nav a span, .header-book, .brand')
      if (snapTarget) {
        const rect = snapTarget.getBoundingClientRect()
        activeTarget = snapTarget
        targetX = rect.left - 7
        targetY = rect.top - 7
        targetWidth = rect.width + 14
        targetHeight = rect.height + 14
        cursor.classList.add('is-snapped')
      } else {
        activeTarget = null
        targetX = event.clientX - 17
        targetY = event.clientY - 17
        targetWidth = 34
        targetHeight = 34
        cursor.classList.remove('is-snapped')
      }
      cursor.classList.add('is-visible')
    }

    const refreshSnap = () => {
      if (!activeTarget) return
      const rect = activeTarget.getBoundingClientRect()
      targetX = rect.left - 7
      targetY = rect.top - 7
    }
    const hide = () => cursor.classList.remove('is-visible', 'is-snapped')
    const press = () => cursor.classList.add('is-pressed')
    const release = () => cursor.classList.remove('is-pressed')

    hero.addEventListener('pointermove', move)
    hero.addEventListener('pointerleave', hide)
    hero.addEventListener('pointerdown', press)
    hero.addEventListener('pointerup', release)
    window.addEventListener('scroll', refreshSnap, { passive: true })
    frame = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(frame)
      hero.removeEventListener('pointermove', move)
      hero.removeEventListener('pointerleave', hide)
      hero.removeEventListener('pointerdown', press)
      hero.removeEventListener('pointerup', release)
      window.removeEventListener('scroll', refreshSnap)
    }
  }, [])

  return <div ref={cursorRef} className="hero-target-cursor" aria-hidden="true"><i /><i /><i /><i /><span /></div>
}

function HeroOriginal() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [incomingVideo, setIncomingVideo] = useState(null)
  const incomingVideoRef = useRef(null)
  const resumeTimeRef = useRef(0)

  const startVideoTransition = nextVideo => {
    if (nextVideo === activeVideo || incomingVideo !== null) return
    setIncomingVideo(nextVideo)
  }

  useEffect(() => {
    if (incomingVideo !== null) return undefined
    const timer = window.setTimeout(() => startVideoTransition((activeVideo + 1) % HERO_VIDEOS.length), 5000)
    return () => window.clearTimeout(timer)
  }, [activeVideo, incomingVideo])

  useEffect(() => {
    if (incomingVideo === null) return undefined
    const timer = window.setTimeout(() => {
      resumeTimeRef.current = incomingVideoRef.current?.currentTime || 0
      setActiveVideo(incomingVideo)
      setIncomingVideo(null)
    }, 600)
    return () => window.clearTimeout(timer)
  }, [incomingVideo])

  const resumeIncomingPlayback = event => {
    if (resumeTimeRef.current <= 0) return
    event.currentTarget.currentTime = resumeTimeRef.current
    resumeTimeRef.current = 0
  }

  const playPreview = event => { event.currentTarget.querySelector('video')?.play().catch(() => {}) }
  const pausePreview = event => {
    const previewVideo = event.currentTarget.querySelector('video')
    if (previewVideo) { previewVideo.pause(); previewVideo.currentTime = 0 }
  }

  const benefits = [
    [<PadelIcon key="padel" />, 'Premium courts', 'Indoor & outdoor courts'],
    [<CoachIcon key="coach" />, 'Expert coaches', 'Certified for every level'],
    [<EventsIcon key="events" />, 'Events & tournaments', 'Competitive play all year'],
    [<GroupIcon key="group" />, 'Vibrant community', 'Play, connect and belong'],
  ]
  return <section className="hero hero--campaign hero--restored" id="home"><Header /><HeroTargetCursor /><video key={activeVideo} className="hero__image hero__video" autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={resumeIncomingPlayback} poster={asset('aurelis-hero-poster.jpg')} aria-label={HERO_VIDEOS[activeVideo].label}><source media="(max-width: 700px)" src={HERO_VIDEOS[activeVideo].mobile} type="video/mp4" /><source src={HERO_VIDEOS[activeVideo].src} type="video/mp4" /></video>
    {incomingVideo !== null && <video ref={incomingVideoRef} key={`incoming-${incomingVideo}`} className="hero__image hero__video hero__video--incoming" autoPlay muted loop playsInline preload="auto" poster={asset('aurelis-hero-poster.jpg')} aria-hidden="true"><source media="(max-width: 700px)" src={HERO_VIDEOS[incomingVideo].mobile} type="video/mp4" /><source src={HERO_VIDEOS[incomingVideo].src} type="video/mp4" /></video>}
    <div className="hero__slice-lines" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i key={index} style={{ '--slice': index + 1 }} />)}</div>
    <div className="hero__shade" /><motion.div className="hero__copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
      <p className="eyebrow">Premium padel & tennis club</p>
      <h1 className="hero__statement"><span>Focus</span><i /><em>Play</em><i /><span>Win</span></h1>
      <div className="hero__actions"><Button>Book a court</Button><Button secondary href="#experience">Explore the club</Button></div>
    </motion.div>
    <div className="hero__previews">
        <span className="hero__index"><b>0{activeVideo + 1}</b><span className="hero__track"><i className="hero__loading-line" key={`loading-${activeVideo}`} /></span></span>
      <div>{HERO_VIDEOS.map((video, index) => <button type="button" className={activeVideo === index ? 'is-active' : ''} onClick={() => startVideoTransition(index)} onMouseEnter={playPreview} onMouseLeave={pausePreview} onFocus={playPreview} onBlur={pausePreview} key={video.label} aria-label={`Play ${video.label}`} aria-pressed={activeVideo === index}><video muted loop playsInline preload="metadata" poster={asset('aurelis-hero-poster.jpg')}><source src={video.mobile} type="video/mp4" /></video><span key={`thumb-line-${activeVideo}`} /></button>)}</div>
      <p><strong>World-class facilities</strong><span>Indoor & outdoor courts<br />Built for champions</span></p>
    </div>
    <a className="hero__scroll-cue" href="#courts"><span>Scroll down</span><i><b /></i></a>
    <div className="hero__benefits">{benefits.map(([icon, title, copy]) => <div key={title}>{icon}<p><strong>{title}</strong><small>{copy}</small></p></div>)}</div>
  </section>
}

function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [transitionKey, setTransitionKey] = useState(0)
  const features = [
    [<PadelIcon key="padel" />, 'Premium courts', 'Indoor & outdoor courts'],
    [<CoachIcon key="coach" />, 'Expert coaches', 'Certified for every level'],
    [<EventsIcon key="events" />, 'Events & tournaments', 'Competitive play all year'],
    [<GroupIcon key="group" />, 'Vibrant community', 'Play, connect and belong'],
  ]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveVideo(current => (current + 1) % HERO_VIDEOS.length)
      setTransitionKey(current => current + 1)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [])

  const selectVideo = index => {
    if (index === activeVideo) return
    setActiveVideo(index)
    setTransitionKey(current => current + 1)
  }

  return <><section className="hero hero--campaign hero--cinematic" id="home">
    <Header />
    <HeroTargetCursor />
    <div className="hero-cinematic__media" aria-live="polite">
      {HERO_VIDEOS.map((video, index) => <video key={video.label} className={activeVideo === index ? 'is-active' : ''} autoPlay muted loop playsInline preload={index === 0 ? 'auto' : 'metadata'} poster={asset('aurelis-hero-poster.jpg')} aria-hidden={activeVideo !== index}><source media="(max-width: 700px)" src={video.mobile} type="video/mp4" /><source src={video.src} type="video/mp4" /></video>)}
      <div className="hero-cinematic__shade" />
      <div className="hero-cinematic__grid" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
      <div className="hero-cinematic__wipe" key={transitionKey} aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} style={{ '--wipe-index': index }} />)}</div>
    </div>

    <div className="hero-cinematic__content">
      <div className="hero-cinematic__statement">
        <div><h1>Motion</h1><p>Expert coaching.<br />Purposeful movement.</p></div>
        <div><h1>Discipline</h1><p>Clear the noise.<br />Own every point.</p></div>
        <div><h1>Result</h1><p>Sharper play.<br />Lasting progress.</p></div>
      </div>

      <div className="hero-cinematic__lower">
        <div
          className="hero-cinematic__club-card"
          style={{ '--club-card-image': `url("${asset('aurelis-padel-balls-card.jpg')}")` }}
        ><small>Your club</small><strong>10+</strong><span>Premium courts</span><b>4.8 <i>★★★★★</i></b></div>
        <div className="hero-cinematic__films" aria-label="Hero films">{HERO_VIDEOS.map((video, index) => <button type="button" className={activeVideo === index ? 'is-active' : ''} onClick={() => selectVideo(index)} key={video.label}><span>0{index + 1}</span><i><b /></i></button>)}</div>
        <a className="hero-cinematic__reserve" href="#courts"><span>Reserve a court</span><Arrow /></a>
      </div>
    </div>
  </section>
    <section className="hero-benefit-rail" aria-label="Aurelis club benefits">{features.map(([icon, title, copy]) => <div key={title}>{icon}<p><strong>{title}</strong><small>{copy}</small></p></div>)}</section>
  </>
}

function CourtCard({ court, index, icon, meta }) {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-7, 7]), { stiffness: 190, damping: 19 })
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [7, -7]), { stiffness: 190, damping: 19 })

  const followPointer = event => {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5)
  }
  const resetTilt = () => { pointerX.set(0); pointerY.set(0) }

  const metaIcons = [asset('icons/players.svg'), asset('icons/levels.svg'), asset('icons/duration.svg')]
  return <motion.article className="court-card" initial={reduceMotion ? false : { opacity: 0, y: 90, scale: .96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .22 }} transition={{ type: 'spring', stiffness: 92, damping: 18, delay: reduceMotion ? 0 : index * .14 }} whileHover={reduceMotion ? undefined : { scale: 1.025 }} style={reduceMotion ? undefined : { rotateX, rotateY }} onMouseMove={followPointer} onMouseLeave={resetTilt}>
    <div className="court-card__media"><div className="court-card__head"><b>0{index + 1}</b><i /><small>{court.name}</small>{icon === 'padel' ? <PadelIcon /> : <img src={icon} alt="" decoding="async" />}</div><img className="court-card__photo" src={court.image} alt={`${court.name} players at Aurelis`} loading="lazy" decoding="async" /></div>
    <div className="court-card__body"><div className="court-card__meta">{meta.reduce((items, item, metaIndex) => { if (metaIndex % 2 === 0) items.push(<span key={item}><img src={metaIcons[metaIndex / 2]} alt="" /><b>{item}</b><small>{meta[metaIndex + 1]}</small></span>); return items }, [])}</div><p className="court-card__price"><strong>{court.price}</strong><small>/ hour</small></p><a className="court-card__book" href="#contact"><span>Book now</span><img src={asset('icons/arrow-right.svg')} alt="" /></a></div>
  </motion.article>
}

function Courts() {
  const icons = ['padel', 'padel', asset('icons/court-ball.svg')]
  const courtMeta = [
    ['4', 'Players', 'All', 'Levels', '60', 'Minutes'],
    ['2', 'Players', 'All', 'Levels', '60', 'Minutes'],
    ['2–4', 'Players', 'All', 'Levels', '60', 'Minutes'],
  ]
  return <section className="section courts courts--light" id="courts"><SportBackdrop image={asset('court-padel.jpg')} className="sport-backdrop--courts" strength={52} position="center 42%" /><div className="section-lead"><div className="courts__eyebrow"><small>Our courts</small><i aria-hidden="true" /></div><h2>Choose<br />your <em>game</em></h2><span className="section-heading__bottom-rule" aria-hidden="true" /><p>Top-quality courts, designed for champions. Book your court in just a few clicks.</p><Button href="#courts">View all courts</Button></div>
    <div className="court-grid">{courts.map((court, index) => <CourtCard key={court.name} court={court} index={index} icon={icons[index]} meta={courtMeta[index]} />)}</div>
  </section>
}

function Experience() {
  return <section className="experience" id="experience"><div className="experience__copy"><small>Experience Aurelis</small><h2>Where sport<br />meets lifestyle</h2><p>From intense matches to unforgettable moments with your people.</p><Button secondary>Watch the experience</Button></div><div className="experience__feature"><img src={asset('aurelis-hero-branded.webp')} alt="Aurelis courts and clubhouse at night" /><button type="button" className="experience__play" aria-label="Play the Aurelis club experience"><span>▶</span></button></div><div className="experience__tiles"><img src={asset('aurelis-lounge.webp')} alt="Club lounge" /><img src={asset('aurelis-community.webp')} alt="Padel match" /><img src={asset('aurelis-court-branded.webp')} alt="Aurelis court details" /></div></section>
}

function ExperienceEditorial() {
  const reduceMotion = useReducedMotion()
  const [activeImage, setActiveImage] = useState(0)
  const [galleryDirection, setGalleryDirection] = useState(1)
  const [hoveredImage, setHoveredImage] = useState(null)
  const galleryImages = [
    { src: 'aurelis-hero-branded.webp', alt: 'Aurelis courts and clubhouse', kicker: 'Club overview', title: 'Where performance meets perspective.', copy: 'Nine premium courts where light, space and perspective reshape every moment of play.' },
    { src: 'aurelis-lounge.webp', alt: 'Aurelis club lounge', kicker: 'Lounge & café', title: 'Relax. Recharge. Refuel.', copy: 'A social club built around movement, recovery and connection.' },
    { src: 'court-padel.jpg', alt: 'Aurelis padel court', kicker: 'Premium courts', title: 'Precision in every detail.', copy: 'Professional courts, precise lighting and carefully selected surfaces.' },
    { src: 'aurelis-community.webp', alt: 'Aurelis community', kicker: 'Club community', title: 'Play, connect and belong.', copy: 'Matches become rituals and players become a community.' },
    { src: 'aurelis-court-branded.webp', alt: 'Aurelis court detail', kicker: 'Equipment', title: 'Premium gear for every level.', copy: 'Every line, material and detail is considered.' },
  ]
  const legacyGalleryPosition = index => {
    const offset = (index - activeImage + galleryImages.length) % galleryImages.length
    return { offset, position: ['center', 'right-inner', 'right-middle', 'right-outer', 'left-outer', 'left-middle', 'left-inner'][offset] }
  }
  const showPrevious = () => {
    setGalleryDirection(-1)
    setActiveImage(index => (index - 1 + galleryImages.length) % galleryImages.length)
  }
  const showNext = () => {
    setGalleryDirection(1)
    setActiveImage(index => (index + 1) % galleryImages.length)
  }
  const showImageAtOffset = (offset, imageIndex) => {
    if (offset === 0) return
    setGalleryDirection(offset > 0 ? 1 : -1)
    setActiveImage(imageIndex)
  }
  const displayedImage = hoveredImage ?? activeImage
  const selectPrevious = () => {
    setHoveredImage(null)
    showPrevious()
  }
  const selectNext = () => {
    setHoveredImage(null)
    showNext()
  }
  return <section className="experience-story experience-story--parallax" id="experience"><div className="experience-story__sticky"><div className="experience experience--editorial experience__panel experience__panel--fixed club-overview">
    <div className="experience__page-grid" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
    <div className="club-overview__lead">
      <div className="club-overview__eyebrow"><small>Our club</small><i aria-hidden="true" /></div>
      <h2>Aurelis<br /><em>club</em></h2><span className="club-overview__rule" aria-hidden="true" />
      <p>Premium courts, designed for performance.</p>
      <div className="club-overview__features">
        <article><img src={asset('icons/court-racket.svg')} alt="" /><div><strong>Premium facilities</strong><span>State-of-the-art courts and amenities for the best experience.</span></div></article>
        <article><img src={asset('icons/players.svg')} alt="" /><div><strong>Expert coaching</strong><span>Programs for every level. Train with the best.</span></div></article>
      </div>
      <a className="club-overview__cta" href="#contact"><span>Register</span><Arrow /></a>
    </div>
    <div className="club-overview__showcase">
      <div className="club-overview__counter">[ <b>{String(displayedImage + 1).padStart(2, '0')}</b><i>/</i>{String(galleryImages.length).padStart(2, '0')} ]</div>
      <div className="club-accordion" onMouseLeave={() => setHoveredImage(null)}>
        {galleryImages.map((image, imageIndex) => {
          const expanded = displayedImage === imageIndex
          return <motion.article key={image.src} className={`club-accordion__item${expanded ? ' is-expanded' : ''}`} tabIndex="0" initial={reduceMotion ? false : { opacity: 0, y: 72 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .22 }} transition={{ duration: reduceMotion ? 0 : .68, delay: reduceMotion ? 0 : imageIndex * .1, ease: [.22, 1, .36, 1] }} onMouseEnter={() => setHoveredImage(imageIndex)} onFocus={() => setHoveredImage(imageIndex)} onBlur={() => setHoveredImage(null)} onClick={() => setActiveImage(imageIndex)}>
            <img src={asset(image.src)} alt={image.alt} loading="lazy" decoding="async" /><div className="club-accordion__shade" aria-hidden="true" />
            <div className="club-accordion__copy"><small>{expanded ? 'Featured' : String(imageIndex + 1).padStart(2, '0')}</small><span>{image.kicker}</span><h3>{image.title}</h3>{expanded ? <p>{image.copy}</p> : <b aria-hidden="true">+</b>}</div>
          </motion.article>
        })}
      </div>
      <div className="club-overview__stats"><article><strong>10+</strong><span>Premium courts<small>Designed to perform</small></span></article><article><strong>25+</strong><span>Pro coaches<small>Experts in the game</small></span></article><article><strong>50k+</strong><span>Happy players<small>And growing</small></span></article><article><strong>100+</strong><span>Monthly events<small>Play. Compete. Connect.</small></span></article></div>
    </div>
  </div></div></section>
  /* Legacy gallery kept below temporarily while the new accordion replaces its output. */
  /* eslint-disable no-unreachable */
  return <section className="experience-story experience-story--parallax" id="experience"><div className="experience-story__sticky"><div className="experience experience--editorial experience__panel experience__panel--fixed">
    <div className="experience__page-grid" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
    <div className="experience__heading"><small>Our club</small><h2>Aurelis club</h2><span className="experience__title-rule" aria-hidden="true" /><p>Premium courts, designed for performance.</p></div>
    <div className="experience__gallery-shell"><button className="experience__side-control experience__side-control--previous" type="button" onClick={showPrevious} aria-label="Show previous gallery image">←</button><div className="experience__gallery-stage">
      {galleryImages.map((image, imageIndex) => {
        const { offset, position } = legacyGalleryPosition(imageIndex)
        const isCenter = position === 'center'
        const isWrapping = (galleryDirection === 1 && offset === 3) || (galleryDirection === -1 && offset === 4)
        return <motion.figure layout key={image.src} className={`experience__gallery-item is-${position}`} initial={false} animate={{ opacity: isWrapping && !reduceMotion ? [0, 0, .82] : isCenter ? 1 : .82 }} transition={{ layout: { duration: reduceMotion ? 0 : .72, ease: [.22, 1, .36, 1] }, opacity: { duration: reduceMotion ? 0 : .72, times: isWrapping ? [0, .72, 1] : undefined } }} onClick={() => showImageAtOffset(offset <= 3 ? offset : offset - galleryImages.length, imageIndex)}><img src={asset(image.src)} alt={image.alt} loading="lazy" decoding="async" /><figcaption><small>{image.kicker}</small><strong>{image.title}</strong>{isCenter ? <span>{image.copy}</span> : null}</figcaption>{isCenter ? <div className="experience__counter"><b>{String(activeImage + 1).padStart(2, '0')}</b><i>/</i><span>{String(galleryImages.length).padStart(2, '0')}</span></div> : null}</motion.figure>
      })}
    </div><button className="experience__side-control experience__side-control--next" type="button" onClick={showNext} aria-label="Show next gallery image">→</button></div>
    <a className="button button--secondary experience__gallery-button" href="#contact"><span>Discover the club</span><Arrow /></a>
  </div></div></section>
}

function Academy() {
  const programIcons = ['ri-user-smile-line', 'ri-team-line', 'ri-star-line']
  return <section className="academy academy--showcase" id="academy"><SportBackdrop image={asset('aurelis-academy.webp')} className="sport-backdrop--academy" strength={38} position="center 35%" />
    <motion.div className="academy__intro" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75 }}>
      <div className="academy__eyebrow"><small>Aurelis academy</small><i aria-hidden="true" /></div>
      <h2>Train.<br />Improve.<br /><em>Achieve.</em></h2>
      <span className="section-heading__bottom-rule" aria-hidden="true" />
      <p>Programs and coaching designed to elevate your game to the next level.</p>
      <Button href="#contact">Discover academy</Button>
    </motion.div>
    <div className="academy-grid academy-grid--showcase">{academy.map((item, index) => <motion.article className="academy-card" key={item.name} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay: index * .12, ease: [.22, 1, .36, 1] }}>
      <div className="academy-card__media"><b>0{index + 1}</b><i /><img src={asset('aurelis-academy.webp')} style={{ objectPosition: item.pos }} alt={item.name} loading="lazy" decoding="async" /></div>
      <div className="academy-card__body"><i className={programIcons[index]} /><h3>{item.name}</h3><span /><p>{item.copy}</p><a href="#contact">Learn more <Arrow /></a></div>
    </motion.article>)}
      <motion.article className="academy-membership" initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay: .36, ease: [.22, 1, .36, 1] }}>
        <div className="academy-membership__mark"><img src={asset('aurelis-mark.svg')} alt="Aurelis" /></div><h3>Academy<br />membership</h3><span />
        <ul><li><img src={asset('icons/duration.svg')} alt="" />More sessions.</li><li><img src={asset('icons/levels.svg')} alt="" />More benefits.</li><li><img src={asset('icons/players.svg')} alt="" />One community.</li></ul>
        <a href="#contact">Learn more <Arrow /></a>
      </motion.article>
    </div>
  </section>
}

function Events() {
  const eventSlugs = ['beginner-padel-evening', 'mixed-doubles-tournament', 'academy-open-day']
  return <section className="events" id="events"><SportBackdrop image={asset('court-double.jpg')} className="sport-backdrop--events" strength={34} position="center 62%" /><div className="events__title"><div className="events__eyebrow"><small>Upcoming events</small><i aria-hidden="true" /></div><h2>Club<br /><em>calendar</em></h2><span className="section-heading__bottom-rule" aria-hidden="true" /><a href="#events">View all events <Arrow /></a></div><div className="event-grid">{events.map((e, index) => <article key={e[0]}><div><strong>{e[0]}</strong><span>{e[1]}</span><small>{e[2]}</small></div><h3>{e[3]}</h3><a className="event-card__action" href={`${import.meta.env.BASE_URL}events/${eventSlugs[index]}`}>Register <Arrow /></a></article>)}</div><div className="stats"><strong>5+ <small>premium courts</small></strong><strong>20+ <small>pro coaches</small></strong><strong>50k+ <small>happy players</small></strong></div></section>
}

const technologyFeatures = [
  { icon: 'ri-lock-unlock-line', title: 'Self check-in', copy: 'Access the club instantly.' },
  { icon: 'ri-calendar-check-line', title: '24/7 access', copy: 'Your time. Your court.' },
  { icon: 'ri-ping-pong-line', title: 'Equipment rental', copy: 'Premium gear, ready when you are.' },
  { icon: 'ri-shield-check-line', title: 'Damage detection', copy: 'AI-powered protection for fair play.' },
]

function Technology() {
  const sectionRef = useRef(null)
  const phoneRef = useRef(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(phoneRef.current,
        { y: 180, autoAlpha: 0, rotateX: 8, scale: .92 },
        {
          y: 0,
          autoAlpha: 1,
          rotateX: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 88%',
            end: 'top 28%',
            scrub: .65,
            invalidateOnRefresh: true,
          },
        })

      gsap.from('.technology__feature', {
        y: 42,
        autoAlpha: 0,
        stagger: .12,
        duration: .75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.technology__features',
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from(phoneRef.current, {
        y: 90,
        autoAlpha: 0,
        scale: .94,
        duration: .9,
        ease: 'power3.out',
        scrollTrigger: { trigger: phoneRef.current, start: 'top 88%', once: true },
      })
    })

    return () => media.revert()
  }, { scope: sectionRef })

  return <section className="technology-showcase" id="technology" ref={sectionRef}>
    <div className="technology-showcase__decor technology-showcase__decor--dots" aria-hidden="true" />
    <div className="technology-showcase__decor technology-showcase__decor--stripes" aria-hidden="true" />
    <div className="technology-showcase__intro">
      <div className="technology-showcase__eyebrow"><b>03</b><span>Technology</span></div>
      <h2>Smart.<br />Seamless.<br /><em>Effortless.</em></h2>
      <i className="technology-showcase__slashes" aria-hidden="true" />
      <p>Self check-in. 24/7 access. Equipment rental. AI damage detection. Everything you need, in one powerful system.</p>
      <a className="technology-showcase__cta" href="#contact"><span>See how it works</span><Arrow /></a>
    </div>
    <div className="technology-showcase__phone-column">
      <div className="technology-phone" ref={phoneRef}>
        <div className="technology-phone__speaker" />
        <div className="technology-phone__screen">
          <header><img src={asset('aurelis-mark.svg')} alt="" /><b>Aurelis</b><span>Padel club</span><i className="ri-notification-3-line" /></header>
          <h3>Good evening, <em>Alex</em></h3>
          <section className="phone-access"><small>Club access</small><strong>Unlocked</strong><p>Welcome back.<br />Enjoy your game.</p><i className="ri-lock-unlock-line" /></section>
          <section className="phone-match"><div><small>Next match</small><strong>Today · 20:00</strong><span><i className="ri-map-pin-line" /> Court 2</span><span><i className="ri-time-line" /> 90 min</span><div className="phone-avatars"><b>A</b><b>M</b><b>J</b><b>+1</b></div></div><img src={asset('court-padel.jpg')} alt="Aurelis court" /></section>
          <div className="phone-actions"><button><i className="ri-calendar-check-line" />Book a court <Arrow /></button><button><i className="ri-ping-pong-line" />Rent equipment <Arrow /></button></div>
          <section className="phone-availability"><small>Court availability</small><div className="phone-times"><span>18:00</span><span>19:00</span><span>20:00</span><span>21:00</span><span>22:00</span></div>{[1, 2, 3].map(row => <div className="phone-slots" key={row}><b>Court {row}</b>{[0, 1, 2, 3, 4].map(slot => <i className={slot === 2 && row === 2 ? 'is-booked' : slot % 3 === 0 ? 'is-open' : ''} key={slot} />)}</div>)}</section>
          <nav className="phone-nav"><b><i className="ri-home-4-line" />Home</b><span><i className="ri-calendar-line" />Book</span><span><i className="ri-team-line" />Community</span><span><i className="ri-user-line" />Profile</span></nav>
        </div>
      </div>
    </div>
    <div className="technology__features">{technologyFeatures.map(feature => <article className="technology__feature" key={feature.title}><div><i className={feature.icon} /></div><span><h3>{feature.title}</h3><p>{feature.copy}</p><i /></span></article>)}</div>
  </section>
}

function FAQ() {
  const [active, setActive] = useState(null)
  const reduceMotion = useReducedMotion()
  return <section className="faq" id="faq"><div className="faq__intro"><div className="faq__eyebrow"><small>FAQ</small><i aria-hidden="true" /></div><h2>Frequently<br />asked <em>questions</em></h2><span className="section-heading__bottom-rule" aria-hidden="true" /><p>Everything you need to know about Aurelis Club.</p></div><div className="faq__list">{faqs.map(([q, a], i) => <article className={active === i ? 'is-open' : ''} key={q}><button onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}><span>{q}</span><b aria-hidden="true">{active === i ? '−' : '+'}</b></button>{active === i ? <motion.p initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }}>{a}</motion.p> : null}</article>)}</div></section>
}

function Footer() {
  const groups = [['Play', ['Courts', 'Academy', 'Events']], ['Discover', ['Club', 'FAQ', 'Become a sponsor']]]
  const footerHref = { Club: '#experience', FAQ: '#faq', 'Become a sponsor': '#sponsors' }
  const socials = ['Instagram', 'Facebook', 'YouTube', 'LinkedIn']
  return <footer id="contact" className="footer--modern"><div className="footer__main"><div className="footer__brand"><Brand /><h2 className="footer__heading">Play.<br />Improve.<br /><em>Achieve.</em></h2><p>Premium padel and tennis,<br />built around the way you play.</p><Button href="#courts">Book a court</Button></div><div className="footer__links"><div className="footer__nav-row">{groups.map(([title, links]) => <nav className="footer__column" aria-label={title} key={title}><b>{title}</b><i className="footer__column-rule" aria-hidden="true" />{links.map(x => <a href={footerHref[x] ?? `#${x.toLowerCase()}`} key={x}>{x}</a>)}</nav>)}<address className="footer__column footer__contact"><b>Visit us</b><i className="footer__column-rule" aria-hidden="true" /><span>123 Padel Avenue</span><span>68000 Colmar, France</span><a href="tel:+33612345678">+33 6 12 34 56 78</a><a href="mailto:hello@aurelisclub.com">hello@aurelisclub.com</a></address></div><div className="footer__follow"><b>Follow us</b><i className="footer__column-rule" aria-hidden="true" /><div className="footer__socials">{socials.map(name => <a href="#contact" key={name}>{name}<i className="ri-arrow-right-up-line" aria-hidden="true" /></a>)}</div></div></div></div><div className="footer__bottom"><span>© 2026 Aurelis Padel Club.</span><span><a href="#contact">Privacy policy</a><i>·</i><a href="#contact">Terms &amp; conditions</a></span></div></footer>
}

function SponsorMarquee() {
  const sponsors = Array.from({ length: 8 })
  return <section className="sponsors" id="sponsors" aria-label="Aurelis sponsors"><div className="sponsors__viewport"><div className="sponsors__track">{[0, 1].map(group => <div className="sponsors__group" aria-hidden={group === 1} key={group}>{sponsors.map((_, index) => <div className="sponsors__item" key={`${group}-${index}`}><img src={asset('aurelis-logo.svg')} alt={group === 0 && index === 0 ? 'Aurelis' : ''} loading="lazy" decoding="async" /></div>)}</div>)}</div></div></section>
}

function FloatingActions() {
  const [visible, setVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let ticking = false
    const update = () => {
      setVisible(window.scrollY > Math.min(window.innerHeight * .55, 520))
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const state = visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: .94 }
  const transition = reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 24 }
  return <div className={`floating-actions ${visible ? 'is-visible' : ''} ${chatOpen ? 'is-chat-open' : ''}`} aria-hidden={!visible}>
    <motion.button type="button" className="chatbot-backdrop" aria-label="Close chat" onClick={() => setChatOpen(false)} initial={false} animate={chatOpen ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .28 }} tabIndex={-1} />
    <motion.a className="floating-book" href="#courts" animate={state} transition={transition} tabIndex={visible ? 0 : -1} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.025 }} whileTap={reduceMotion ? undefined : { scale: .97 }}><span>Book now</span><Arrow /></motion.a>
    <motion.div className="chatbot" initial={false} animate={chatOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: .96 }} transition={transition} aria-hidden={!chatOpen}>
      <div className="chatbot__head"><span><b>Aurelis concierge</b><small>Online now</small></span><button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat">×</button></div>
      <div className="chatbot__body"><p>Hello. How can we help with your Aurelis experience?</p><button type="button">Book a court <Arrow /></button><button type="button">Explore membership <Arrow /></button><button type="button">Ask about coaching <Arrow /></button></div>
      <label className="chatbot__input"><span className="sr-only">Your message</span><input type="text" placeholder="Write a message..." /><button type="button" aria-label="Send message"><Arrow /></button></label>
    </motion.div>
    <motion.button type="button" className="floating-chat" aria-label={chatOpen ? 'Close Aurelis chat' : 'Chat with Aurelis'} aria-expanded={chatOpen} onClick={() => setChatOpen(open => !open)} animate={state} transition={{ ...transition, delay: reduceMotion ? 0 : .06 }} tabIndex={visible ? 0 : -1} whileHover={reduceMotion ? undefined : { y: -4, scale: 1.06 }} whileTap={reduceMotion ? undefined : { scale: .94 }}><span className="floating-chat__glyph" aria-hidden="true"><i /><i /><i /></span><span className="floating-chat__dot" /></motion.button>
  </div>
}

function CourtRoofIntro() {
  const root = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()

  useGSAP(() => {
    if (!ready || !visible) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const finish = () => {
      document.body.style.overflow = previousOverflow
      setVisible(false)
    }

    if (reduceMotion) {
      gsap.to(root.current, { autoAlpha: 0, duration: .35, ease: 'power1.out', onComplete: finish })
      return () => { document.body.style.overflow = previousOverflow }
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' }, onComplete: finish })
    timeline
      .fromTo('.roof-intro__seam', { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: 1, duration: 1.15, ease: 'power2.inOut' }, 'slice')
      .fromTo('.roof-intro__glow', { scaleY: 0, autoAlpha: 0 }, { scaleY: 1, autoAlpha: .85, duration: 1.15, ease: 'power2.inOut' }, 'slice')
      .addLabel('open', 'slice+=1.29')
      .set(['.roof-intro__seam', '.roof-intro__glow'], { autoAlpha: 0 }, 'open')
      .to('.roof-intro__panel--left', { xPercent: -103, rotationY: -7, duration: 2.35, ease: 'power2.inOut' }, 'open')
      .to('.roof-intro__panel--right', { xPercent: 103, rotationY: 7, duration: 2.35, ease: 'power2.inOut' }, 'open')
      .to('.roof-intro__veil', { autoAlpha: 0, duration: 1.45, ease: 'sine.inOut' }, 'open+=.48')
      .to(root.current, { autoAlpha: 0, duration: .3, ease: 'sine.out' }, '-=.12')

    return () => {
      timeline.kill()
      document.body.style.overflow = previousOverflow
    }
  }, { scope: root, dependencies: [ready, visible, reduceMotion], revertOnUpdate: true })

  if (!visible) return null
  return <div className="roof-intro" ref={root} style={{ '--roof-image': `url(${asset('aurelis-roof-intro.webp')})` }} aria-label="Opening Aurelis court" aria-live="polite">
    <img className="roof-intro__preload" src={asset('aurelis-roof-intro.webp')} alt="" fetchPriority="high" onLoad={() => setReady(true)} />
    <div className="roof-intro__veil" />
    <div className="roof-intro__panel roof-intro__panel--left" />
    <div className="roof-intro__panel roof-intro__panel--right" />
    <div className="roof-intro__glow" />
    <div className="roof-intro__seam" />
    <button type="button" className="roof-intro__skip" onClick={() => setVisible(false)}>Skip intro</button>
  </div>
}

export default function App() { return <><CourtRoofIntro /><Hero /><main><Courts /><ExperienceEditorial /><Academy /><Events /><FAQ /><SponsorMarquee /></main><Footer /><FloatingActions /></> }
