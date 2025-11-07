// function verificar2FA(req, res, next) {
//   if (!req.usuario || !req.usuario.usa2FA) {
//     return res.status(403).send("Autenticação 2FA obrigatória.");
//   }
//   next();
// }

// module.exports = { verificar2FA };


// function verificar2FA(codigo, usuario) {
//   return codigo === usuario.codigo2FA;
// }