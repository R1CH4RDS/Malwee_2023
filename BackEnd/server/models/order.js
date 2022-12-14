const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Order', {
        id : {
            type : Sequelize.INTEGER.UNSIGNED,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        fkclient : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        DTemission : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        DTdelivery : {
            type : Sequelize.STRING(100),
            allowNull : false,
        },
        fkadress : {
            type : Sequelize.INTEGER,
            allowNull : false,
        },
        total : {
            type : Sequelize.DECIMAL,
            allowNull : false,
        },
        status : {
            type : Sequelize.INTEGER,
            allowNull : false
        },
    })
}