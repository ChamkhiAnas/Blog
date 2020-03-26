const Sequelize = require('sequelize');
const connection = require('./../config/database');
const category = require('./category');

const post = connection.define('post', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    urlImage: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    categoryId: {

        type: Sequelize.INTEGER,
        allowNull: true

    },
    userId: {

        type: Sequelize.INTEGER,
        allowNull: true

    }
});

module.exports = post