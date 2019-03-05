var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { query, conn } = require('./index');
const pw = require('../util/password');
const escape = conn.escape.bind(conn);
const roles = [
    {
        name: '超级管理员',
        code: '0',
    },
    {
        name: '管理员',
        code: '1',
    },
    {
        name: '版主',
        code: '2',
    },
    {
        name: '会员',
        code: '3',
    },
];
const subjects = [
    {
        name: 'Javascript',
        description: 'Javascript',
    },
    {
        name: 'Java',
        description: 'Java',
    },
    {
        name: 'Ruby',
        description: 'Ruby',
    },
    {
        name: 'Golang',
        description: 'Golang',
    },
    {
        name: 'Linux',
        description: 'Linux',
    },
    {
        name: 'Windows',
        description: 'Windows',
    },
    {
        name: 'MacOS',
        description: 'MacOS',
    },
    {
        name: 'Git',
        description: 'Git',
    },
    {
        name: 'Webpack',
        description: 'Webpack',
    },
];
const users = [
    {
        name: 'admin',
        password: pw.encrypt('password'),
        email: 'admin@daydayup.com',
        role_code: '0',
    }
];
function truncate(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield query(`SET FOREIGN_KEY_CHECKS = 0`);
        yield query(`TRUNCATE ${tableName}`);
        yield query(`SET FOREIGN_KEY_CHECKS = 1`);
    });
}
function initUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        yield truncate('users');
        return Promise.all(users.map(({ name, password, email, role_code }) => {
            const datetime = new Date();
            return query(`INSERT INTO users (name, password, email, role_code, created_at, updated_at) VALUES 
        (${escape(name)}, ${escape(password)}, ${escape(email)}, ${escape(role_code)}, ${escape(datetime)}, ${escape(datetime)})`);
        }));
    });
}
function initRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        yield truncate('roles');
        return Promise.all(roles.map(role => {
            return query(`INSERT INTO roles (name, code) VALUES 
        (${escape(role.name)}, ${escape(role.code)})`);
        }));
    });
}
function initSubjects() {
    return __awaiter(this, void 0, void 0, function* () {
        yield truncate('subjects');
        const { results } = yield query(`SELECT id FROM users WHERE name = 'admin'`);
        const creator_id = results[0].id;
        return Promise.all(subjects.map(subject => {
            const datetime = new Date();
            return query(`INSERT INTO subjects (name, description, creator_id, created_at, updated_at) VALUES 
        (${escape(subject.name)}, ${escape(subject.description)}, ${escape(creator_id)}, ${escape(datetime)}, ${escape(datetime)})`);
        }));
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initRoles();
        yield initUsers();
        yield initSubjects();
        conn.end();
    });
}
init();
//# sourceMappingURL=init.js.map