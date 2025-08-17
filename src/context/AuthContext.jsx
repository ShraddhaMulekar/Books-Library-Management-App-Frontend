import { createContext, useContext, useEffect, useState } from "react";
import { baseAPI } from "../api/axios.js";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { email }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try restore session

    baseAPI.get("/users/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (email, password) => {
    const res = await baseAPI.post("/user/register", { email, password });
    setUser(res.data);
  };
  const login = async (email, password) => {
    const res = await baseAPI.post("/users/login", { email, password });
    setUser(res.data);
  };
  const logout = async () => {
    await baseAPI.get("/users/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
