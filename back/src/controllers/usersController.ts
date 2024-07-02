import { Request, Response } from 'express';
import {
	credentialCheck,
	getAllUsers,
	getUser,
	getUserByEmail,
	getUserId,
	newUserGoogle,
	newUsers,
	putUser,
} from '../services/userServices';
import { HEADERS_TOKEN, LOGIN_REDIRECT } from '../config/envs';

export const getUsers = async (req: Request, res: Response) => {
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	try {
		const users = await getAllUsers(token as string);
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
	console.log(user, 'user');

	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	console.log(token, 'token');

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
	if (token !== HEADERS_TOKEN)
		res.status(401).json({ message: 'No autorizado' });
	try {
		const id: number = Number(req.params.id);
		const userbyId = await getUserId(id);
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
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	if (token !== HEADERS_TOKEN)
		res.status(401).json({ message: 'No autorizado' });
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
	const user = req.headers?.authorization;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	if (token !== HEADERS_TOKEN)
		res.status(401).json({ message: 'No autorizado' });
	try {
		const credenciales = await req.body;
		const { token, user } = await credentialCheck(credenciales);
		res.status(200).json({ login: true, token, user });
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

export const updateUser = async (req: Request, res: Response) => {
	try {
		const jwt = req.headers?.authorization;
		const token = jwt?.split(' ')[1];
		const data = req.body;
		const update = putUser(token!, data);
		res.status(200).json(update);
	} catch (error) {
		res.status(400).json({
			message: 'Error al actualizar usuario',
			detail: 'Los datos son incorrectos',
		});
	}
};

export const getUserEmail = async (req: Request, res: Response) => {
	const user = req.headers?.authorization;
	const email = req.headers?.email;
	if (!user) res.status(401).json({ message: 'No autorizado' });
	const token = user?.split(' ')[1];
	if (token !== HEADERS_TOKEN)
		res.status(401).json({ message: 'No autorizado' });
	console.log('USER AUTH:', token);

	if (!email)
		res.status(400).json({ message: 'Los datos no fueron enviados' });
	console.log('EMAIL:', email);
	try {
		const user = await getUserByEmail(email! as string);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({
			message: 'Error al ingresar los datos',
			detail: 'Usuario no encontrado',
		});
	}
};

export const newUsergoogle = async (req: Request, res: Response) => {
	try {
		const { name, email, image } = req.body;
		console.log('CONTROLLER', name, email, image);

		const newUser = await newUserGoogle({
			name,
			email,
			image,
			socialUser: true,
		});
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({
			meassage: 'Error al crear usuario',
			detail: 'Los datos son incorrectos',
		});
	}
};
