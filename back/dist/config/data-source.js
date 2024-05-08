"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("../entities/Users");
const credential_1 = require("../entities/credential");
const appointments_1 = require("../entities/appointments");
const envs_1 = require("./envs");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: envs_1.DB_HOST,
    port: Number(envs_1.DB_PORT),
    username: envs_1.DB_USER,
    password: envs_1.DB_PASSWORD,
    database: envs_1.DB_DATABASE,
    //dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [Users_1.User, credential_1.Credential, appointments_1.Appointment],
    subscribers: [],
    migrations: [],
});
