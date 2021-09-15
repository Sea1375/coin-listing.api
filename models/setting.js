"use strict";

module.exports = function(sequelize, DataTypes) {
    var setting = sequelize.define("setting", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return setting;
};