import { Router } from 'express'; 
import { getAppointment, postAppointment, putAppointment } from '../controllers/appointmentController';
import verificationsAppointmentsField from '../middleware/appointments';

const appointmentRouter = Router();
appointmentRouter.post('/schedule', verificationsAppointmentsField , postAppointment);
appointmentRouter.put('/cancel/:id', putAppointment);
appointmentRouter.get('/:id', getAppointment);

export default appointmentRouter;