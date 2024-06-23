import { Request, Response } from 'express';
import {
	credentialCheck,
	getAllUsers,
	getUser,
	getUserId,
	newUsers,
} from '../services/userServices';
import { LOGIN_REDIRECT } from '../config/envs';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(404).json({
			message: 'Error al ingresar los datos',
			detail: 'Usuarios no encontrados',
		});
	}
};

export const getUserToken = async (req: Request, res: Response) => {
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	console.log(token);

	try {
		const user = await getUser(token!);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({
			message: 'Error al ingresar los datos',
			detail: 'Usuario no encontrado',
		});
	}
};
export const getUserById = async (req: Request, res: Response) => {
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	try {
		const id: number = Number(req.params.id);
		const userbyId = await getUserId(id, token!);
		if (userbyId === null || userbyId === undefined) {
			throw new Error('Usuario no encontrado');
		}
		res.status(200).json(userbyId);
	} catch (error) {
		res.status(404).json({
			detail: 'El id del usuario es incorrecto',
			message: 'Error al buscar el usuario',
		});
	}
};

export const postUser = async (req: Request, res: Response) => {
	try {
		const { name, email, password, birthdate, nDni, username } =
			await req.body;
		const newUser = await newUsers({
			name,
			email,
			password,
			birthdate,
			nDni,
			username,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({
			meassage: 'Error al crear usuario',
			detail: 'Los datos son incorrectos',
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const credenciales = await req.body;
		const token = await credentialCheck(credenciales);
		res.status(200).json({ login: true, token });
	} catch (error) {
		res.status(400).json({
			message: 'Error al iniciar sesion',
			details: 'Las credenciales son incorrectas',
		});
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('token').redirect(`${LOGIN_REDIRECT}`);
};
