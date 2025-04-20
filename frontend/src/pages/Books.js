import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('rating');

  useEffect(() => {
    axios.get('/api/books/')
      .then(response => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    let filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'reviews') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, sortOption, books]);

  return (
    <div className="books-page">
      <br></br>
      <h1>Our Books</h1>

      <div className="book-controls">
        <input
          type="text"
          className="book-search"
          placeholder="Search titles..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <select
          className="book-sort"
          onChange={e => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value="rating">Sort by Rating</option>
          <option value="reviews">Sort by Reviews</option>
        </select>
      </div>


      <div className="book-grid">
        {filteredBooks.map(book => (
          <div className="book-card" key={book.id}>
            <img src={book.cover} alt={book.title} />
            <h3>{book.title}</h3>
            <p className="rating">
              <span className="star">★</span> {book.rating} • {book.reviews.toLocaleString()} reviews
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
