import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css';
import { validateFields, validateLogin } from '../../helpers/validate';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/reducers';
import Aos from 'aos';
const Login = () => {
	const [loading, setLoading] = useState(false);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	const navigate = useNavigate();
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/');
		}
		Aos.init();
	}, [navigate]);
	const dispatch = useDispatch();
	const [LoginData, setLoginData] = useState({
		username: '',
		password: '',
	});
	const handleLogin = (event) => {
		event.preventDefault();
		const { name, value } = event.target;
		setLoginData({ ...LoginData, [name]: value });
		setError(validateLogin(LoginData));
	};

	const [errors, setError] = useState({
		username: '',
		password: '',
	});
	useEffect(() => {
		setError(validateLogin(LoginData));
	}, [LoginData]);
	const [showAlert, setShowAlert] = useState({ estado: undefined });
	const [validateForm, setValidateForm] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			if (!validateFields(LoginData)) {
				const response = await axios.post(
					`${VITE_BASE_URL}/auth/login`,
					LoginData
				);
				dispatch(addUser(response.data.user));
				localStorage.setItem('token', response.data.token);
				setShowAlert({ estado: true });
				setValidateForm(true);
				timeOut();
				setTimeout(() => {
					window.location.href = '/home';
				}, 200);
			} else {
				setShowAlert({ estado: false });
				setValidateForm(true);
				timeOut();
			}
		} catch (error) {
			setShowAlert({ estado: false });
			setValidateForm(true);
			timeOut();
			setLoading(false);
			console.error('Error al iniciar sesión');
		}
	};
	const validatedPass = () => {
		if (!isValidPassword()) return 'is-invalid';
	};
	const validatedUser = () => {
		if (!isValidUsername()) return 'is-invalid';
	};
	const isValidUsername = () => {
		if (LoginData.username !== '') {
			if (errors.username) {
				return 'is-invalid';
			} else return 'is-valid';
		}
		return '';
	};
	const isValidPassword = () => {
		if (LoginData.password.length > 1) {
			if (errors.password) {
				return 'is-invalid';
			} else return 'is-valid';
		}
		return '';
	};
	const timeOut = () => {
		if (showAlert !== undefined) {
			setTimeout(() => {
				setShowAlert({ estado: undefined });
				setValidateForm(false);
			}, 5000);
		}
	};
	return (
		<div className={`${styles.login}`}>
			<div className={`${styles.AuthFormContainer}`}>
				<form
					className={`${styles.AuthForm} ${validateForm}`}
					data-aos="fade-down"
				>
					<div className={`${styles.AuthFormContent}`}>
						<h3 className={styles.AuthFormTitle}>Login</h3>
						{showAlert.estado === true ? (
							<Alert variant="success">
								Haz iniciado sesion correctamente!
							</Alert>
						) : showAlert.estado === false ? (
							<Alert variant="danger">
								Error al inicar sesión. Intentalo de nuevo
							</Alert>
						) : null}
						<div className="form-group mt-3">
							<label>Username</label>
							<input
								type="text"
								maxLength={50}
								className={`${
									styles.inputLogin
								} form-control mt-1 ${
									validateForm
										? validatedUser()
										: isValidUsername()
								} ${styles.input}`}
								placeholder="Ingresa tu Username"
								name="username"
								required
								value={LoginData.username}
								onChange={handleLogin}
							/>
							<Form.Control.Feedback type="invalid">
								Por favor, ingresa un Username válido
							</Form.Control.Feedback>
						</div>
						<div className="form-group mt-3">
							<label>Contraseña</label>
							<input
								type="password"
								required
								className={`${
									styles.inputLogin
								} form-control mt-1 ${
									validateForm
										? validatedPass()
										: isValidPassword()
								} ${styles.input}`}
								placeholder="Ingresa tu contraseña"
								onChange={handleLogin}
								name="password"
								value={LoginData.password}
								minLength={8}
								maxLength={15}
							/>
							{!errors.password ? (
								<Form.Control.Feedback type="invalid">
									Por favor, ingresa una contraseña
								</Form.Control.Feedback>
							) : (
								<Form.Control.Feedback type="invalid">
									{errors.password}
								</Form.Control.Feedback>
							)}
						</div>
						<div className="d-grid gap-2 mt-3">
							{!loading ? (
								<button
									onClick={handleSubmit}
									type="submit"
									className={styles.btn}
								>
									Ingresar
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
									Ingresando ..
								</button>
							)}
						</div>
						<p className="forgot-password text-right mt-2">
							No estas registrado?{' '}
							<Link className={styles.a} to={'/register'}>
								Registrate!
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
