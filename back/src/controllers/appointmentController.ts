import { Request, Response } from 'express';
import {
	changeAppointment,
	createAppointment,
	getAllAppointments,
	getAppointmentbyId,
} from '../services/appointmentServices';

export const getAppointment = async (req: Request, res: Response) => {
	try {
		const id = await Number(req.params.id);
		const result = await getAppointmentbyId(id);
		res.status(200).json(result);
	} catch (error) {
		console.log('Error encontrar el turno en la base de datos', error);
		res.status(404).json({
			message: 'Turno no encontrado',
			details: 'Error al ingresar los datos',
		});
	}
};

export const getAppointments = async (req: Request, res: Response) => {
	try {
		const result = await getAllAppointments();
		res.status(200).json(result);
		console.log('Turnos encontrados');
	} catch (error) {
		res.status(404).json({
			message: 'Error al buscar los turnos',
			details: 'Los datos son incorrectos',
		});
	}
};

export const postAppointment = async (req: Request, res: Response) => {
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	try {
		const { date, time, userid, description } = await req.body;
		const result = await createAppointment(
			{
				date,
				time,
				userid,
				description,
			},
			token!
		);
		if (!result) throw Error('Error al crear el turno');
		res.status(201).json({ details: 'Turno creado exitosamente', result });
	} catch (error) {
		res.status(400).json({
			message: 'Error al crear el turno',
			details: 'los datos son incorrectos',
		});
		console.log('Error al crear el turno', error);
	}
};

export const putAppointment = async (req: Request, res: Response) => {
	const change = req.body;
	const user = req.headers?.authorization;

	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	try {
		const id = await Number(req.params.id);
		await changeAppointment(id, token!, change);
		res.status(200).json({ details: 'Turno cancelado con exito' });
	} catch (error) {
		console.log('Error al cambiar el estado del turno', error);
		res.status(404).json({
			message: 'Error cancelar el turno',
			details: 'Los datos son incorrectos o el turno ya fue cancelado',
		});
	}
};
