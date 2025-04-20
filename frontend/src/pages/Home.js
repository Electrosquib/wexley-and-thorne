import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Home.css';
import '../App.css';


function Home() {
  const [fadeOut, setFadeOut] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
  
    fetch('https://api.wexleyandthorne.com/api/subscribe/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate("/thank-you");
        } else {
          alert('Something went wrong!');
        }
      });
  };
  
  
  useEffect(() => {
    axios.get('https://api.wexleyandthorne.com/api/authors/')
      .then(response => {
        setAuthors(response.data.slice(0, 3));
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    const video = document.getElementById('intro-video');
    const box = document.getElementById('animated-box');

    if (video && box) {
      video.playbackRate = 2.0;
      const handleTimeUpdate = () => {
        if (video.duration - video.currentTime <= 2 && !fadeOut) {
          setFadeOut(true);
        }
      };

      const handleEnded = () => {
        box.classList.add('animate-in');
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [fadeOut]);

  useEffect(() => {
    axios.get('https://api.wexleyandthorne.com/api/books/')
      .then(response => {
        const sortedBooks = response.data.sort((a, b) => b.rating - a.rating).slice(0, 8);
        setBooks(sortedBooks);
      })
      .catch(error => console.log(error));
  }, []);
  return (
    <div className="root">
      <div className="hero">
        <div className="hero-stuff">
          <p>Welcome to</p>
          <h1>Wexley & Thorne</h1>

          <video
            id="intro-video"
            autoPlay
            muted
            playsInline
            className={`bg-video ${fadeOut ? 'fade-out' : ''}`}
          >
            <source src="img/book_bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="scroll-down" onClick={() => {
            const next = document.getElementById('about');
            next?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="arrow">&#8595;</span>
          </div>

          <div id="animated-box" className="box">
            A modern publishing house dedicated to bold voices and timeless storytelling. We craft beautiful books that inspire, provoke, and leave a lasting mark on the literary world.
            <div className="horiz-btns">
              <div className="secondary-btn" onClick={() => {
                const next = document.getElementById('newsletter');
                next?.scrollIntoView({ behavior: 'smooth' });
              }}><div>Claim your free book</div></div>
              <NavLink to="/about" className="primary-btn">Learn More</NavLink>
            </div>
          </div>
          
        </div>
      </div>
      <div id="about">
        <div>
          <h2>About Us</h2>
          <h3>"Literature built to last"</h3>
          <p>Wexley & Thorne Press is an independent publishing house focused on thoughtful, enduring literature.
          We work closely with authors to publish books that are sharp, resonant, and carefully made — stories that hold up over time and invite return.
          Our catalog spans fiction, nonfiction, and hybrid work, with an emphasis on strong voice and clear intent.
          We believe in good editing, good design, and the long arc of a well-told story.
          </p>
        </div>
        <img src="img/typewriter.png" alt="a man at a typewriter."></img>
      </div>
      <div id="popular-books" className="next-section">
        <h2>Popular Books</h2>
        <div className="hero-books">
          {
            books.map(book => (
              <NavLink to={book.url} target="_blank" className="book" key={book.id}>
                <img src={book.cover} alt='book cover'></img>
                <div>
                  <h3>{book.title}</h3>
                  <p className="rating">
                    <span className="star">★</span> {book.rating} • {book.reviews.toLocaleString()} Reviews
                  </p>
                </div>
                
              </NavLink>
            ))
          }
        </div>
        <NavLink to='/books' className='primary-btn'>See More</NavLink>
      </div>
      <div id="authors">
        <h2>Featured Authors</h2>
        <div className="authors-row">
          {authors.map(author => (
            <div key={author.id}>
              <img src={author.photo} alt={author.name}></img>
              <h3>{author.name}</h3>
              <p>{author.bio}</p>
            </div>
          ))}
        </div>
        <NavLink to='/authors' className='primary-btn'>View More</NavLink>
      </div>
      <section className="newsletter-section" id="newsletter">
        <div className="newsletter-content">
          <h2>Claim Your Free Book</h2>
          <p>Sign up for our mailing list to receive a free eBook of your choice and updates on new releases.</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Your email address" required />
            <button className="primary-btn" type="submit">Join the List</button>
          </form>

        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-logo">
          <img src="/img/logo.svg" alt="Wexley and Thorne Logo" />
          <p>Wexley & Thorne Press</p>
        </div>

        <div className="footer-nav">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/authors">Authors</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} Wexley & Thorne Press. All rights reserved.</p>
      </footer>
      <div onClick={() => {
                const next = document.getElementById('newsletter');
                next?.scrollIntoView({ behavior: 'smooth' });
              }} className="gift-float" title="Claim your free book">
        <i className="fas fa-gift"></i>
      </div>
    </div>
  );
}

export default Home;
