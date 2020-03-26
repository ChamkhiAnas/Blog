const Sequelize = require('sequelize');
const connection = require('./../config/database');

const user = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
    typeId: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

});

module.exports = user