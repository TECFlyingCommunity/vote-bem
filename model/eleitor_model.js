const Sequelize = require("sequelize");
const database = require("../db");

const EleitorModel = database.define("eleitor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
});

module.exports = EleitorModel;
