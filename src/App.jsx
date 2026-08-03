import React, { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'
import './design-system.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const asset = (name) => `${import.meta.env.BASE_URL}${name}`

const HERO_VIDEOS = [
  { src: asset('hero-1-desktop.mp4'), mobile: asset('hero-1-mobile.mp4'), label: 'Signature court film' },
  { src: asset('hero-2-desktop.mp4'), mobile: asset('hero-2-mobile.mp4'), label: 'Club atmosphere film' },
  { src: asset('hero-3-desktop.mp4'), mobile: asset('hero-3-mobile.mp4'), label: 'Match experience film' },
]

const courts = [
  { name: 'Padel court', price: '24€', image: asset('court-padel.jpg') },
  { name: 'Tennis court', price: '26€', image: asset('court-tennis.jpg') },
  { name: 'Double court', price: '36€', image: asset('court-double.jpg') },
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

function SocialIcon({ name }) {
  const common = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: 'false' }
  if (name === 'instagram') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>
  if (name === 'facebook') return <svg {...common} fill="currentColor"><path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.25-1.5 1.57-1.5H17V3.62a23 23 0 0 0-2.43-.12c-2.4 0-4.04 1.46-4.04 4.14V10H7.8v3.1h2.73V21h3.17Z"/></svg>
  if (name === 'youtube') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2.75" y="5.25" width="18.5" height="13.5" rx="4"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none"/></svg>
  return <svg {...common} fill="currentColor"><path d="M5.3 8.1H2.2V21h3.1V8.1ZM3.75 3A1.8 1.8 0 1 0 3.75 6.6 1.8 1.8 0 0 0 3.75 3ZM21.8 13.6c0-3.88-2.07-5.68-4.83-5.68-2.23 0-3.22 1.22-3.77 2.08V8.1h-3.1V21h3.1v-6.4c0-1.68.32-3.3 2.4-3.3 2.05 0 2.08 1.92 2.08 3.4V21h3.12l1-7.4Z"/></svg>
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

  return <header className={`header ${hidden ? 'header--hidden' : ''} ${scrolled ? 'header--scrolled' : ''}`}><Brand /><nav className="nav">
    {['Courts', 'Academy', 'Experience', 'Events', 'About', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
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
      const snapTarget = event.target.closest('.hero__actions .button, .hero__previews button, .nav a, .header-book, .brand')
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

function Hero() {
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
    }, 2250)
    return () => window.clearTimeout(timer)
  }, [incomingVideo])

  const resumeIncomingPlayback = event => {
    if (resumeTimeRef.current <= 0) return
    event.currentTarget.currentTime = resumeTimeRef.current
    resumeTimeRef.current = 0
  }

  const benefits = [
    ['ri-layout-grid-line', 'Premium courts', 'Indoor & outdoor courts'],
    ['ri-lock-2-line', 'Expert coaches', 'Certified for every level'],
    ['ri-calendar-check-line', 'Events & tournaments', 'Competitive play all year'],
    ['ri-ping-pong-line', 'Vibrant community', 'Play, connect and belong'],
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
      <span className="hero__index"><b>0{activeVideo + 1}</b><i /></span>
      <div>{HERO_VIDEOS.map((video, index) => <button type="button" className={(incomingVideo ?? activeVideo) === index ? 'is-active' : ''} onClick={() => startVideoTransition(index)} key={video.label} aria-label={`Play ${video.label}`} aria-pressed={(incomingVideo ?? activeVideo) === index}><video autoPlay muted loop playsInline preload="metadata"><source src={video.mobile} type="video/mp4" /></video><span /></button>)}</div>
      <p><strong>World-class facilities</strong><span>Indoor & outdoor courts<br />Built for champions</span></p>
    </div>
    <a className="hero__scroll-cue" href="#courts"><span>Scroll down</span><i><b /></i></a>
    <div className="hero__benefits">{benefits.map(([icon,title,copy]) => <div key={title}><i className={icon} /><p><strong>{title}</strong><small>{copy}</small></p></div>)}</div>
  </section>
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
    <div className="court-card__media"><div className="court-card__head"><b>0{index + 1}</b><i /><small>{court.name}</small><img src={icon} alt="" /></div><img className="court-card__photo" src={court.image} alt={`${court.name} players at Aurelis`} /></div>
    <div className="court-card__body"><div className="court-card__meta">{meta.reduce((items, item, metaIndex) => { if (metaIndex % 2 === 0) items.push(<span key={item}><img src={metaIcons[metaIndex / 2]} alt="" /><b>{item}</b><small>{meta[metaIndex + 1]}</small></span>); return items }, [])}</div><p className="court-card__price"><strong>{court.price}</strong><small>/ hour</small></p><a className="court-card__book" href="#contact"><span>Book now</span><img src={asset('icons/arrow-right.svg')} alt="" /></a></div>
  </motion.article>
}

function Courts() {
  const icons = [asset('icons/court-racket.svg'), asset('icons/court-ball.svg'), asset('icons/court-team.svg')]
  const courtMeta = [
    ['2–4', 'Players', 'All', 'Levels', '60', 'Minutes'],
    ['2–4', 'Players', 'All', 'Levels', '60', 'Minutes'],
    ['4', 'Players', 'All', 'Levels', '60', 'Minutes'],
  ]
  return <section className="section courts courts--light" id="courts"><div className="section-lead"><div className="courts__eyebrow"><small>Our courts</small><i /><span /></div><h2>Choose<br />your <em>game</em></h2><p>Top-quality courts, designed for champions. Book your court in just a few clicks.</p><Button href="#courts">View all courts</Button></div>
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
      <h2>Aurelis<br />club</h2><span className="club-overview__rule" aria-hidden="true" />
      <p>Premium courts, designed for performance.</p>
      <div className="club-overview__features">
        <article><img src={asset('icons/court-racket.svg')} alt="" /><div><strong>Premium facilities</strong><span>State-of-the-art courts and amenities for the best experience.</span></div></article>
        <article><img src={asset('icons/players.svg')} alt="" /><div><strong>Expert coaching</strong><span>Programs for every level. Train with the best.</span></div></article>
      </div>
      <a className="club-overview__cta" href="#contact"><span>Discover the club</span><Arrow /></a>
    </div>
    <div className="club-overview__showcase">
      <div className="club-overview__counter">[ <b>{String(displayedImage + 1).padStart(2, '0')}</b><i>/</i>{String(galleryImages.length).padStart(2, '0')} ]</div>
      <div className="club-accordion" onMouseLeave={() => setHoveredImage(null)}>
        {galleryImages.map((image, imageIndex) => {
          const expanded = displayedImage === imageIndex
          return <article key={image.src} className={`club-accordion__item${expanded ? ' is-expanded' : ''}`} tabIndex="0" onMouseEnter={() => setHoveredImage(imageIndex)} onFocus={() => setHoveredImage(imageIndex)} onBlur={() => setHoveredImage(null)} onClick={() => setActiveImage(imageIndex)}>
            <img src={asset(image.src)} alt={image.alt} /><div className="club-accordion__shade" aria-hidden="true" />
            <div className="club-accordion__copy"><small>{expanded ? 'Featured' : String(imageIndex + 1).padStart(2, '0')}</small><span>{image.kicker}</span><h3>{image.title}</h3>{expanded ? <p>{image.copy}</p> : <b aria-hidden="true">+</b>}</div>
          </article>
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
        return <motion.figure layout key={image.src} className={`experience__gallery-item is-${position}`} initial={false} animate={{ opacity: isWrapping && !reduceMotion ? [0, 0, .82] : isCenter ? 1 : .82 }} transition={{ layout: { duration: reduceMotion ? 0 : .72, ease: [.22, 1, .36, 1] }, opacity: { duration: reduceMotion ? 0 : .72, times: isWrapping ? [0, .72, 1] : undefined } }} onClick={() => showImageAtOffset(offset <= 3 ? offset : offset - galleryImages.length, imageIndex)}><img src={asset(image.src)} alt={image.alt} /><figcaption><small>{image.kicker}</small><strong>{image.title}</strong>{isCenter ? <span>{image.copy}</span> : null}</figcaption>{isCenter ? <div className="experience__counter"><b>{String(activeImage + 1).padStart(2, '0')}</b><i>/</i><span>{String(galleryImages.length).padStart(2, '0')}</span></div> : null}</motion.figure>
      })}
    </div><button className="experience__side-control experience__side-control--next" type="button" onClick={showNext} aria-label="Show next gallery image">→</button></div>
    <a className="button button--secondary experience__gallery-button" href="#contact"><span>Discover the club</span><Arrow /></a>
  </div></div></section>
}

function Academy() {
  const programIcons = ['ri-user-smile-line', 'ri-team-line', 'ri-star-line']
  const followAcademyGlow = event => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--glow-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--glow-y', `${event.clientY - bounds.top}px`)
  }
  return <section className="academy academy--showcase" id="academy">
    <motion.div className="academy__intro" initial={{ opacity: 0, x: -36 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .75 }}>
      <div className="academy__eyebrow"><small>Aurelis academy</small><i /></div>
      <h2>Train.<br />Improve.<br /><em>Achieve.</em></h2>
      <p>Programs and coaching designed to elevate your game to the next level.</p>
      <Button href="#contact">Discover academy</Button>
    </motion.div>
    <div className="academy-grid academy-grid--showcase">{academy.map((item, index) => <motion.article className="academy-card" key={item.name} onMouseMove={followAcademyGlow} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay: index * .12, ease: [.22, 1, .36, 1] }}>
      <div className="academy-card__media"><b>0{index + 1}</b><i /><img src={asset('aurelis-academy.png')} style={{ objectPosition: item.pos }} alt={item.name} /></div>
      <div className="academy-card__body"><i className={programIcons[index]} /><h3>{item.name}</h3><span /><p>{item.copy}</p><a href="#contact">Learn more <Arrow /></a></div>
    </motion.article>)}
      <motion.article className="academy-membership" onMouseMove={followAcademyGlow} initial={{ opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .7, delay: .36, ease: [.22, 1, .36, 1] }}>
        <div className="academy-membership__mark"><img src={asset('aurelis-mark.svg')} alt="Aurelis" /></div><h3>Academy<br />membership</h3><span />
        <ul><li><img src={asset('icons/duration.svg')} alt="" />More sessions.</li><li><img src={asset('icons/levels.svg')} alt="" />More benefits.</li><li><img src={asset('icons/players.svg')} alt="" />One community.</li></ul>
        <a href="#contact">Learn more <Arrow /></a>
      </motion.article>
    </div>
  </section>
}

function Events() {
  const eventSlugs = ['beginner-padel-evening', 'mixed-doubles-tournament', 'academy-open-day']
  const followEventCursor = event => {
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--event-x', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--event-y', `${event.clientY - bounds.top}px`)
  }
  return <section className="events" id="events"><div className="events__title"><small>Upcoming events</small><h2>Club<br />calendar</h2><a href="#events">View all events <Arrow /></a></div><div className="event-grid">{events.map((e, index) => <article key={e[0]} onPointerMove={followEventCursor}><a className="event-card__link" href={`${import.meta.env.BASE_URL}events/${eventSlugs[index]}`} aria-label={`Open ${e[3]}`} /><span className="event-card__cursor">Open</span><div><strong>{e[0]}</strong><span>{e[1]}</span><small>{e[2]}</small></div><h3>{e[3]}</h3><p>Discover the club together <Arrow /></p></article>)}</div><div className="stats"><strong>5+ <small>premium courts</small></strong><strong>20+ <small>pro coaches</small></strong><strong>50k+ <small>happy players</small></strong></div></section>
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
          <section className="phone-availability"><small>Court availability</small><div className="phone-times"><span>18:00</span><span>19:00</span><span>20:00</span><span>21:00</span><span>22:00</span></div>{[1,2,3].map(row => <div className="phone-slots" key={row}><b>Court {row}</b>{[0,1,2,3,4].map(slot => <i className={slot === 2 && row === 2 ? 'is-booked' : slot % 3 === 0 ? 'is-open' : ''} key={slot} />)}</div>)}</section>
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
  return <section className="faq" id="faq"><div className="faq__intro"><small>FAQ</small><h2>Frequently<br />asked <em>questions</em></h2><i aria-hidden="true" /><p>Everything you need to know about Aurelis Club.</p></div><div className="faq__list">{faqs.map(([q,a], i) => <article className={active === i ? 'is-open' : ''} key={q}><button onClick={() => setActive(active === i ? null : i)} aria-expanded={active === i}><span>{q}</span><b aria-hidden="true">{active === i ? '−' : '+'}</b></button>{active === i ? <motion.p initial={reduceMotion ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }}>{a}</motion.p> : null}</article>)}</div></section>
}

function Footer() {
  const groups = [['Clubs','Courts','Prices','Opening hours'],['Academy','Programs','Coaches','Membership'],['Experience','Facilities','Lounge & café','Gallery'],['About','Our story','Team','Careers']]
  return <footer id="contact"><div className="footer__main"><div className="footer__brand"><Brand /><span className="footer__brand-rule" aria-hidden="true" /><div className="footer__socials"><a href="#contact" aria-label="Instagram"><SocialIcon name="instagram" /></a><a href="#contact" aria-label="Facebook"><SocialIcon name="facebook" /></a><a href="#contact" aria-label="YouTube"><SocialIcon name="youtube" /></a><a href="#contact" aria-label="LinkedIn"><SocialIcon name="linkedin" /></a></div></div>{groups.map(group => <nav className="footer__column" aria-label={group[0]} key={group[0]}><b>{group[0]}</b>{group.slice(1).map(x => <a href="#home" key={x}>{x}</a>)}</nav>)}<address className="footer__column footer__contact"><b>Contact</b><span>123 Padel Avenue</span><span>68000 Colmar, France</span><a href="tel:+33612345678">+33 6 12 34 56 78</a><a href="mailto:hello@aurelisclub.com">hello@aurelisclub.com</a></address></div><div className="footer__bottom"><span>© 2026 Aurelis Padel Club.</span><span><a href="#contact">Privacy policy</a><i>·</i><a href="#contact">Terms &amp; conditions</a></span></div></footer>
}

function SponsorMarquee() {
  const sponsors = Array.from({ length: 8 })
  return <section className="sponsors" aria-label="Aurelis sponsors"><div className="sponsors__viewport"><div className="sponsors__track">{[0, 1].map(group => <div className="sponsors__group" aria-hidden={group === 1} key={group}>{sponsors.map((_, index) => <div className="sponsors__item" key={`${group}-${index}`}><img src={asset('aurelis-logo.svg')} alt={group === 0 && index === 0 ? 'Aurelis' : ''} /></div>)}</div>)}</div></div></section>
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
  return <div className="roof-intro" ref={root} style={{ '--roof-image': `url(${asset('aurelis-roof-intro.png')})` }} aria-label="Opening Aurelis court" aria-live="polite">
    <img className="roof-intro__preload" src={asset('aurelis-roof-intro.png')} alt="" onLoad={() => setReady(true)} />
    <div className="roof-intro__veil" />
    <div className="roof-intro__panel roof-intro__panel--left" />
    <div className="roof-intro__panel roof-intro__panel--right" />
    <div className="roof-intro__glow" />
    <div className="roof-intro__seam" />
    <button type="button" className="roof-intro__skip" onClick={() => setVisible(false)}>Skip intro</button>
  </div>
}

export default function App() { return <><CourtRoofIntro /><Hero /><main><Courts /><ExperienceEditorial /><Academy /><Events /><FAQ /><SponsorMarquee /></main><Footer /><FloatingActions /></> }
