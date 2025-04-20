import React from 'react';
import '../App.css';

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img src="img/author.png" alt="Thoughtful person reading" className="about-image" />
      </section>

      <section className="about-content">
        <h1>About Wexley & Thorne</h1>
        <h3>"Literature built to last."</h3>
        <p>
          Wexley & Thorne Press is an independent publishing house focused on thoughtful, enduring literature.
          We work closely with authors to publish books that are sharp, resonant, and carefully made — stories that hold up over time and invite return.
        </p>
        <p>
          Our catalog spans fiction, nonfiction, and hybrid work, with an emphasis on strong voice and clear intent.
          We believe in good editing, good design, and the long arc of a well-told story.
        </p>
      </section>
    </div>
  );
}

export default About;
