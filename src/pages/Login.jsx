import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    nav("/");
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-8 space-y-3">
      <h2 className="text-xl font-bold">Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full border p-2 rounded"/>
      <button className="w-full border p-2 rounded">Login</button>
      <p className="text-sm">No account? <Link to="/register" className="underline">Register</Link></p>
    </form>
  );
}
