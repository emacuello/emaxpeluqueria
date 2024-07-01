import { Redis } from 'ioredis';
import { HOST_REDIS, PASSWORD_REDIS, PORT_REDIS } from './envs';

export const subscriber = new Redis({
	host: HOST_REDIS,
	port: Number(PORT_REDIS),
	password: PASSWORD_REDIS,
});
