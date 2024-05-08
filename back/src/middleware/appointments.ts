import { Request, Response, NextFunction } from 'express';

const verificationsAppointmentsField = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { date, time, userid, description } = req.body;
		if (!date || !time || !userid || !description) {
			return res.status(400).json({
				message: 'Error al crear turno',
				detail: 'Los campos estan incompletos',
			});
		} else next();
	} catch (error) {
		console.error(
			'Error en el middleware verificationsAppointmentsField:',
			error
		);
		return res.status(500).json({
			message: 'Error interno del servidor',
			detail: 'Por favor, inténtalo de nuevo más tarde',
		});
	}
};

export default verificationsAppointmentsField;
