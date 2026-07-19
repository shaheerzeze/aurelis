import React from 'react';
import { memberships } from '../content.js';
import { SectionIntro } from './SectionIntro.jsx';

export function Membership() {
  return (
    <section className="membership" id="membership">
      <SectionIntro number="05" eyebrow="Membership" title={<>Choose your<br />experience</>}><p>Flexible membership designed around your lifestyle.</p></SectionIntro>
      <div className="pricing-grid">
        {memberships.map((plan) => (
          <article className={plan.featured ? 'is-featured' : ''} key={plan.name} data-reveal>
            {plan.featured && <span className="pricing-grid__badge">Most popular</span>}
            <h3>{plan.name}</h3><p>{plan.note}</p><div className="price">{plan.price}<span>/ month</span></div>
            <ul>{plan.perks.map((perk) => <li key={perk}>{perk}</li>)}</ul>
            <a className="plan-action" href="#contact"><span>Join now</span><i className="ri-arrow-right-line" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
