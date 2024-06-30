import { SECRET_KEY } from '../config/envs';
import { IUserCreate, IUserDtos } from '../dtos/userDtos';
import { Credential } from '../entities/credential';
import { JwtPayload } from '../interfaces/IPayload';
import { usersRepository } from '../repository/userRepository';
import { addCredential, checkCredential } from './credentialServices';
import jwt from 'jsonwebtoken';

export const getAllUsers = async () => {
	try {
		const users = usersRepository.findAllUsers();
		return users;
	} catch (error) {
		throw Error('Error al encontrar los usuarios en la DB');
	}
};

export const getUserId = async (id: number, token?: string) => {
	try {
		const userById = await usersRepository.findID(id);
		if (!userById) throw Error('El usuario con el id no fue encontrado');
		const user = jwt.verify(token!, SECRET_KEY!) as JwtPayload;
		if (userById.email !== user?.aud) {
			throw Error('No estas autorizado para realizar esta accion');
		}
		return userById;
	} catch (error) {
		console.log('Error al encontrar el usuario en la DB', error);
		throw error;
	}
};

export const newUsers = async (user: IUserDtos) => {
	try {
		const newUsers: IUserCreate = {
			name: user.name,
			email: user.email,
			birthdate: user.birthdate,
			nDni: user.nDni,
		};
		const userCreated = usersRepository.create(newUsers);
		const credential = await addCredential({
			username: user.username,
			password: user.password,
		});
		if (credential !== undefined) {
			userCreated.credential = credential;
			await usersRepository.save(userCreated);
			return userCreated;
		} else throw Error('Error al crear usuarios, datos incompletos');
	} catch (error) {
		console.log('error al crear el usuario', error);
		throw error;
	}
};

export const credentialCheck = async (credenciales: Credential) => {
	try {
		const checkUser = await checkCredential(credenciales);
		if (!checkUser) throw Error('Error validar credenciales');
		const user = await getUserId2(checkUser);
		if (!user) throw Error('Error al encontrar el usuario');
		const payload: JwtPayload = {
			sub: user.id,
			aud: user.email,
		};
		if (SECRET_KEY === undefined)
			throw Error('Error al generar el token 1');
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7h' });
		if (!token) throw Error('Error al generar el token 2');
		return { token, user };
	} catch (error) {
		throw Error('Error al validar credenciales');
	}
};
const getUserId2 = async (id: number) => {
	try {
		const userById = await usersRepository.findID(id);
		if (!userById) throw Error('El usuario con el id no fue encontrado');

		return userById;
	} catch (error) {
		console.log('Error al encontrar el usuario en la DB', error);
		throw error;
	}
};

export const getUser = async (token: string) => {
	try {
		const user = jwt.verify(token, SECRET_KEY!) as JwtPayload;
		if (!user) throw Error('Error al decodificar el token');
		console.log(user);

		const findUser = await usersRepository.findOne({
			where: { email: user.aud },
			relations: { appointment: true },
		});
		console.log(findUser);

		if (!findUser) throw Error('Error al encontrar el usuario');
		return findUser;
	} catch (error) {
		console.log('Error al encontrar el usuario en la DB', error);
		throw error;
	}
};
