import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function LoadingExperience({ onComplete }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lightweight] = useState(() => reduceMotion || window.matchMedia('(max-width: 900px), (pointer: coarse)').matches);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const openTimer = window.setTimeout(() => setOpen(true), lightweight ? 120 : 700);
    const doneTimer = window.setTimeout(onComplete, lightweight ? 700 : 1800);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete, lightweight]);

  const panelTransition = { duration: lightweight ? .5 : .9, ease: [0.76, 0, 0.24, 1] };

  return (
    <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} aria-label="Opening Aurelis">
      <motion.div className="loader__seam" aria-hidden="true" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: .35 }}>
        <motion.span className="loader__seam-line loader__seam-line--top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: lightweight ? .25 : .65, ease: [0.76, 0, 0.24, 1] }} />
        <motion.span className="loader__seam-line loader__seam-line--bottom" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: lightweight ? .25 : .65, ease: [0.76, 0, 0.24, 1] }} />
      </motion.div>
      <div className="loader__roof" aria-hidden="true">
        <motion.div className="loader__panel loader__panel--left" animate={open ? { x: '-50.5vw', scaleX: .96 } : { x: 0, scaleX: 1 }} transition={panelTransition} />
        <motion.div className="loader__panel loader__panel--right" animate={open ? { x: '50.5vw', scaleX: .96 } : { x: 0, scaleX: 1 }} transition={panelTransition} />
      </div>
    </motion.div>
  );
}
