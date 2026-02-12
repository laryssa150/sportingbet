const mongoose = require("../mongo");

const MercadoSchema = new mongoose.Schema({
  esporte: String,
  evento: String,
  mercado: String,
  odd: Number,
  ativo: { type: Boolean, default: true },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mercado", MercadoSchema);
