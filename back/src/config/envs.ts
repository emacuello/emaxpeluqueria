import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const LOGIN_REDIRECT =
	process.env.LOGIN_REDIRECT || 'http://localhost:3000/';
