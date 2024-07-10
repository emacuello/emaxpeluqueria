import Appointment from '../../components/appointment/Appointment';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styles from './MyAppointments.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointments, changeAppointments } from '../../redux/reducers';
import Toast from 'react-bootstrap/Toast';

const MyAppointments = () => {
	const [appointments, setAppointments] = useState({});
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loader, setLoader] = useState(false);
	const [show, setShow] = useState(false);
	const [cancelAppointment, setCancelAppointment] = useState({
		id: 0,
		date: '',
		time: '',
		description: '',
		status: '',
	});
	const navigate = useNavigate();
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	const dispatch = useDispatch();
	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			navigate('/');
		}
		setToken(userToken);
	}, [navigate]);
	const userAppointments = useSelector(
		(state) => state.appointments?.userAppointments
	);
	useEffect(() => {
		console.log(userAppointments);
		if (userAppointments['appointment']) {
			setAppointments(userAppointments?.appointment);
			setUser(userAppointments);
			setLoader(true);
			return;
		} else {
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
					dispatch(addAppointments(response.data));
					setUser(response.data);
					setLoader(true);
				};
				if (token) {
					axiosData();
				}
			} catch (error) {
				console.error(error);
				localStorage.removeItem('token');
				navigate('/');
			}
		}
	}, [navigate, VITE_BASE_URL, token, userAppointments, dispatch]);

	const cancelList = (appointments) => {
		return appointments.filter((item) => {
			if (item?.status === 'cancelled') return item;
		});
	};
	const activeList = (appointments) => {
		return appointments.filter((item) => {
			if (item?.status === 'active') return item;
		});
	};
	console.log(userAppointments);
	const cancelAppointments = (id) => {
		console.log(id);
		dispatch(changeAppointments(id));
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
					activeList(appointments).length &&
					appointments?.length > 0 ? (
						appointments
							.filter((items) => {
								if (items?.status === 'active') return items;
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
										setCancelAppointment={
											setCancelAppointment
										}
										setShow2={setShow}
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
					!appointments?.length && cancelList(appointments).length ? (
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
			<Toast
				onClose={() => setShow(false)}
				show={show}
				delay={3000}
				autohide
				bg="info"
				className="position-fixed bottom-50 start-50 translate-middle end-50 p-3 z-50"
			>
				<Toast.Header>
					<img
						src="holder.js/20x20?text=%20"
						className="rounded me-2"
						alt=""
					/>
					<strong className="me-auto">El turno fue cancelado</strong>
				</Toast.Header>
				<Toast.Body className="text-black">
					El turno de {cancelAppointment.description} del dia{' '}
					{cancelAppointment.date} fue cancelado con exito
				</Toast.Body>
			</Toast>
		</div>
	);
};

export default MyAppointments;
