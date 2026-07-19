import React from 'react';
import { ActionLink } from './ActionLink.jsx';

const galleryItems = [
  { src: `${import.meta.env.BASE_URL}aurelis-hero-branded.png`, label: 'The clubhouse', meta: 'Architecture · Exterior', className: 'gallery__item--hero' },
  { src: `${import.meta.env.BASE_URL}aurelis-lounge.png`, label: 'After the match', meta: 'Clubhouse · Lounge', className: 'gallery__item--lounge' },
  { src: `${import.meta.env.BASE_URL}aurelis-court-branded.png`, label: 'Centre court', meta: 'Courts · Night play', className: 'gallery__item--court' },
  { src: `${import.meta.env.BASE_URL}aurelis-community.png`, label: 'Together at Aurelis', meta: 'Community · Evenings', className: 'gallery__item--community' },
  { src: `${import.meta.env.BASE_URL}aurelis-closing-ball.png`, label: 'Made for the game', meta: 'Aurelis · Details', className: 'gallery__item--detail' },
];

export function Gallery() {
  return (
    <section className="gallery" id="gallery">
      <header className="gallery__header" data-reveal>
        <div>
          <p className="eyebrow">Inside Aurelis</p>
          <h2>A glimpse beyond<br />the game.</h2>
        </div>
        <div className="gallery__header-side">
          <p>Courts, architecture and the moments that make Aurelis more than a place to play.</p>
          <ActionLink href="#gallery">View all photos</ActionLink>
        </div>
      </header>
      <div className="gallery__grid">
        {galleryItems.map((item, index) => (
          <figure className={`gallery__item ${item.className}`} key={item.label} data-reveal>
            <img src={item.src} alt={item.label} loading="lazy" />
            <figcaption>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><strong>{item.label}</strong><small>{item.meta}</small></div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
