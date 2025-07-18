import React, { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [likedBooks, setLikedBooks] = useState([]);

  useEffect(() => {
    fetchLikedBooks();
  }, []);

  const fetchLikedBooks = async () => {
    const res = await fetch(`http://localhost:5000/api/recommendations`);
    const data = await res.json();
    const liked = data.filter(book => book.likes.includes(userId));
    setLikedBooks(liked);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <h3 className="text-xl font-semibold mb-2">Liked Books</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {likedBooks.map(book => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h4 className="font-bold">{book.title}</h4>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
