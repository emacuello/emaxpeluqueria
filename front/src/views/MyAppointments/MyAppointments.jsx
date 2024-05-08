import Appointment from '../../components/appointment/Appointment';
import { useEffect } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { addAppointments } from '../../redux/reducers';
import styles from './MyAppointments.module.css';
import { Link } from 'react-router-dom';
const MyAppointments = () => {
	const id = useSelector((state) => state.user.user.user.id);
	const dispatch = useDispatch();
	useEffect(() => {
		try {
			const axiosData = async () => {
				const response = await axios(
					`http://localhost:3000/users/${id}`
				);
				dispatch(addAppointments(response.data));
			};
			axiosData();
		} catch (error) {
			console.error('Conexion fallida al Backend', error);
		}
	}, [dispatch, id]);
	const user = useSelector((state) => state.appointments.userAppointments);
	const appointments = user.appointment;
	const cancelList = (appointments) => {
		return appointments.filter((item) => {
			if (item.status === 'cancelled') return item;
		});
	};
	return (
		<div className="container">
			<h1 className={`${styles.tittle} text-center`}>Mis turnos</h1>
			<div className={styles.containerBtn}>
				<Link className={styles.a} to="/home">
					<button className={styles.btn}>Crear un nuevo turno</button>
				</Link>
			</div>
			{/* Un bug que no pude solucionar es que cuando existen turnos, ej, turnos activos existentes pero no hay turnos cancelados, que aparezca un alert en la vista de turnos cancelados, o viceversa, lo intente pero no pude lograrlo, el alert solo se mostrara cuando no existan turnos. */}
			<Accordion className="mt-5 mb-5">
				{!appointments.length ? (
					<Alert key="1" variant="info">
						No hay turnos disponibles
					</Alert>
				) : (
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
								/>
							);
						})
				)}
			</Accordion>

			<h2 className={`${styles.tittle} text-center`}>
				Turnos Cancelados
			</h2>
			<Accordion className="mt-5 mb-5">
				{!appointments.length ? (
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
									El usuario {user.name} canceló el turno del
									dia {items.date} a las {items.time}
								</Accordion.Header>
								<Accordion.Body>
									El usuario {user.name} canceló:{' '}
									{items.description}
								</Accordion.Body>
							</Accordion.Item>
						);
					})
				)}
			</Accordion>
		</div>
	);
};

export default MyAppointments;
