import {App} from './App';
import {MongoDB} from './todos/repo/mongo/MongoDB';
import {DB} from './todos/repo/Repo';
import {PostgresDB} from './todos/repo/sql/PostgresDB';
import dotenv from "dotenv";
import {Express} from 'express';
import {SocketServer} from './websocket/SocketServer';
dotenv.config();


export enum DBTypes {
    MONGO = 'mongo',
    POSTGRE = 'postgres',
}

export function getDb(type: DBTypes): DB {
    switch (type) {
        case DBTypes.MONGO: return MongoDB.init();
        case DBTypes.POSTGRE: return PostgresDB.init();
        default:  return MongoDB.init();
    }
}

const dbType: DBTypes = process.env.DATABASE ? process.env.DATABASE as DBTypes: DBTypes.MONGO;
const db: DB = getDb(dbType);

export const server: Express = App.init(db);
export const wssClients = SocketServer.init(server);




