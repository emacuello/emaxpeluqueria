import { Router } from 'express';
import {
	changePassword,
	deleteUser,
	getUserById,
	getUserEmail,
	getUsername,
	getUsers,
	getUserToken,
	login,
	newUsergoogle,
	postUser,
	updateUser,
} from '../controllers/usersController';
import verificationsUsersField from '../middleware/users';

const usersRouter = Router();
usersRouter.get('/', getUsers); //✅
usersRouter.get('/token', getUserToken);
usersRouter.get('/mail', getUserEmail); //✅
usersRouter.get('/username', getUsername);
usersRouter.get('/:id', getUserById); //✅
usersRouter.post('/register', verificationsUsersField, postUser); //✅
usersRouter.post('/login', login); //✅
usersRouter.post('/register/google', newUsergoogle); //✅
usersRouter.put('/', updateUser); //✅
usersRouter.put('/changePassword', changePassword); //✅
usersRouter.delete('/', deleteUser);

export default usersRouter;
