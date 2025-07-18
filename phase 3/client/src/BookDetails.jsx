import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}`);
    const data = await res.json();
    setBook(data);
  };

  const handleRatingSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'replace_with_user_id', value: Number(rating) })
    });
    if (res.ok) {
      fetchBookDetails();
      setRating('');
    }
  };

  const handleLike = async () => {
    await fetch(`http://localhost:5000/api/recommendations/${id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'replace_with_user_id' })
    });
    fetchBookDetails();
  };

  const handleCommentSubmit = async e => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/recommendations/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'replace_with_user_id', text: comment })
    });
    fetchBookDetails();
    setComment('');
  };

  if (!book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p className="text-lg mb-2">Author: {book.author}</p>
      <p className="mb-4">{book.description}</p>
      <p className="mb-2">Average Rating: {book.rating ? book.rating.toFixed(1) : 'No rating'}</p>
      <button onClick={handleLike} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Like ({book.likes.length})</button>

      <form onSubmit={handleRatingSubmit} className="mb-4">
        <input type="number" placeholder="Rate 1-5" value={rating} onChange={e => setRating(e.target.value)} min="1" max="5" className="border p-2 rounded w-full mb-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit Rating</button>
      </form>

      <form onSubmit={handleCommentSubmit}>
        <textarea placeholder="Add a comment" value={comment} onChange={e => setComment(e.target.value)} className="border p-2 rounded w-full mb-2" required />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">Submit Comment</button>
      </form>

      <h3 className="text-xl font-semibold mt-4">Comments</h3>
      {book.comments.map((c, i) => (
        <p key={i} className="border-b py-2">{c.text}</p>
      ))}
    </div>
  );
}

export default BookDetails;
