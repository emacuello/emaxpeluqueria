import { Router } from 'express';
import {
	getUserById,
	getUserEmail,
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
usersRouter.get('/:id', getUserById); //✅
usersRouter.post('/register', verificationsUsersField, postUser); //✅
usersRouter.post('/login', login); //✅
usersRouter.post('/register/google', newUsergoogle); //✅
usersRouter.put('/', updateUser); //✅

export default usersRouter;
