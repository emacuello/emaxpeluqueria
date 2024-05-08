import { AppointmentDtos } from '../dtos/appointmentDtos';
import { appointmentsRepository } from '../repository/appointmentRepository';
import { getUserId } from './userServices';

export const getAllAppointments = async () => {
	try {
		const appointments = await appointmentsRepository.findAllAppointments();
		return appointments;
	} catch (error) {
		console.log('Error al encontrar en la base de datos', error);
		throw error;
	}
};

export const getAppointmentbyId = async (id: number) => {
	try {
		const appointment = await appointmentsRepository.findAppointmentsbyId(
			id
		);
		return appointment;
	} catch (error) {
		console.log('Error al encontrar en la base de datos', error);
		throw error;
	}
};

export const createAppointment = async (appointments: AppointmentDtos) => {
	try {
		const appointment = {
			date: appointments.date,
			time: appointments.time,
			description: appointments.description
		};
		const newAppointment = await appointmentsRepository.create(appointment);
		const userid = await getUserId(appointments.userid);
		if (userid !== undefined)
			newAppointment.user = userid;
		else throw Error('Error al crear el turno');
		await appointmentsRepository.save(newAppointment);
		console.log('Turno creado con exito', newAppointment);
	} catch (error) {
		console.log('Error al crear el turno', error);
		throw error;
	}
};

export const changeAppointment = async (id: number) => {
	try {
		const appointment = await appointmentsRepository.statusChanged(id);
		if(appointment.status !== 'cancelled') appointment.status = 'cancelled';
		else throw Error('El turno ya fue cancelado');
		await appointmentsRepository.save(appointment);
	} catch (error) {
		console.log('Error al cambiar el estado del turno');
		throw error;
	}
};
