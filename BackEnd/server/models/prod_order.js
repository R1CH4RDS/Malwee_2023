const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('ProdOrder', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkorder : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        fkproduct : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        amount : {
            type : Sequelize.DECIMAL,
            allowNull : false,
        },
        UNITvalue : {
            type : Sequelize.DECIMAL,
            allowNull : false,
        },
        descont : {
            type : Sequelize.DECIMAL,
            allowNull : true,
        },
        addition : {
            type : Sequelize.DECIMAL,
            allowNull : true,
        },
        total : {
            type : Sequelize.DECIMAL,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        }
    })
}