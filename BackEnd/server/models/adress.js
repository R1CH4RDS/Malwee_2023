const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Adress', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        street : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        city : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        state : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        cep : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        number : {
            type : Sequelize.STRING(),
            allowNull : false,
        },
        district : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        complement : {
            type : Sequelize.STRING(100)
        },
        fkclient : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}