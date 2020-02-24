import {DB} from './Repo';
import {DBTypes} from '../../index';
import {MongoRepo} from './mongo/MongoRepo';
import {SequelizeRepo} from './sql/SequlizeRepo';

export class RepoFactory {
    static create(db: DB) {
        switch (db.type) {
            case DBTypes.MONGO:
                return new MongoRepo(db);
            case DBTypes.POSTGRE:
                return new SequelizeRepo(db);
            default:
                return new MongoRepo(db);
        }
    }
}
