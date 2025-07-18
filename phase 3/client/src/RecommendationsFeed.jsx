import React, { useEffect, useState } from 'react';

function RecommendationsFeed({ userId }) {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    const res = await fetch(`http://localhost:5000/api/recommendations/recommendations/personalized/${userId}`);
    const data = await res.json();
    setRecommendedBooks(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedBooks.map(book => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h4 className="font-bold">{book.title}</h4>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p className="text-yellow-600">Rating: {book.rating ? book.rating.toFixed(1) : 'No rating'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationsFeed;
