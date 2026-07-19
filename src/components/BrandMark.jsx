import React from 'react';

export function BrandMark({ compact = false }) {
  return (
    <a className={`brand ${compact ? 'brand--compact' : ''}`} href="#home" aria-label="Aurelis home">
      <img className="brand__image" src={`${import.meta.env.BASE_URL}aurelis-logo.svg`} alt="Aurelis Padel Club" />
    </a>
  );
}
