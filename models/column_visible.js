"use strict";

module.exports = function(sequelize, DataTypes) {
    var column_visible = sequelize.define("column_visible", {
        // column in init migration path
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        column: {
            type: DataTypes.STRING,
        },
        visible: {
            type: DataTypes.BOOLEAN
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        }
    });
    return column_visible;
};