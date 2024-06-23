import { AppDataSource } from '../config/data-source';
import { Appointment } from '../entities/appointments';

export const appointmentsRepository = AppDataSource.getRepository(
	Appointment
).extend({
	findAllAppointments: async function () {
		const appointments = await this.find({
			relations: {
				user: true,
			},
		});
		if (appointments !== undefined) return appointments;
		else throw Error('Error al buscar los turnos');
	},
	findAppointmentsbyId: async function (id: number) {
		const appointments = await this.createQueryBuilder('appointment')
			.leftJoinAndSelect('appointment.user', 'user')
			.where('appointment.id = :id', { id })
			.getOne();
		if (appointments !== null) return appointments;
		else throw Error('Error al buscar el ID del turno');
	},
	statusChanged: async function (id: number, change: Partial<Appointment>) {
		const update = await this.update(id, change);
		if (update.affected === 0)
			throw Error('Error al cambiar el estado del turno');
		return await this.findAppointmentsbyId(id);
	},
});
