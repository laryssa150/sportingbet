const jwt = require("jsonwebtoken");
 
function autenticar(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token ausente" });
 
  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario;
    next();
  } catch (err) {
    res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}
 
function autorizar(perfisPermitidos = []) {
  return (req, res, next) => {
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ erro: "Acesso negado" });
    }
    next();
  };
}
 