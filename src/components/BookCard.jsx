import { useAuth } from "../context/AuthContext";
import { baseAPI } from "../api/axios";

export default function BookCard({ book }) {
  const { user } = useAuth();

  const addToMyBooks = async () => {
    if (!user) return alert("Please log in to add books");
    try {
      await baseAPI.post(`/mybooks/${book._id}`);
      alert("Added to My Books");
    } catch (e) {
      alert(e?.response?.data?.message || "Already added / error");
    }
  };

  return (
    <div className="border rounded p-3">
      <img src={book.coverImage} alt={book.title} className="w-full aspect-square object-cover mb-2" />
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm opacity-75">{book.author}</p>
      <button onClick={addToMyBooks} className="mt-2 px-3 py-1 border rounded">
        Want to Read
      </button>
    </div>
  );
}
