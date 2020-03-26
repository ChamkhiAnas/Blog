const Sequelize = require('sequelize');
const connection = require('./../config/database');

const comment = connection.define('comment', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commentaire: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = comment