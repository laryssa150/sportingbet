const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Usuario = sequelize.define("Usuario", {
  nome: DataTypes.STRING,
  email: DataTypes.STRING,
  senha: DataTypes.STRING,
  idade: DataTypes.INTEGER,
  perfil: DataTypes.STRING,
  totalApostado: DataTypes.FLOAT,
  totalGanho: DataTypes.FLOAT,
  consentiuLGPD: DataTypes.BOOLEAN
});

module.exports = Usuario;
