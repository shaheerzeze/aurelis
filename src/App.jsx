import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ClosingCta } from './components/ClosingCta.jsx';
import { Community } from './components/Community.jsx';
import { Hero } from './components/Hero.jsx';
import { Membership } from './components/Membership.jsx';
import { SideNavigation } from './components/SideNavigation.jsx';
import { Story } from './components/Story.jsx';
import { LoadingExperience } from './components/LoadingExperience.jsx';
import { useLandingAnimations } from './hooks/useLandingAnimations.js';
import { AmbientParticles } from './components/AmbientParticles.jsx';
import { Gallery } from './components/Gallery.jsx';

export default function App() {
  const scope = useLandingAnimations();
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading || !window.location.hash) return undefined;
    const restoreHash = window.setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    }, 520);
    return () => window.clearTimeout(restoreHash);
  }, [loading]);

  return <><AnimatePresence>{loading && <LoadingExperience key="loader" onComplete={finishLoading} />}</AnimatePresence><div className="site" ref={scope}><AmbientParticles /><SideNavigation /><main><Hero /><Story /><Community /><Gallery /><Membership /><ClosingCta /></main></div></>;
}
