import { Router } from 'express'; 
import { getAppointments } from '../controllers/appointmentController';

const appointmentsRouter = Router();

appointmentsRouter.get('/', getAppointments);

export default appointmentsRouter;