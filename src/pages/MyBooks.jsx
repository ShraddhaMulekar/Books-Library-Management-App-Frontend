import { useEffect, useState } from "react";
import { baseAPI } from "../api/axios";
import MyBookCard from "../components/MyBookCard";

export default function MyBooks() {
  const [list, setList] = useState(null);

  const load = async () => {
    const res = await baseAPI.get("/mybooks");
    setList(res.data.list);;
  };

  useEffect(() => { load(); }, []);

  if (!list) return <p>Loading my books...</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {list.map(item => (
        <MyBookCard key={item._id} item={item} onChanged={load} />
      ))}
    </div>
  );
}
