"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DIcontainer = require('../../../../index');
const Todo = DIcontainer.databaseInstance.define('Todo', {
    content: {
        type: sequelize_1.DataTypes.STRING
    },
    isCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    isEditing: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
});
module.exports = Todo;
