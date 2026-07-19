import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ActionLink } from './ActionLink.jsx';
import { MeshHeroTitle } from './MeshHeroTitle.jsx';

export function Hero() {
  const reduceMotion = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="hero" id="home">
      <motion.div className="hero__image" aria-hidden="true" initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: reduceMotion ? 0 : 2.2, ease: [0.22, 1, 0.36, 1] }} />
      <div className="hero__shade" />
      <motion.div className="hero__content" variants={{ hidden: {}, visible: { transition: { delayChildren: .35, staggerChildren: .13 } } }} initial="hidden" animate="visible">
        <motion.p variants={reveal} transition={{ duration: .8 }} className="eyebrow">Belgium’s most exclusive padel club</motion.p>
        <motion.div variants={reveal} transition={{ duration: .95, ease: [0.22, 1, 0.36, 1] }}><MeshHeroTitle reduceMotion={reduceMotion} /></motion.div>
        <motion.p variants={reveal} transition={{ duration: .8 }}>Where sport meets luxury.<br />Community. Performance. Excellence.</motion.p>
        <motion.div variants={reveal}><ActionLink href="#courts">Book a court</ActionLink></motion.div>
      </motion.div>
      <motion.a className="hero__book" href="#contact" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: .7 }}><span>Book<br />a court</span><i className="ri-arrow-right-up-line" /></motion.a>
      <motion.a className="scroll-cue" href="#club" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.35 }}><motion.span animate={reduceMotion ? {} : { scale: [1, 1.12, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />Scroll to<br />explore</motion.a>
    </section>
  );
}
