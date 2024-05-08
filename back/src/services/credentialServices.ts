import { ICredentialDtos } from '../dtos/ICredentialDtos';
import { Credential } from '../entities/credential';
import { credentialsRepository } from '../repository/credentialRepository';

export const addCredential = async (credentialDto: ICredentialDtos) => {
	try {
		const newCredential = await credentialsRepository.createCredentials(
			credentialDto
		);
		if (newCredential !== undefined) return newCredential;
		else throw Error('Error al agregar las credenciales');
	} catch (error) {
		console.log('Error al agregar las credenciales', error);
		throw error;
	}
};

export const checkCredential = async (credentialDtos: Credential) => {
	try {
		const credential = await credentialsRepository.checkCredentials(
			credentialDtos
		);
		if (credential !== undefined) return credential;
		else throw Error('Error al encontrar el usuario');
	} catch (error) {
		console.log('Eror al hacer el login', error);
		throw error;
	}
};
