import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { validate, validateFields } from '../../helpers/validate';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Register.module.css';
import { registerData } from '../../helpers/register';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
const Register = () => {
	const [loading, setLoading] = useState(false);
	const [loadingGoogle, setLoadingGoogle] = useState(false);
	const [notAvailable, setNotAvailable] = useState([]);

	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	useEffect(() => {
		try {
			const axiosRequest = async () => {
				const response = await axios(`${VITE_BASE_URL}/users/username`);
				setNotAvailable(response.data);
			};
			axiosRequest();
		} catch (error) {
			console.log(error);
		}
	}, [VITE_BASE_URL]);
	useEffect(() => {
		Aos.init();
	}, []);
	const navigate = useNavigate();
	const [user, setUser] = useState(registerData);
	const [error, setError] = useState(registerData);
	const [secondPass, setSecondPass] = useState({ password: '' });
	const confirmPassword = (event) => {
		const { name, value } = event.target;
		setSecondPass({ ...secondPass, [name]: value });
	};
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });

		setError(validate(user));
	};
	const [validated, setValidated] = useState(false);
	const [feedback, setFeedback] = useState({ display: 'none' });
	useEffect(() => {
		setError(validate(user, notAvailable));
	}, [notAvailable, user]);

	const pass = () => {
		if (user.password === secondPass.password) {
			return true;
		}
		return false;
	};
	const isvalid = () => {
		if (user.password !== '' && secondPass.password !== '') {
			return pass();
		}
		return false;
	};

	const isInvalid = () => {
		if (user.password !== '' && secondPass.password !== '') {
			return !pass();
		}
		return false;
	};
	const validatePass = () => {
		if (user.password.length >= 8 && !error.password) return true;
		return false;
	};
	const [show, setShow] = useState({ estado: undefined });
	const postUsers = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			if (!validateFields(user) && pass()) {
				user.nDni = Number(user.nDni);
				await axios.post(`${VITE_BASE_URL}/auth/register`, user);
				setShow({ estado: true });
				timeOut();
				setValidated(true);
				setTimeout(() => {
					navigate('/login');
				}, 2500);
			} else {
				setShow({ estado: false });
				timeOut();
				setValidated(true);
				setFeedback({ display: 'block' });
				event.stopPropagation();
			}
		} catch (error) {
			setShow({ estado: false });
			timeOut();
			setValidated(true);
			setLoading(false);
			setFeedback({ display: 'block' });
			console.log(error);
		}
	};
	const timeOut = () => {
		if (show !== undefined) {
			setTimeout(() => {
				setShow({ estado: undefined });
			}, 5000);
		}
	};

	const googleLogin = () => {
		setLoadingGoogle(true);
		window.location.href = `${VITE_BASE_URL}/auth/google/login`;
	};
	return (
		<>
			<Form
				className={`container ${styles.form}`}
				noValidate
				validated={validated}
				data-aos="fade-down"
			>
				<h1 className="text-center mb-3">Crea tu cuenta</h1>
				{show.estado === true ? (
					<Alert className="container" variant="success">
						Los datos fueron enviados correctamente
					</Alert>
				) : show.estado === false ? (
					<Alert className="container" variant="danger">
						Los datos no fueron enviados, verificar los campos
					</Alert>
				) : null}
				<Row className="g-2">
					<Col md>
						<Form.Group as={Col} controlId="nameUser">
							<FloatingLabel
								className={styles.labelColor}
								label="Nombre"
							>
								<Form.Control
									value={user.name}
									name="name"
									type="text"
									className={styles.input}
									required
									placeholder="Por favor, introduce tu nombre"
									onChange={handleInputChange}
									isInvalid={error.name}
									isValid={
										user.name !== '' && !error.name && true
									}
								/>
							</FloatingLabel>
							{!user.name && (
								<Form.Control.Feedback
									style={feedback}
									type="invalid"
								>
									Por favor, introduce tu nombre.
								</Form.Control.Feedback>
							)}
						</Form.Group>
					</Col>
					<Col md>
						<Form.Group
							as={Col}
							controlId="validationCustomUsername"
						>
							<FloatingLabel
								className={styles.labelColor}
								controlId="floatingInputGrid"
								label="Username"
							>
								<Form.Control
									value={user.username}
									name="username"
									className={styles.input}
									required
									placeholder="Crea tu username"
									onChange={handleInputChange}
									isInvalid={error.username}
									isValid={
										user.username !== '' && !error.username
									}
								/>
								{user.username && (
									<Form.Control.Feedback type="invalid">
										{error.username}
									</Form.Control.Feedback>
								)}
							</FloatingLabel>
						</Form.Group>
					</Col>
				</Row>
				<Row className="g-2 mt-3">
					<Col md>
						<Form.Group as={Col}>
							<FloatingLabel
								className={styles.labelColor}
								label="DNI"
							>
								<Form.Control
									value={user.nDni}
									name="nDni"
									type="number"
									min="3"
									max="999999999"
									className={styles.input}
									required
									placeholder="Ingresa tu DNI"
									onChange={handleInputChange}
									isInvalid={error.nDni}
									isValid={user.nDni !== '' && !error.nDni}
								/>
								{error.nDni && (
									<Form.Control.Feedback type="invalid">
										{error.nDni}
									</Form.Control.Feedback>
								)}
							</FloatingLabel>
						</Form.Group>
					</Col>
					<Col md>
						<Form.Group as={Col}>
							<FloatingLabel
								className={styles.labelColor}
								label="Fecha de naciminento"
							>
								<Form.Control
									value={user.birthdate}
									name="birthdate"
									className={styles.input}
									required
									type="date"
									placeholder="Ingresa tu fecha de nacimiento"
									onChange={handleInputChange}
									isInvalid={error.birthdate}
									isValid={
										!error.birthdate &&
										user.birthdate !== ''
									}
								/>
								{error.birthdate && (
									<Form.Control.Feedback type="invalid">
										{error.birthdate}
									</Form.Control.Feedback>
								)}
							</FloatingLabel>
						</Form.Group>
					</Col>
				</Row>
				<Form.Group className="mb-3 mt-3">
					<FloatingLabel
						className={`${styles.labelColor} mb-3`}
						controlId="floatingInput"
						label="Correo Electrónico"
					>
						<Form.Control
							value={user.email}
							name="email"
							required
							type="email"
							className={styles.input}
							placeholder="name@example.com"
							onChange={handleInputChange}
							isInvalid={error.email}
							isValid={user.email !== '' && !error.email}
						/>
						{error.email && (
							<Form.Control.Feedback type="invalid">
								{error.email}
							</Form.Control.Feedback>
						)}
					</FloatingLabel>
				</Form.Group>

				<Form.Group className="mb-3">
					<FloatingLabel
						className={styles.labelColor}
						controlId="floatingPassword"
						label="Contraseña"
					>
						<Form.Control
							required
							type="password"
							value={user.password}
							name="password"
							minLength={8}
							className={styles.input}
							maxLength={15}
							placeholder="Ingrese tu contraseña"
							onChange={handleInputChange}
							isInvalid={error.password}
							isValid={validatePass()}
						/>
					</FloatingLabel>
					<Form.Text id="passwordHelpBlock" muted>
						Tu contraseña debe tener entre 8 y 15 caracteres, Al
						menos una letra minúscula, Al menos una letra mayúscula,
						Al menos un dígito, Al menos un carácter especial ( $,
						@, !, %, *, ?, &, ,, ., _ o -.) y Sin espacios en blanco
						al principio o al final
					</Form.Text>
					{error.password && (
						<Form.Control.Feedback
							style={{ display: 'block' }}
							type="invalid"
						>
							{error.password}
						</Form.Control.Feedback>
					)}
				</Form.Group>
				<Form.Group className="mb-3">
					<FloatingLabel
						className={styles.labelColor}
						label="Confirme tu contraseña"
					>
						<Form.Control
							value={secondPass.password}
							name="password"
							required
							type="password"
							className={styles.input}
							onChange={confirmPassword}
							placeholder="Confirme tu contraseña"
							isInvalid={isInvalid()}
							isValid={isvalid()}
						/>
					</FloatingLabel>
					<Form.Text id="passwordHelpBlock" muted>
						La contraseña debe coincidir
					</Form.Text>
					{!pass() && (
						<Form.Control.Feedback
							style={{ display: 'block' }}
							type="invalid"
						>
							Por favor, las contraseñas deben coincidir.
						</Form.Control.Feedback>
					)}
				</Form.Group>
				<Form.Group className="mb-3 mt-3" id="formGridCheckbox">
					<Form.Check
						className={styles.customCheckbox}
						required
						type="checkbox"
						label="Acepto terminos y condiciones"
					/>
				</Form.Group>

				{!loading ? (
					<>
						<Button
							onClick={postUsers}
							className={`${styles.btn} w-100`}
							type="submit"
						>
							Enviar
						</Button>
						<Button
							onClick={googleLogin}
							className={`${styles.btn} w-100 mt-3`}
						>
							{loadingGoogle ? (
								<>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Registrando con...
								</>
							) : (
								`Registrarme con Google ${'   '}${' '}`
							)}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#cc82e8"
								className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google "
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
							</svg>
						</Button>
					</>
				) : (
					<>
						<Button
							disabled={true}
							className={`${styles.btn} w-100`}
							type="submit"
						>
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							Registrando...
						</Button>
						<Button
							disabled={true}
							className={`${styles.btn} w-100 mt-3`}
							type="submit"
						>
							Registrarme con Google{' '}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="#cc82e8"
								className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google "
							>
								<path
									stroke="none"
									d="M0 0h24v24H0z"
									fill="none"
								/>
								<path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
							</svg>
						</Button>
					</>
				)}
				{show.estado === true ? (
					<Alert className="container mt-3" variant="success">
						Los datos fueron enviados correctamente
					</Alert>
				) : show.estado === false ? (
					<Alert className="container mt-3" variant="danger">
						Los datos no fueron enviados, verificar los campos
					</Alert>
				) : null}
			</Form>
		</>
	);
};

export default Register;
