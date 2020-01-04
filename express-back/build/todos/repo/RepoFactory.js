"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const MongoRepo_1 = require("./mongo/MongoRepo");
const SequlizeRepo_1 = require("./sql/SequlizeRepo");
class RepoFactory {
    static create(db) {
        switch (db.type) {
            case index_1.DBTypes.MONGO:
                return new MongoRepo_1.MongoRepo(db);
            case index_1.DBTypes.POSTGRE:
                return new SequlizeRepo_1.SequelizeRepo(db);
            default:
                return new MongoRepo_1.MongoRepo(db);
        }
    }
}
exports.RepoFactory = RepoFactory;
