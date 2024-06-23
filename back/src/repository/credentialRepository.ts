import { AppDataSource } from '../config/data-source';
import { Credential } from '../entities/credential';
import { ICredentialDtos } from '../dtos/ICredentialDtos';
import bcrypt from 'bcrypt';
export const credentialsRepository = AppDataSource.getRepository(
	Credential
).extend({
	createCredentials: async function (credential: ICredentialDtos) {
		const { password, username } = credential;
		const hashPassword = await bcrypt.hash(password, 10);
		const credentials = this.create({
			password: hashPassword,
			username,
		});
		if (!credentials)
			throw new Error('Error en la creacion de las credenciales');
		const newCredentials = await this.save(credentials);
		if (newCredentials !== undefined) return credentials;
		else throw Error('Error en la creacion de las credenciales');
	},
	checkCredentials: async function (credential: Credential) {
		const { username, password } = credential;
		const credentials = await this.findOneBy({ username });
		if (!credentials) throw new Error('Credenciales Incorrectas');
		const comparePassword = await bcrypt.compare(
			password,
			credentials.password
		);
		if (comparePassword) {
			return credentials.id;
		} else throw Error('Credenciales Incorrectas');
	},
});
