import { baseAPI } from "../api/axios";

const statuses = ["Want to Read","Currently Reading","Read"];

export default function MyBookCard({ item, onChanged }) {
  const { bookId: book } = item;

  const updateStatus = async (e) => {
    await baseAPI.patch(`/mybooks/${book._id}/status`, { status: e.target.value });
    onChanged();
  };

  const updateRating = async (val) => {
    await baseAPI.patch(`/mybooks/${book._id}/rating`, { rating: val });
    onChanged();
  };

  return (
    <div className="border rounded p-3">
      <img src={book.coverImage} alt={book.title} className="w-full aspect-square object-cover mb-2" />
      <h3 className="font-semibold">{book.title}</h3>
      <p className="text-sm opacity-75">{book.author}</p>

      <div className="mt-2">
        <label className="text-sm mr-2">Status:</label>
        <select value={item.status} onChange={updateStatus} className="border px-2 py-1 rounded">
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-2">
        <label className="text-sm mr-2">Rating:</label>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => updateRating(n)}
            aria-label={`Rate ${n}`}
            className={`px-1 text-xl ${item.rating >= n ? "" : "opacity-40"}`}
          >★</button>
        ))}
      </div>
    </div>
  );
}
