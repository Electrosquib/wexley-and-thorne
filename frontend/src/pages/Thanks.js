import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Thanks() {
  const [books, setBooks] = useState([]);
  const [code, setCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [error, setError] = useState('');

  const VALID_CODES = ['WTNEWCOMER'];

  useEffect(() => {
    axios.get('https://api.wexleyandthorne.com/api/books/')
      .then(response => setBooks(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (VALID_CODES.includes(code.trim().toUpperCase())) {
      setIsCodeValid(true);
      setError('');
    } else {
      setIsCodeValid(false);
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <div className="books-page">
      <br />
      <h1>Claim Your Free Book</h1>
      <p>Enter your download code to access one of our featured titles.</p>

      <form className="book-controls" onSubmit={handleSubmit}>
        <input
          type="text"
          className="book-search"
          placeholder="Enter code here..."
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button className="primary-btn" type="submit">Submit Code</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {isCodeValid && (
        <div className="book-grid">
          {books.map(book => (
            <div className="book-card" key={book.id}>
              <img src={book.cover} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="rating">
                <span className="star">★</span> {book.rating} • {book.reviews.toLocaleString()} reviews
              </p>
              <a
                className="primary-btn"
                href={book.download_link || '#'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Thanks;
