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
export const HOST_REDIS = process.env.HOST_REDIS;
export const PORT_REDIS = process.env.PORT_REDIS;
export const USERNAME_REDIS = process.env.USERNAME_REDIS;
export const PASSWORD_REDIS = process.env.PASSWORD_REDIS;
export const HEADERS_TOKEN = process.env.HEADERS_TOKEN;
export const DATABASE_URL = process.env.DATABASE_URL;
