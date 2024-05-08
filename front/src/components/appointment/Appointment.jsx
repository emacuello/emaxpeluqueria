import Accordion from 'react-bootstrap/Accordion';
import styles from '../../views/MyAppointments/MyAppointments.module.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { changeAppointments } from '../../redux/reducers';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
const Appointment = ({ date, time, user, description, id }) => {
	const [show, setShow] = useState(false);
	const [alert, setAlert] = useState({ status: undefined });
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const dispatch = useDispatch();
	const cancelAppointment = async () => {
		try {
			const response = await axios.put(
				`http://localhost:3000/appointment/cancel/${id}`
			);

			setAlert({ status: true, message: response.data.details });
			//Perdon es que me encapriche con el alert y lo quiero a toda costa, pero el estado global cuando se actualiza hace que no me renderice mi precioso alert, tuve que hacer un setTimeOut para pausar la actualizacion de la IU y darle timpo a que se muestre el alert. Es curioso que cuando actualizo un estado global para el IU todos mis estados locales se reinician, todavia no entiendo lo suficiente para que que es no pase.
			setTimeout(() => {
				dispatch(changeAppointments(id));
			}, 1500);
			handleClose();
		} catch (error) {
			setAlert({ status: false, message: error.message });
			console.error('Error al cancelar el turno', error);
			handleClose();
		}
	};

	return (
		<>
			{alert.status ? (
				<Alert key={id} variant="success">
					{alert.message || 'Turno cancelado'}
				</Alert>
			) : alert.status === false ? (
				<Alert key={id} variant="danger">
					{alert.message || 'Error al cancelar el turno'}
				</Alert>
			) : null}

			<Accordion.Item className={styles.Accordion} eventKey={id}>
				<Accordion.Header>
					El usuario {user} tiene un turno el dia {date} a las {time}
				</Accordion.Header>
				<Accordion.Body>
					<div className="row">
						<div className={`${styles.description} col-6`}>
							El usuario {user} solicita: {description}
						</div>
						<div className={`${styles.containerBtn} col-6`}>
							<button onClick={handleShow} className={styles.btn}>
								Cancelar
							</button>
						</div>
					</div>
				</Accordion.Body>
			</Accordion.Item>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Seguro que quieres Cancelar?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Estas seguro de querer cancelar el turno? Si lo cancelas,
					tienes que volver a agendarlo!
				</Modal.Body>
				<Modal.Footer>
					<button className={styles.btnClose} onClick={handleClose}>
						Cerrar
					</button>
					<button className={styles.btn} onClick={cancelAppointment}>
						Cancelar de todas formas
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Appointment;
