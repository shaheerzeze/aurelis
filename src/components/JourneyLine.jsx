import React from 'react';

const route = 'M-35 28 C190 -22 455 -4 625 45 C805 98 742 274 540 425 C400 530 342 648 418 762 C500 885 760 918 716 1065 C674 1208 310 1180 92 1292 C-94 1388 -18 1538 274 1632 C510 1708 735 1715 960 1810 C1100 1870 1060 2045 820 2110 C550 2182 180 2110 5 2260 C-105 2355 18 2470 310 2520';

export function JourneyLine() {
  return (
    <svg className="journey-line" viewBox="0 0 920 2540" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="routeGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8c6b21" />
          <stop offset=".34" stopColor="#f5d778" />
          <stop offset=".62" stopColor="#a97d22" />
          <stop offset="1" stopColor="#f0c85e" />
        </linearGradient>
        <radialGradient id="ballGold" cx="38%" cy="32%">
          <stop offset="0" stopColor="#fff4b3" />
          <stop offset=".42" stopColor="#f1cf67" />
          <stop offset="1" stopColor="#9b6918" />
        </radialGradient>
        <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="ballGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="8" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <path className="journey-line__aura" d={route} />
      <path className="journey-line__body" d={route} />
      <path className="journey-line__light" data-journey-path d={route} />
      <path className="journey-line__accent" d={route} />
      <g data-journey-ball filter="url(#ballGlow)">
        <circle r="16" fill="url(#ballGold)" />
        <path d="M-11-5C-2-1 3-10 11-5M-13 3C-3 7 4-2 13 3M-8 11C0 5 5 12 9 8" fill="none" stroke="#fff1a6" strokeWidth="1" opacity=".48" />
      </g>
    </svg>
  );
}
