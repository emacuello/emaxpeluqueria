import { AppDataSource } from './config/data-source';
import { PORT } from './config/envs';
import { app } from './server';
import 'reflect-metadata';

AppDataSource.initialize().then(() => {
	console.log('Conexion a la base de datos con exito');

	app.listen(PORT, () => {
		console.log(`server on port ${PORT}`);
	});
});
