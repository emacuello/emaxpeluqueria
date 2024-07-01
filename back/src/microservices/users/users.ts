// import { subscriber } from '../../config/redis.config';
// import { getUserId } from '../../services/userServices';

// subscriber.subscribe('findUser', (err, count) => {
// 	if (err) {
// 		console.error('Failed to subscribe: ', err.message);
// 	} else {
// 		console.log(
// 			`Subscribed successfully! This client is currently subscribed to ${count} channels.`
// 		);
// 	}
// });

// subscriber.on('message', async (channel, message) => {
// 	console.log(`Received message: ${message} from channel: ${channel}`);
// 	const { id } = JSON.parse(message);
// 	// Aquí puedes manejar el evento de Redis como desees
// 	// Por ejemplo, buscar el usuario con el ID proporcionado
// 	const user = await getUserId(id); // Función ficticia para buscar un usuario por ID
// 	console.log('User found:', user);
// });
