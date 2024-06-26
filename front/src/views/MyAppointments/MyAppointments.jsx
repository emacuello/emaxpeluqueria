import Appointment from '../../components/appointment/Appointment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styles from './MyAppointments.module.css';
import { Link, useNavigate } from 'react-router-dom';
const MyAppointments = () => {
	const [appointments, setAppointments] = useState({});
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			navigate('/');
		}
		setToken(userToken);
	}, [navigate]);
	useEffect(() => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const axiosData = async () => {
				const response = await axios(
					`${VITE_BASE_URL}/users/token`,
					config
				);
				console.log(response);
				setAppointments(response.data.appointment);
				setUser(response.data);
				setLoader(true);
			};
			if (token) {
				axiosData();
			}
		} catch (error) {
			console.error(error);
		}
	}, [navigate, VITE_BASE_URL, token]);

	const cancelList = (appointments) => {
		return appointments.filter((item) => {
			if (item.status === 'cancelled') return item;
		});
	};

	const cancelAppointments = (id) => {
		setAppointments((prevItems) =>
			prevItems.map((x) => {
				if (x.id === id) {
					return {
						...x,
						status: 'cancelled',
					};
				}
				return x;
			})
		);
	};
	return (
		<div className="container">
			<h1 className={`${styles.tittle} text-center`}>Mis turnos</h1>
			<div className={styles.containerBtn}>
				<Link className={styles.a} to="/home">
					<button className={styles.btn}>Crear un nuevo turno</button>
				</Link>
			</div>
			<Accordion className="mt-5 mb-5">
				{loader ? (
					token && appointments?.length ? (
						appointments
							.filter((items) => {
								if (items.status === 'active') return items;
							})
							.map((item) => {
								return (
									<Appointment
										key={item.id}
										date={item.date}
										time={item.time}
										user={user.name}
										description={item.description}
										id={item.id}
										cancelAppointments={cancelAppointments}
									/>
								);
							})
					) : (
						<Alert key="1" variant="info">
							No hay turnos disponibles
						</Alert>
					)
				) : (
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="info" />
					</div>
				)}
			</Accordion>

			<h2 className={`${styles.tittle} text-center`}>
				Turnos Cancelados
			</h2>
			<Accordion className="mt-5 mb-5">
				{loader ? (
					!appointments?.length ? (
						<Alert variant="dark">No hay turnos cancelados</Alert>
					) : (
						cancelList(appointments).map((items, index) => {
							return (
								<Accordion.Item
									className={styles.Accordion}
									eventKey={index}
									key={index}
								>
									<Accordion.Header>
										El usuario {user.name} canceló el turno
										del dia {items.date} a las {items.time}
									</Accordion.Header>
									<Accordion.Body>
										El usuario {user.name} canceló:{' '}
										{items.description}
									</Accordion.Body>
								</Accordion.Item>
							);
						})
					)
				) : (
					<div className="d-flex justify-content-center">
						<Spinner animation="grow" variant="secondary" />
					</div>
				)}
			</Accordion>
		</div>
	);
};

export default MyAppointments;
