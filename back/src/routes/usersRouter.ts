import { Router } from 'express';
import {
	getUserById,
	getUsers,
	getUserToken,
	login,
	postUser,
} from '../controllers/usersController';
import verificationsUsersField from '../middleware/users';

const usersRouter = Router();
usersRouter.get('/', getUsers);
usersRouter.get('/token', getUserToken);
usersRouter.get('/:id', getUserById);
usersRouter.post('/register', verificationsUsersField, postUser);
usersRouter.post('/login', login);

export default usersRouter;
