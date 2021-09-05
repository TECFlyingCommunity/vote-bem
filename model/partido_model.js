const Sequelize = require('sequelize');
const database = require('../db');

const PartidoModel = database.define('partido',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:false,
        allowNull:false,
        primaryKey: true
    },

    numPartido:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    nomePartido:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = PartidoModel; 