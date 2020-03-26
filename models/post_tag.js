const Sequelize = require('sequelize');
const connection = require('./../config/database');

const post_tag = connection.define('post_tag', {
    postId: {
        type: Sequelize.INTEGER,
    },
    tagId: {
        type: Sequelize.INTEGER,

    }
});

module.exports = post_tag