const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Client', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        nameFantasy : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        socialReason : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        CNPJ : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        clientSince : {
            type : Sequelize.DATE,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}
