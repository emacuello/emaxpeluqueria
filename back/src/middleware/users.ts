import { Request, Response, NextFunction } from 'express';
const verificationsUsersField = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email, password, birthdate, nDni, username } = req.body;
		if (!name || !email || !password || !birthdate || !nDni || !username) {
			return res.status(400).json({
				message: 'Error al crear usuario',
				detail: 'Los campos estan incompletos',
			});
		} else next();
	} catch (error) {
		console.error('Error en el middleware verificationsUsersField:', error);
		return res.status(500).json({
			message: 'Error interno del servidor',
			detail: 'Por favor, inténtalo de nuevo más tarde',
		});
	}
};

export default verificationsUsersField;