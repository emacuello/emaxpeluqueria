import { Router} from 'express';
import  bienvenida  from '../controllers';
import  usersRouter  from './usersRouter';
import  appointmentRouter  from './appointmentRouter';
import  appointmentsRouter  from './appointmentsRouter';

const router = Router();

router.use('/users', usersRouter);
router.use('/appointment', appointmentRouter);
router.use('/appointments', appointmentsRouter);
router.use('/', bienvenida);

export default router;
