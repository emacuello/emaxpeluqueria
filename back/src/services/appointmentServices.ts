import { SECRET_KEY } from '../config/envs';
import { AppointmentDtos } from '../dtos/appointmentDtos';
import { Appointment } from '../entities/appointments';
import { JwtPayload } from '../interfaces/IPayload';
import { appointmentsRepository } from '../repository/appointmentRepository';
import { getUserId } from './userServices';
import jwt from 'jsonwebtoken';

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

export const createAppointment = async (
	appointments: AppointmentDtos,
	token: string
) => {
	try {
		const appointment = {
			date: appointments.date,
			time: appointments.time,
			description: appointments.description,
		};
		const newAppointment = appointmentsRepository.create(appointment);
		const userid = await getUserId(appointments.userid, token);
		if (userid !== undefined) newAppointment.user = userid;
		else throw Error('Error al crear el turno');
		const saveAppointment = await appointmentsRepository.save(
			newAppointment
		);
		if (!appointment) throw Error('Error al crear el turno');
		return saveAppointment;
	} catch (error) {
		console.log('Error al crear el turno', error);
		throw error;
	}
};

export const changeAppointment = async (
	id: number,
	token: string,
	change: Partial<Appointment>
) => {
	try {
		const user = jwt.verify(token, SECRET_KEY!) as JwtPayload;
		const appointment = await appointmentsRepository.findAppointmentsbyId(
			id
		);
		if (appointment.user.email !== user?.aud) throw Error('No autorizado');
		const appointmentChange = await appointmentsRepository.statusChanged(
			id,
			change
		);
		if (!appointmentChange)
			throw Error('Error al cambiar el estado del turno');
		return appointmentChange;
	} catch (error) {
		console.log('Error al cambiar el estado del turno');
		throw error;
	}
};
