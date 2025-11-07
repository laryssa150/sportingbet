const mongoose = require("mongoose");

const LogSistemaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: false },
  ip: { type: String },
  rota: { type: String },
  metodo: { type: String },
  acao: { type: String, required: true },
  detalhes: { type: String },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LogSistema", LogSistemaSchema);
