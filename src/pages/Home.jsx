import { useEffect, useState } from "react";
import { baseAPI } from "../api/axios";
import BookCard from "../components/BookCard";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    baseAPI.get("/books")
      .then(res => setBooks(res.data)) // res.data is the array
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  if (!books.length) return <p>No books available...</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {books.map(b => (
        <BookCard key={b._id} book={b} />
      ))}
    </div>
  );
}
