import { Router } from 'express';
import bienvenida from '../controllers';
import usersRouter from './usersRouter';
import appointmentRouter from './appointmentRouter';
import appointmentsRouter from './appointmentsRouter';
import { logout } from '../controllers/usersController';

const router = Router();

router.use('/users', usersRouter);
router.use('/appointment', appointmentRouter);
router.use('/appointments', appointmentsRouter);
router.use('/', bienvenida);
router.use('/logout', logout);

export default router;
