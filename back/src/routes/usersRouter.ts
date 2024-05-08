import { Router } from 'express';
import {
	getUserById,
	getUsers,
	login,
	postUser,
} from '../controllers/usersController';
import verificationsUsersField from '../middleware/users';

const usersRouter = Router();
usersRouter.post('/register', verificationsUsersField, postUser);
usersRouter.get('/:id', getUserById);
usersRouter.get('/', getUsers);
usersRouter.post('/login', login);

export default usersRouter;
