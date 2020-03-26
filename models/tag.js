const Sequelize = require('sequelize');
const connection = require('./../config/database');

const tag = connection.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = tag