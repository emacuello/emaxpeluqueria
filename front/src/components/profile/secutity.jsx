/* eslint-disable react/prop-types */
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { useEffect, useState } from 'react';
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Aos from 'aos';
import {
	validateFieldsErrors,
	validateFieldsErrors2,
	validateSecurity,
} from '../../helpers/validate';
function Security({ Styles, user }) {
	const [token, setToken] = useState(null);
	const [data, setData] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [userSocial, setUserSocial] = useState(null);
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [confirm, setConfirm] = useState(null);
	const [loader, setLoader] = useState(false);
	const [loaderDelete, setLoaderDelete] = useState(false);
	const [errorUpdate, setErrorUpdate] = useState(null);
	const [errorDelete, setErrorDelete] = useState(null);
	const [showAlert1, setShowAlert] = useState(null);
	const [error, setError] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		password: '',
	});

	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">Los textos no coinciden</Popover.Header>
			<Popover.Body>
				Los textos deben coincidir, por favor, introduce los datos de
				nuevo.
			</Popover.Body>
		</Popover>
	);
	const handleClose = () => setShow(false);
	const handleClose2 = () => setShow2(false);
	const handleShow = () => setShow(true);
	const handleShow2 = () => setShow2(true);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const currentToken = localStorage.getItem('token');
		setToken(currentToken);
		Aos.init();
	}, []);

	useEffect(() => {
		setError(validateSecurity(data));
	}, [data]);
	useEffect(() => {
		setUserSocial(user.socialUser);
	}, [user]);
	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};
	const validatePass = (password) => {
		if (data[password]?.length >= 8 && !error[password]) return true;
		return false;
	};

	const handleSubmit = async (event) => {
		setLoader(true);
		event.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		if (validateFieldsErrors2(data)) {
			const newData = {
				newPassword: data.newPassword,
				confirmPassword: data.confirmPassword,
			};
			if (data.username) {
				newData.username = data.username;
			} else {
				newData.oldPassword = data.oldPassword;
			}
			try {
				const response = await axios.put(
					`${VITE_BASE_URL}/auth/changePassword`,
					newData,
					config
				);
				if (response.data) {
					setLoader(false);
					setShowAlert('true');
					setData({
						oldPassword: '',
						newPassword: '',
						confirmPassword: '',
					});
					showAlert();
				}
			} catch (error) {
				setLoader(false);
				console.log(error);

				setErrorUpdate(error.response.data.message);
				setShowAlert('false');
				showAlert();
			}
		} else {
			setLoader(false);
			alert('Por favor, rellena todos los campos');
		}
	};
	const handleDelete = async (event) => {
		event.preventDefault();
		setLoaderDelete(true);
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		if (confirm === user.email) {
			try {
				const response = await axios.delete(
					`${VITE_BASE_URL}/users`,
					config
				);

				if (response.data) {
					setShow(false);
					setLoaderDelete(false);
					handleShow2();
				}
			} catch (error) {
				console.log(error);
				setErrorDelete(error.data);
				setLoaderDelete(false);
				setShow(false);
				handleShow2();
			}
		} else {
			setLoaderDelete(false);
		}
	};
	const showAlert = () => {
		setTimeout(() => {
			setShowAlert(null);
		}, 3000);
	};

	const eliminatedAccount = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('product');
		window.location.href = '/';
	};

	return (
		<div className="row">
			<div className="col-lg-8" data-aos="zoom-in">
				<div className="card mb-4">
					<div className={`${Styles.bgHeader2} card-header`}>
						Cambiar contraseña
					</div>
					<div className={`${Styles.bgMain2} card-body`}>
						<form onSubmit={handleSubmit}>
							{userSocial ? (
								<>
									<Form.Text muted>
										Los usuarios de plataformas sociales no
										pueden cambiar su contraseña.
									</Form.Text>
								</>
							) : (
								<Form.Text muted>
									Tu contraseña debe tener entre 8 y 15
									caracteres, Al menos una letra minúscula, Al
									menos una letra mayúscula, Al menos un
									dígito, Al menos un carácter especial ( $,
									@, !, %, *, ?, &, ,, ., _ o -.) y Sin
									espacios en blanco al principio o al final
								</Form.Text>
							)}

							<div className="mb-3 mt-3">
								<label
									className="small mb-1"
									htmlFor="oldPassword"
								>
									Contraseña actual
								</label>

								<Form.Control
									required
									type="password"
									value={data.oldPassword}
									id="oldPassword"
									name="oldPassword"
									disabled={userSocial}
									minLength={8}
									maxLength={15}
									placeholder="Ingrese tu contraseña actual"
									onChange={handleChange}
									isInvalid={error.oldPassword}
									isValid={validatePass('oldPassword')}
								/>
							</div>
							<div className="mb-3">
								<label
									className="small mb-1"
									htmlFor="newPassword"
								>
									Nueva contraseña
								</label>

								<Form.Control
									required
									type="password"
									value={data.newPassword}
									id="newPassword"
									name="newPassword"
									disabled={userSocial}
									minLength={8}
									maxLength={15}
									placeholder="Ingrese tu nueva contraseña"
									onChange={handleChange}
									isInvalid={error.newPassword}
									isValid={validatePass('newPassword')}
								/>
								{error.newPassword && (
									<Form.Control.Feedback type="invalid" muted>
										{error.newPassword}
									</Form.Control.Feedback>
								)}
							</div>
							<div className="mb-3">
								<label
									className="small mb-1"
									htmlFor="confirmPassword"
								>
									Confirmar nueva contraseña
								</label>
								<Form.Control
									required
									type="password"
									id="confirmPassword"
									value={data.confirmPassword}
									name="confirmPassword"
									disabled={userSocial}
									minLength={8}
									maxLength={15}
									placeholder="Confirme tu nueva contraseña"
									onChange={handleChange}
									isInvalid={
										error.confirmPassword || error.password
									}
									isValid={validatePass('confirmPassword')}
								/>
								{error.confirmPassword && (
									<Form.Control.Feedback type="invalid">
										{error.confirmPassword}
									</Form.Control.Feedback>
								)}
								{error.password && (
									<Form.Control.Feedback type="invalid">
										{error.password}
									</Form.Control.Feedback>
								)}
							</div>
							{loader ? (
								<button
									className={Styles.btn}
									type="submit"
									disabled
								>
									<Spinner animation="border" />
									Actualizando...
								</button>
							) : (
								<button
									className={Styles.btn}
									type="submit"
									disabled={
										userSocial
											? true
											: !validateFieldsErrors(error)
									}
									title="Al darle click en actualizar, se guardaran los cambios"
								>
									Actualizar
								</button>
							)}
							{showAlert1 === 'true' ? (
								<Alert variant="success mt-2">
									Datos actualizados!
								</Alert>
							) : (
								''
							)}
							{showAlert1 === 'false' ? (
								<Alert variant="danger mt-2">
									{errorUpdate}
								</Alert>
							) : (
								''
							)}
						</form>
					</div>
				</div>
			</div>
			<div className="col-lg-4" data-aos="zoom-out-up">
				<div className="card mb-4">
					<div className={`${Styles.bgHeader2} card-header`}>
						Eliminar cuenta
					</div>
					<div className={`${Styles.bgMain2} card-body`}>
						<p>
							Eliminar su cuenta es una acción permanente y no se
							puede deshacer. Si estás seguro de que deseas
							eliminar su cuenta, seleccione el botón a
							continuación. Los datos de la cuenta se perderan
							permanentemente
						</p>
						<button
							className="btn btn-danger text-white"
							type="button"
							onClick={handleShow}
							title="Esta acción no es reversible, pienselo con cuidado"
						>
							Lo entiendo, eliminar cuenta
						</button>
					</div>
				</div>
			</div>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header className={Styles.bgHeader2} closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body className={Styles.bgMain2}>
					<Form>
						<h4 className="mb-3">Eliminar cuenta</h4>
						<p>
							Se eliminar los turnos, pedidos y registro de
							actividad dentro de la plataforma
						</p>
						<Alert variant="danger">
							<Alert.Link>Advertencia: </Alert.Link> Esta acción
							no es reversible, pienselo con cuidado
						</Alert>

						<Form.Label htmlFor="inputConfirm">
							Por favor ingresa{' '}
							<span className={Styles.mail}>{user.email}</span>{' '}
							para confirma
						</Form.Label>

						<Form.Control
							type="text"
							id="inputConfirm"
							aria-describedby="confirm"
							name="confirm"
							disabled={loaderDelete}
							value={confirm}
							onChange={(event) => setConfirm(event.target.value)}
						/>
						<Form.Text id="passwordHelpBlock" muted>
							Recuerda que esta accion es irreversible. Tu cuenta
							con todos tus datos eran eliminadas de forma
							permanente
						</Form.Text>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						disabled={loaderDelete}
						onClick={handleClose}
					>
						Cerrar
					</Button>
					{loaderDelete ? (
						<Button variant="danger" disabled>
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							Procesando...
						</Button>
					) : (
						<OverlayTrigger
							trigger="click"
							placement="top"
							overlay={confirm !== user.email ? popover : null}
						>
							<Button variant="danger" onClick={handleDelete}>
								Eliminar cuenta
							</Button>
						</OverlayTrigger>
					)}
				</Modal.Footer>
			</Modal>
			<Modal
				show={show2}
				onHide={handleClose2}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header className={Styles.bgHeader2}>
					<Modal.Title>
						{errorDelete
							? 'Error al eliminar la cuenta'
							: 'Tu cuenta ha sido eliminada correctamente'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className={Styles.bgMain2}>
					{errorDelete
						? { errorDelete }
						: 'Tu cuenta ha sido eliminada 😞'}
				</Modal.Body>
				<Modal.Footer className={Styles.bgMain2}>
					{errorDelete ? (
						<Button variant="sucess" onClick={handleClose2}>
							Cerrar
						</Button>
					) : (
						<Button variant="info" onClick={eliminatedAccount}>
							Lo entiendo 😞
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Security;
