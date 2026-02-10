function autorizar(papeisPermitidos = []) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!papeisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ erro: "Permissão insuficiente" });
    }

    next();
  };
}

module.exports = { autorizar };
