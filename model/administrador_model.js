const Sequelize = require('sequelize');
const database = require('../db');
const EleitorModel = require('./eleitor_model');

const AdministradorModel = database.define('administrador',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true
    },
    matricula:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports= AdministradorModel;