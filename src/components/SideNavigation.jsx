import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { navigation } from '../content.js';
import { BrandMark } from './BrandMark.jsx';

export function SideNavigation() {
  const [active, setActive] = useState('home');
  const [indicatorY, setIndicatorY] = useState(0);
  const reduceMotion = useReducedMotion();
  const navRef = useRef(null);
  const linkRefs = useRef(new Map());

  useEffect(() => {
    const ids = navigation.map((item) => item.toLowerCase());
    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * .42;
      let current = ids[0];
      let bestTop = -Infinity;
      ids.forEach((id) => {
        const section = document.getElementById(id);
        const top = section ? section.getBoundingClientRect().top + window.scrollY : Infinity;
        if (top <= marker && top > bestTop) {
          bestTop = top;
          current = id;
        }
      });
      setActive(current);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, []);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const link = linkRefs.current.get(active);
      if (link) setIndicatorY(link.offsetTop + link.offsetHeight / 2 - 2.5);
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  return (
    <aside className="side-nav" aria-label="Primary navigation">
      <BrandMark />
      <nav ref={navRef}>
        <motion.span
          className="side-nav__active-indicator"
          initial={false}
          animate={{ y: indicatorY }}
          transition={reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 135, damping: 24, mass: .9 }}
          aria-hidden="true"
        />
        {navigation.map((item) => {
          const id = item.toLowerCase();
          const isActive = active === id;

          return (
            <a ref={(node) => node ? linkRefs.current.set(id, node) : linkRefs.current.delete(id)} className={isActive ? 'is-active' : ''} href={`#${id}`} onClick={() => setActive(id)} key={item}>
              <span className="side-nav__label">{item}</span>
            </a>
          );
        })}
      </nav>
      <div className="side-nav__socials">
        <a href="#contact" aria-label="Member access"><i className="ri-lock-2-line" /></a>
        <a href="#community" aria-label="Instagram"><i className="ri-instagram-line" /></a>
        <a href="#community" aria-label="YouTube"><i className="ri-youtube-line" /></a>
      </div>
    </aside>
  );
}
