import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { validate, validateFields } from '../../helpers/validate';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import styles from './Register.module.css';
import { registerData } from '../../helpers/register';
import { useNavigate } from 'react-router-dom';
const Register = () => {
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
		setError(validate(user));
	}, [user]);

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
		try {
			if (!validateFields(user) && pass()) {
				await axios.post(
					'https://emaxpeluqueria-back.vercel.app/users/register',
					user
				);
				setShow({ estado: true });
				timeOut();
				setValidated(true);
				setTimeout(() => {
					navigate('/login');
				}, 1500);
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
	return (
		<>
			<Form
				className={`container ${styles.form}`}
				noValidate
				validated={validated}
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
										user.username !== '' &&
										!error.username &&
										true
									}
								/>
							</FloatingLabel>
							{!user.username && (
								<Form.Control.Feedback
									style={feedback}
									type="invalid"
								>
									Por favor, introduce tu username.
								</Form.Control.Feedback>
							)}
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
									isValid={
										user.nDni !== '' && !error.nDni && true
									}
								/>
							</FloatingLabel>
							{!user.nDni && (
								<Form.Control.Feedback
									style={feedback}
									type="invalid"
								>
									Por favor, introduce tu DNI.
								</Form.Control.Feedback>
							)}
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
										user.birthdate !== '' &&
										!error.birthdate &&
										true
									}
								/>
							</FloatingLabel>
							{!user.birthdate && (
								<Form.Control.Feedback
									style={feedback}
									type="invalid"
								>
									Por favor, introduce tu fecha de nacimiento.
								</Form.Control.Feedback>
							)}
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
							isValid={user.email !== '' && !error.email && true}
						/>
					</FloatingLabel>
					{!user.email && (
						<Form.Control.Feedback style={feedback} type="invalid">
							Por favor, introduce tu correo electrónico.
						</Form.Control.Feedback>
					)}
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

				<Button
					onClick={postUsers}
					className={`${styles.btn} w-100`}
					type="submit"
				>
					Enviar
				</Button>
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
