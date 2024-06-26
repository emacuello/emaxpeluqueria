/* eslint-disable react/prop-types */
import Accordion from 'react-bootstrap/Accordion';
import styles from '../../views/MyAppointments/MyAppointments.module.css';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
const Appointment = ({
	date,
	time,
	user,
	description,
	id,
	cancelAppointments,
}) => {
	const [show, setShow] = useState(false);
	const [alert, setAlert] = useState({ status: undefined });
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [token, setToken] = useState(null);
	const navigate = useNavigate();

	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			navigate('/');
		}
		setToken(userToken);
	}, [navigate]);
	const cancelAppointment = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const body = {
				status: 'cancelled',
			};
			const axiosPut = async () => {
				const response = await axios.put(
					`${VITE_BASE_URL}/appointment/cancel/${id}`,
					body,
					config
				);
				if (response.status === 200) {
					setAlert({ status: true, message: response.data.details });
					cancelAppointments(id);
					handleClose();
				}
			};
			if (token) {
				axiosPut();
			}
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
