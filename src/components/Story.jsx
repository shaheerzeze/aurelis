import React from 'react';
import { features } from '../content.js';
import { ActionLink } from './ActionLink.jsx';
import { SectionIntro } from './SectionIntro.jsx';

export function Story() {
  return (
    <section className="story" id="club">
      <div className="story-row story-row--club">
        <div className="story__club visual-panel" data-parallax />
        <div className="story__club-copy">
          <SectionIntro number="01" eyebrow="The club" title={<>A new standard<br />of padel</>}>
            <p>Aurelis is not just a club. It’s a destination for those who live and breathe the game. Built for champions. Designed for everyone.</p>
            <ActionLink>Discover more</ActionLink>
          </SectionIntro>
        </div>
      </div>
      <div className="story-row story-row--court" id="courts">
        <div className="story__court-copy">
          <SectionIntro number="02" eyebrow="The courts" title={<>Engineered<br />for perfection</>}>
            <p>World-class panoramic courts with the perfect blend of design, quality and technology. Day or night. Rain or shine. The game never stops.</p>
            <ActionLink>Explore courts</ActionLink>
          </SectionIntro>
        </div>
        <div className="story__court visual-panel" />
      </div>
      <div className="technology" id="technology">
        <SectionIntro number="03" eyebrow="Technology" title={<>Smart. Seamless.<br />Effortless.</>}>
          <p>Self check-in. 24/7 access. Equipment rental. AI damage detection. Everything you need, in one powerful system.</p>
          <ActionLink>See how it works</ActionLink>
        </SectionIntro>
        <div className="phone" data-phone>
          <div className="phone__island" />
          <div className="phone__screen">
            <img className="phone__screen-image" src={`${import.meta.env.BASE_URL}aurelis-app-dashboard.png`} alt="Aurelis member app home dashboard" />
          </div>
        </div>
        <div className="feature-list">
          {features.map((feature) => <article key={feature.title} data-reveal><i className={feature.icon} /><div><h3>{feature.title}</h3><p>{feature.copy}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
