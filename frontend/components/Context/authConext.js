import { createContext, useState, useEffect } from "react";
 
export const AuthContext = createContext();
 
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [usuario, setUsuario] = useState(null);
 
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/api/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(setUsuario);
    }
  }, [token]);
 
  const login = async (email, senha) => {
    const res = await fetch("http://localhost:3000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
    }
  };
 
  return (
    <AuthContext.Provider value={{ token, usuario, login }}>
      {children}
    </AuthContext.Provider>
  );
}