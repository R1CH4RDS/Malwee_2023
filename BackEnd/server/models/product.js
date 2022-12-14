const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Product', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        price : {
            type : Sequelize.DECIMAL(10, 2),
            allowNull : false
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
        fkgroup : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        fksubgroup : {
            type : Sequelize.STRING(100),
            allowNull : false
        },
        fkcollection : {
            type : Sequelize.STRING(100),
            allowNull : false
        }
    })
}