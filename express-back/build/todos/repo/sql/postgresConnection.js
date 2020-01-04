"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const connectPsql = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const psql = yield new sequelize_1.Sequelize('TodosDatabase', 'vlukyane', '', {
        host: 'localhost',
        dialect: 'postgres',
        define: {
            timestamps: false
        }
    });
    return psql;
});
module.exports = connectPsql;
