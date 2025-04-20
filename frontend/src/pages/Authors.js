import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import axios from 'axios';
import '../App.css';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    axios.get('https://api.wexleyandthorne.com/api/authors/')
      .then(response => {
        setAuthors(response.data);
        setSelectedAuthor(response.data[0]);
      })
      .catch(error => console.log(error));
  }, []);

  const handleAuthorClick = (authorId) => {
    axios.get(`https://api.wexleyandthorne.com/api/authors/${authorId}/`)
      .then(response => setSelectedAuthor(response.data))
      .catch(error => console.log(error));
  };

  return (
    <div className="root">
      <div className="hero">
        <div className="author-bar">
          {authors.map(author => (
            <div
              key={author.id}
              className={`author ${selectedAuthor?.id === author.id ? 'active' : ''}`}
              onClick={() => handleAuthorClick(author.id)}
            >
              <img className="author-pic-small" src={author.photo} width="60" alt={author.name} />
              <p>{author.name.split(' ')[0]}<br />{author.name.split(' ')[1]}</p>
            </div>
          ))}
          <div className="arrow"><i className="fa-solid fa-arrow-right"></i></div>
        </div>

        {selectedAuthor && (
          <div className="main-content">
            <img className="author-pic" src={selectedAuthor.photo} alt={selectedAuthor.name} />
            <div className="hero-text">
              <div className="hero-text-bar">
                <h1 className="writing">{selectedAuthor.name}</h1>
                <p>{selectedAuthor.bio}</p>
              </div>

              <div className="books">
                {selectedAuthor.books.map(book => (
                  <NavLink to={book.url} target="_blank" key={book.id} className="book">
                    <img src={book.cover} alt={book.title} />
                    <div>
                      <p>{book.title}</p>
                      <p className="rating">
                        <span className="star">★</span> {book.rating} • {book.reviews.toLocaleString()} Reviews
                      </p>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Authors;
