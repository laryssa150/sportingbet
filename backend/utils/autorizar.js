function autorizar(papel) {
  return (req, res, next) => {
    if (req.usuario?.perfil !== papel) return res.sendStatus(403);
    next();
  };
}
 
module.exports = { autorizar };