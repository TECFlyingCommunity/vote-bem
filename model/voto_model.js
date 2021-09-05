const Sequelize = require('sequelize');
const database = require('../db');

const VotoModel = database.define('voto',{
    idEleitor:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    },
    idCandidato:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
});
module.exports = VotoModel;