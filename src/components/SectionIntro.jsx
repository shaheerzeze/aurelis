import React from 'react';
import { motion } from 'framer-motion';

export function SectionIntro({ number, eyebrow, title, children, align = 'left' }) {
  return (
    <motion.div className={`section-intro section-intro--${align}`} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .85, ease: [0.22, 1, 0.36, 1] }}>
      <div className="section-intro__index">{number}<span>{eyebrow}</span></div>
      <h2>{title}</h2>
      <div className="section-intro__copy">{children}</div>
    </motion.div>
  );
}
