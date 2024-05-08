import { AppDataSource } from '../config/data-source';
import { Credential } from '../entities/credential';
import { ICredentialDtos } from '../dtos/ICredentialDtos';

export const credentialsRepository = AppDataSource.getRepository(
	Credential
).extend({
	createCredentials: async function (credential: ICredentialDtos) {
		const credentials = await this.create(credential);
		await this.save(credentials);
		if (credentials !== undefined) return credentials;
		else throw Error('Eror en la creacion de las credenciales');
	},
	checkCredentials: async function (credential: Credential) {
		const { username, password } = credential;
		const credentials = await this.findOneBy({ username });
		if (credentials?.password === password) {
			return credentials.id;
		} else throw Error('Error al buscar las credenciales');
	},
});
