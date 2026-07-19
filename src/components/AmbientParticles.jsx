import React from 'react';

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  x: (index * 47 + 13) % 100,
  y: (index * 73 + 19) % 100,
  delay: (index % 8) * -.7,
  duration: 7 + (index % 6) * 1.25,
  size: 1 + (index % 3),
}));

export function AmbientParticles() {
  return <div className="ambient-particles" aria-hidden="true">{particles.map((particle) => <span key={particle.id} style={{ '--x': `${particle.x}%`, '--y': `${particle.y}%`, '--delay': `${particle.delay}s`, '--duration': `${particle.duration}s`, '--size': `${particle.size}px` }} />)}</div>;
}
