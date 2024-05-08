import { AppDataSource } from '../config/data-source';
import { User } from '../entities/Users';

export const usersRepository = AppDataSource.getRepository(User).extend({
	findID: async function (id: number) {
		const userbyid = await this.createQueryBuilder('user')
			.leftJoinAndSelect('user.appointment', 'appointment')
			.where('user.id = :id', { id })
			.getOne();
		if (userbyid != null && userbyid != undefined) return userbyid;
		else throw Error('El usuario con el id no fue encontrado');
	},
	findAllUsers: async function () {
		const users = await this.find({relations: {appointment: true}});
		if (users) return users;
		else throw Error('No se encontraron los usuarios');
	},
});
