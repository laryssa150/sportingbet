const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ erro: "Token malformado" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = { autenticar };
