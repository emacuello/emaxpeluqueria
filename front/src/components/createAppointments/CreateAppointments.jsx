import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styles from './CreateAppointments.module.css';
import { myAppointments } from '../../helpers/myAppointments';
import { validateAppointments } from '../../helpers/validate';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
const CreateAppointments = () => {
	const [id, SetId] = useState(null);
	const [appointment, setAppointment] = useState(myAppointments);
	const [error, setError] = useState(myAppointments);
	const [token, setToken] = useState('');
	const [success, setSuccess] = useState({ estado: undefined });
	const [loading, setLoading] = useState(false);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	const navigate = useNavigate();
	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			navigate('/');
		}
		console.log(userToken);
		setToken(userToken);
		console.log(token);
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
				const response = await axios.get(
					`${VITE_BASE_URL}/users/token`,
					config
				);
				SetId(response.data.id);
			};
			if (token) {
				axiosData();
			}
		} catch (error) {
			console.error(error);
		}
	}, [VITE_BASE_URL, token]);

	const handleInputs = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setAppointment({ ...appointment, [name]: value, userid: id });
	};
	const validateInput = (name) => {
		if (appointment[name] !== '') return 'is-valid';
		return '';
	};
	useEffect(() => {
		setError(validateAppointments(appointment));
	}, [appointment]);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			if (!error.description && !error.date && !error.time) {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				};
				await axios.post(
					`${VITE_BASE_URL}/appointment/schedule`,
					appointment,
					config
				);
				setAppointment(myAppointments);
				setSuccess({ estado: true });
				setTimeout(() => {
					setSuccess({ estado: undefined });
				}, 8000);
				setLoading(false);
			} else {
				setSuccess({ estado: false });
				setLoading(false);
				setTimeout(() => {
					setSuccess({ estado: undefined });
				}, 5000);
			}
		} catch (error) {
			setSuccess({ estado: false });
			setLoading(false);
			setTimeout(() => {
				setSuccess({ estado: undefined });
			}, 5000);
			console.error('Error al crear turno', error);
		}
	};

	return (
		<div>
			<h1 className="text-center mt-5 mb-2 fw-semibold">
				Agendá un turno!
			</h1>

			<div className={styles.FormContainer}>
				<form className={styles.form} onSubmit={handleSubmit}>
					{success.estado === true ? (
						<Alert variant="success">
							Genial, el turno fue creado con exito! Puedes
							comprobarlo{' '}
							<Link
								className={styles.link}
								to={'/myappointments'}
							>
								aqui
							</Link>
						</Alert>
					) : success.estado === false ? (
						<Alert variant="danger">
							Oops, error al crear el turno, por favor intentelo
							nuevamente!
						</Alert>
					) : null}
					<div className="row">
						<div className="col-12">
							<div className="form-floating">
								<input
									type="date"
									name="date"
									className={`${styles.inputs} form-control ${
										error.date
											? 'is-invalid'
											: validateInput('date')
									}`}
									required
									onChange={handleInputs}
									value={appointment.date}
								/>
								<label htmlFor="">Dia</label>
								<Form.Text muted>
									Recuerda que nuestra tienda no está abierta
									los dias Domingos y los dias Lunes
								</Form.Text>
								<div className="invalid-feedback">
									{error.date}
								</div>
							</div>
						</div>
						<div className="col-12">
							<select
								className={`${
									styles.inputs
								} form-select form-select-lg ${
									error.time
										? 'is-invalid'
										: validateInput('time')
								}`}
								aria-label="Large select example"
								name="time"
								onChange={handleInputs}
								value={appointment.time}
								required
							>
								<option selected>Horarios</option>
								<option value="09:00">09:00</option>
								<option value="09:30">09:30</option>
								<option value="10:00">10:00</option>
								<option value="10:30">10:30</option>
								<option value="11:00">11:00</option>
								<option value="11:30">11:30</option>
								<option value="12:00">12:00</option>
								<option value="12:30">12:30</option>
								<option value="15:00">15:00</option>
								<option value="15:30">15:30</option>
								<option value="16:00">16:00</option>
								<option value="16:30">16:30</option>
								<option value="17:00">17:00</option>
								<option value="17:30">17:30</option>
								<option value="18:00">18:00</option>
								<option value="18:30">18:30</option>
								<option value="19:00">19:00</option>
								<option value="19:30">19:30</option>
							</select>
							<Form.Text muted>
								Nuestro horario de atencion es de las 9 de la
								mañana hasta 12:30, luego de las 15:00 hasta las
								19:30
							</Form.Text>
							<div className="invalid-feedback">{error.time}</div>
						</div>
						<div className="col-12">
							<select
								className={`${
									styles.inputs
								} form-select form-select-lg mb-3 ${
									error.description &&
									appointment.description !== ''
										? 'is-invalid'
										: validateInput('description')
								}`}
								name="description"
								required
								onChange={handleInputs}
								value={appointment.description}
							>
								<option selected>Servicios</option>
								<option value="Corte de pelo">
									Corte de pelo
								</option>
								<option value="Corte de barba">
									Corte de barba
								</option>
								<option value="Corte de pelo y barba">
									Corte de pelo y barba
								</option>
								<option value="Corte de pelo, barba y unisex">
									Corte de pelo, barba y unisex
								</option>
								<option value="Tinte de barba">
									Tinte de barba
								</option>
								<option value="Tintura">Tintura</option>
								<option value="Alisado de cabello">
									Alisado de cabello
								</option>
								<option value="Tratamiento capilar">
									Tratamiento capilar
								</option>
								<option value="Tratamiento de barba">
									Tratamiento de barba
								</option>
								<option value="Manicura">Manicura</option>
								<option value="Pelucas">Pelucas</option>
								<option value="Permanente">Permanente</option>
							</select>
							<div className="invalid-feedback">
								{error.description}
							</div>
						</div>
					</div>

					<div className={styles.ContainerBtn}>
						{!loading ? (
							<button
								disabled={
									appointment.date === '' ||
									appointment.time === '' ||
									appointment.description === '' ||
									error.date ||
									error.time ||
									error.description
								}
								className={styles.btn}
								type="submit"
							>
								Agendar
							</button>
						) : (
							<button className={styles.btn} disabled>
								<Spinner
									as="span"
									animation="grow"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
								Agendando...
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateAppointments;
