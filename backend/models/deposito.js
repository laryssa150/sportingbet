const mongoose = require("../mongo");

const DepositoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  valor: Number,
  status: {
    type: String,
    enum: ["pendente", "pago", "cancelado"],
    default: "pendente"
  },
  txid: String,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Deposito", DepositoSchema);
