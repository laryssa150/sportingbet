const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Aposta = sequelize.define("Aposta", {
  usuarioId: DataTypes.INTEGER,
  tipo: DataTypes.STRING,
  valor: DataTypes.FLOAT,
  mercado: DataTypes.STRING,
  odds: DataTypes.FLOAT,
  status: DataTypes.STRING
});

module.exports = Aposta;
