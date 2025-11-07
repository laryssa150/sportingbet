const mongoose = require("../mongo");
 
const eventoSegurancaSchema = new mongoose.Schema({
  tipo: String,
  usuario: String,
  data: { type: Date, default: Date.now },
  criticidade: String,
  origemIP: String,
  resolvido: { type: Boolean, default: false }
});
 
module.exports = mongoose.model("EventoSeguranca", eventoSegurancaSchema);