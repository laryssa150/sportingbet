import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const res = await fetch("http://localhost:3000/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await res.json();
      if (!res.ok) {
        setErro(data.erro || "Erro ao registrar");
        return;
      }

      // Login automático após registro
      const loginRes = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        setErro("Registro feito, mas erro ao logar");
        return;
      }

      localStorage.setItem("token", loginData.token);
      navigate("/dashboard");
    } catch (err) {
      setErro("Erro de conexão");
    }
  };

  return (
    <section>
      <h2>📝 Registro</h2>
      <form onSubmit={handleRegistro}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button type="submit">Registrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <p>Já tem conta? <a href="/">Faça login</a></p>
    </section>
  );
}

export default Registro;
