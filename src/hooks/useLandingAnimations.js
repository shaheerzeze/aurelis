import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useLandingAnimations() {
  const scope = useRef(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    const compactMotion = window.matchMedia('(max-width: 900px), (pointer: coarse)').matches;
    ScrollTrigger.config({ ignoreMobileResize: true });

    gsap.utils.toArray('[data-reveal]').forEach((element) => {
      gsap.from(element, { autoAlpha: 0, y: compactMotion ? 22 : 44, scale: compactMotion ? 1 : .985, duration: compactMotion ? .65 : 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 90%', toggleActions: 'play none none none', once: true } });
    });

    gsap.utils.toArray('.section-intro').forEach((intro) => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power4.out' },
        scrollTrigger: { trigger: intro, start: 'top 86%', toggleActions: 'play none none none', once: true },
      });
      timeline
        .from(intro.querySelector('.section-intro__index'), { autoAlpha: 0, x: -18, duration: .65 })
        .from(intro.querySelector('h2'), { autoAlpha: 0, yPercent: compactMotion ? 18 : 38, rotationX: compactMotion ? 0 : -10, transformOrigin: '50% 100%', duration: compactMotion ? .7 : 1 }, '<.08')
        .from(intro.querySelector('.section-intro__copy'), { autoAlpha: 0, y: 20, duration: .75 }, '<.22');
    });

    if (!compactMotion) {
      gsap.to('.hero__image', {
      yPercent: 10,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    });

    gsap.utils.toArray('[data-parallax]').forEach((element, index) => {
      const travel = index % 2 === 0 ? 8 : 6;
      gsap.fromTo(element, { yPercent: -travel, scale: 1.035 }, { yPercent: travel, scale: 1.035, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.9 } });
    });

    gsap.utils.toArray('.story-row .section-intro').forEach((element, index) => {
      gsap.fromTo(element, { y: index % 2 ? 24 : 38 }, { y: index % 2 ? -24 : -38, ease: 'none', scrollTrigger: { trigger: element.closest('.story-row'), start: 'top bottom', end: 'bottom top', scrub: 1.1 } });
    });

    gsap.to('[data-phone]', { rotate: 2.5, y: -42, ease: 'none', scrollTrigger: { trigger: '.technology', start: 'top bottom', end: 'bottom top', scrub: 0.85 } });
    gsap.to('.phone__screen-image', { yPercent: -1.5, scale: 1.035, duration: 4.8, ease: 'sine.inOut', repeat: -1, yoyo: true });

    gsap.fromTo('[data-closing-art]', { xPercent: -3, scale: 1.08 }, { xPercent: 3, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.closing', start: 'top bottom', end: 'bottom top', scrub: 1 } });

      gsap.utils.toArray('.community__cards .reference-slice').forEach((element, index) => {
        gsap.fromTo(element, { yPercent: -7, scale: 1.12 }, { yPercent: 7, scale: 1.12, ease: 'none', scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 + index * 0.12 } });
      });
    }

    const communityCleanups = [];
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      gsap.utils.toArray('[data-community-card]').forEach((card) => {
        const rotateX = gsap.quickTo(card, 'rotationX', { duration: .75, ease: 'power3.out' });
        const rotateY = gsap.quickTo(card, 'rotationY', { duration: .75, ease: 'power3.out' });
        const imageX = gsap.quickTo(card.querySelector('.reference-slice'), 'xPercent', { duration: .9, ease: 'power3.out' });
        const imageY = gsap.quickTo(card.querySelector('.reference-slice'), 'yPercent', { duration: .9, ease: 'power3.out' });
        const onMove = (event) => {
          const box = card.getBoundingClientRect();
          const px = (event.clientX - box.left) / box.width - .5;
          const py = (event.clientY - box.top) / box.height - .5;
          rotateY(px * 13); rotateX(py * -11); imageX(px * -5); imageY(py * -4);
          card.style.setProperty('--pointer-x', `${(px + .5) * 100}%`);
          card.style.setProperty('--pointer-y', `${(py + .5) * 100}%`);
        };
        const onLeave = () => { rotateX(0); rotateY(0); imageX(0); imageY(0); };
        card.addEventListener('pointermove', onMove);
        card.addEventListener('pointerleave', onLeave);
        communityCleanups.push(() => { card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerleave', onLeave); });
      });
    }

    gsap.utils.toArray('.gallery__item').forEach((card, index) => {
      gsap.fromTo(card,
        { y: 54 + index * 8, rotation: index % 2 ? 1.2 : -1.2, scale: .96 },
        { y: 0, rotation: 0, scale: 1, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none', once: true } },
      );
      if (!compactMotion) {
        gsap.fromTo(card.querySelector('img'),
          { yPercent: -4, scale: 1.08 },
          { yPercent: 4, scale: 1.08, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: .9 } },
        );
      }
    });

    const interactive = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const buttonCleanups = [];
    if (interactive) {
      gsap.utils.toArray('.action, .hero__book, .plan-action, .side-nav__socials a').forEach((button) => {
        const moveX = gsap.quickTo(button, 'x', { duration: .55, ease: 'power3.out' });
        const moveY = gsap.quickTo(button, 'y', { duration: .55, ease: 'power3.out' });
        const icon = button.querySelector('i');
        const arrowX = icon ? gsap.quickTo(icon, 'x', { duration: .35, ease: 'power3.out' }) : null;
        const onMove = (event) => {
          const bounds = button.getBoundingClientRect();
          moveX((event.clientX - bounds.left - bounds.width / 2) * .14);
          moveY((event.clientY - bounds.top - bounds.height / 2) * .22);
          arrowX?.(7);
        };
        const onLeave = () => { moveX(0); moveY(0); arrowX?.(0); };
        button.addEventListener('pointermove', onMove);
        button.addEventListener('pointerleave', onLeave);
        buttonCleanups.push(() => {
          button.removeEventListener('pointermove', onMove);
          button.removeEventListener('pointerleave', onLeave);
        });
      });
    }
    if (!compactMotion) {
      gsap.utils.toArray('[data-float]').forEach((element, index) => {
        gsap.to(element, { y: index % 2 ? 10 : -12, rotation: index % 2 ? .5 : -.5, duration: 3.8 + index * .35, ease: 'sine.inOut', repeat: -1, yoyo: true });
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    requestAnimationFrame(refresh);
    return () => {
      window.removeEventListener('load', refresh);
      buttonCleanups.forEach((cleanup) => cleanup());
      communityCleanups.forEach((cleanup) => cleanup());
    };
  }, { scope });

  return scope;
}
