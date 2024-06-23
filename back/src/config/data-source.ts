import { DataSource } from 'typeorm';
import { User } from '../entities/Users';
import { Credential } from '../entities/credential';
import { Appointment } from '../entities/appointments';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './envs';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: Number(DB_PORT),
	username: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	// dropSchema: true,
	synchronize: true,
	logging: false,
	entities: [User, Credential, Appointment],
	subscribers: [],
	migrations: [],
});
