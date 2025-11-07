const LogSistema = require("../models/LogSistema");

function registrarLog(io, acao, detalhes = "") {
  return async (req, res, next) => {
    try {
      const log = await LogSistema.create({
        usuario: req.usuario?.id || null,
        ip: req.ip,
        rota: req.originalUrl,
        metodo: req.method,
        acao,
        detalhes
      });

      io.emit("logSistema", log); // 🔔 Emite evento para frontend
    } catch (err) {
      console.error("Erro ao registrar log:", err.message);
    }
    next();
  };
}

module.exports = registrarLog;
