import { IUserDtos } from '../dtos/userDtos';
import { Credential } from '../entities/credential';
import { usersRepository } from '../repository/userRepository';
import { addCredential, checkCredential } from './credentialServices';

export const getAllUsers = async () => {
	try {
		const users = usersRepository.findAllUsers();
		return users;
	} catch (error) {
		throw Error('Error al encontrar los usuarios en la DB');
	}
};

export const getUserId = async (id: number) => {
	try {
		const userById = await usersRepository.findID(id);
		if (userById !== undefined) return userById;
	} catch (error) {
		console.log('Error al encontrar el usuario en la DB', error);
	}
};

export const newUsers = async (user: IUserDtos) => {
	try {
		const newUsers = {
			name: user.name,
			email: user.email,
			birthdate: user.birthdate,
			nDni: user.nDni,
		};
		const userCreated = await usersRepository.create(newUsers);
		const credential = await addCredential({
			username: user.username,
			password: user.password,
		});
		if (credential !== undefined) userCreated.credential = credential;
		else throw Error('Error al crear usuarios, datos incompletos');
		await usersRepository.save(userCreated);
		return userCreated;
	} catch (error) {
		console.log('error al crear el usuario', error);
		throw error;
	}
};

export const credentialCheck = async (credenciales: Credential)=> {
	try {
		const checkUser = await checkCredential(credenciales);
		if(checkUser) return getUserId(checkUser);
		else throw Error('Error al encontrar el usuario');
	} catch (error) {
		throw Error('Error al validar credenciales');
	}
};