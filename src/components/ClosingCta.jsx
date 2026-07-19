import React from 'react';
import { ActionLink } from './ActionLink.jsx';

const mapUrl = 'https://maps.app.goo.gl/Hh2573hCdWhvpvaB6';

export function ClosingCta() {
  return (
    <>
      <section className="closing" id="contact">
        <div className="closing__art" data-closing-art aria-hidden="true" />
        <div className="closing__panel">
          <div className="closing__copy" data-reveal>
            <img className="closing__brand" src={`${import.meta.env.BASE_URL}aurelis-logo.svg`} alt="Aurelis Padel Club" />
            <h2>This is your game.<br />This is your club.<br />This is <em>Aurelis.</em></h2>
            <div className="closing__actions"><ActionLink solid>Book a court</ActionLink><ActionLink>Become a member</ActionLink></div>
          </div>
          <a className="closing__location" href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open Aurelis Padel Club location in Google Maps">
            <img src={`${import.meta.env.BASE_URL}aurelis-location-map.png`} alt="Map showing Aurelis Padel Club near Piscine Den Nordpool and Colmar Park" />
            <span><small>Find the club</small><strong>Colmar Park</strong><em>Piscine - Den Nordpool</em></span>
            <i className="ri-arrow-right-up-line" />
          </a>
        </div>
      </section>
      <footer><span>© 2026 Aurelis Padel Club. All rights reserved.</span><a href="#home">Privacy Policy</a><a href="#home">Terms &amp; Conditions</a><span>Follow us</span><div><i className="ri-instagram-line" /><i className="ri-youtube-line" /><i className="ri-linkedin-line" /></div><span>EN <i className="ri-arrow-down-s-line" /></span></footer>
    </>
  );
}
