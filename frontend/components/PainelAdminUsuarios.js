import React, { useEffect, useState } from "react";
 
function PainelAdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then(res => res.json())
      .then(setUsuarios);
  }, []);
 
  return (
    <section>
      <h2>👥 Usuários</h2>
      <ul>
        {usuarios.map(u => (
          <li key={u._id}>{u.nome} ({u.email}) - Perfil: {u.perfil}</li>
        ))}
      </ul>
    </section>
  );
}
 
export default PainelAdminUsuarios;