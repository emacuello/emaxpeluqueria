import { Request, Response } from 'express';

const bienvenida = (req: Request, res: Response) => {
	res.send('Bienvenido al server!!!!!!!');
};

export default bienvenida;