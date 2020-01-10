import {Repo} from '../../todos/repo/Repo';

export class AuthService {
    repo: Repo;
    constructor(repo: Repo) {
        this.repo = repo;
    }
}
