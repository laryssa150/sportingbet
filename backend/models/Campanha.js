const mongoose = require("../mongo");
 
const campanhaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  tipo: String,
  ativo: Boolean,
  dataInicio: Date,
  dataFim: Date,
  publicoAlvo: [String],
  criadoPor: String
});
 
module.exports = mongoose.model("Campanha", campanhaSchema);