import { AppDataSource } from '../config/data-source';
import { Credential } from '../entities/credential';
import { ICredentialDtos } from '../dtos/ICredentialDtos';
import bcrypt from 'bcrypt';
import { IChangePassword } from '../dtos/userDtos';
import { User } from '../entities/Users';
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
		const credentials = await this.findOne({
			where: { username },
			relations: { user: true },
		});

		if (!credentials) throw new Error('Credenciales Incorrectas');
		const comparePassword = await bcrypt.compare(
			password,
			credentials.password
		);
		if (comparePassword) {
			return credentials.user.id;
		} else throw Error('Credenciales Incorrectas');
	},
	changeCredentials: async function (
		changePassword: IChangePassword,
		user: User
	) {
		const { newPassword, oldPassword } = changePassword;
		const credentials = await this.findOneBy({
			username: user.credential.username,
		});
		if (!credentials) throw new Error('Credenciales Incorrectas');
		const comparePassword = await bcrypt.compare(
			oldPassword,
			credentials.password
		);
		if (!comparePassword) throw new Error('Credenciales Incorrectas');
		const hashPassword = await bcrypt.hash(newPassword, 10);
		credentials.password = hashPassword;
		const newCredentials = await this.save(credentials);
		if (newCredentials !== undefined) return credentials;
		else throw Error('Error al cambiar las credenciales');
	},
});
