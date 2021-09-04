const Sequelize = require('sequelize');
const database = require('./../db');
 
const UserModel = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
	allowNull:false
    },
    senha:{
	type: Sequelize.STRING,
	allowNull:false
    },
    cpf:{
	type:Sequelize.STRING,
	allowNull:false
    }
})

module.exports = UserModel;

