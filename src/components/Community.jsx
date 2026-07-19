import React from 'react';
import { communityCards } from '../content.js';
import { ActionLink } from './ActionLink.jsx';
import { SectionIntro } from './SectionIntro.jsx';

export function Community() {
  return (
    <section className="community" id="community">
      <SectionIntro number="04" eyebrow="Community" title={<>Beyond the court.<br />Built for belonging.</>}>
        <p>Players become partners. Matches become rituals. This is the social side of Aurelis.</p>
        <ActionLink>Enter the community</ActionLink>
      </SectionIntro>
      <div className="community__scene">
        <div className="community__cards">
          {communityCards.map((card, index) => (
            <article key={card.title} data-reveal data-community-card>
              <div className="reference-slice" style={{ '--slice-position': card.position, '--slice-index': index }} />
              <div className="community__scan" aria-hidden="true" />
              <span className="community__card-index">0{index + 1}</span>
              <div className="community__card-copy"><h3>{card.title}</h3><p>{card.copy}</p><i className="ri-arrow-right-up-line" /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
