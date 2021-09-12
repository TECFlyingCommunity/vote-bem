const Sequelize = require('sequelize');
const database = require('../db');

const CandidatoModel = database.define('candidato',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: false,
        allowNull:false,
        primaryKey:true
    },
    numVoto:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    }


});

module.exports = CandidatoModel;