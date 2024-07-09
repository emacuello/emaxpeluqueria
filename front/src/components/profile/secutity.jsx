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
function Security({ Styles, user }) {
	const [token, setToken] = useState(null);
	const [data, setData] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [userSocial, setUserSocial] = useState(false);
	const [userServer, setUserServer] = useState(false);
	const [show, setShow] = useState(false);
	const [show2, setShow2] = useState(false);
	const [confirm, setConfirm] = useState(null);
	const [loader, setLoader] = useState(false);
	const [loaderDelete, setLoaderDelete] = useState(false);
	const [errorUpdate, setErrorUpdate] = useState(null);
	const [errorDelete, setErrorDelete] = useState(null);
	const [showAlert1, setShowAlert] = useState(null);

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
	}, []);

	useEffect(() => {
		if (user) {
			setUserSocial(user.socialUser);
			setUserServer(user.serverPrincipal);
		}
		console.log(userServer);
	}, [user, userServer]);
	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
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
		try {
			const response = await axios.put(
				`${VITE_BASE_URL}/users/${user.id}`,
				data,
				config
			);
			if (response.data) {
				setLoader(false);
				setData(response.data);
				setShowAlert('true');
			}
		} catch (error) {
			setLoader(false);
			console.log(error);
			setErrorUpdate(error.data);
			setShowAlert('false');
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
				console.log(response.data);
				if (response.data) {
					setShow(false);
					setLoaderDelete(false);
					showAlert();
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
			<div className="col-lg-8">
				<div className="card mb-4">
					<div className={`${Styles.bgHeader2} card-header`}>
						Cambiar contraseña
					</div>
					<div className={`${Styles.bgMain2} card-body`}>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								{!userServer ? (
									<>
										<label
											className="small mb-1"
											htmlFor="currentPassword"
										>
											Contraseña actual
										</label>
										<input
											className="form-control"
											id="currentPassword"
											type="password"
											placeholder="Enter current password"
											name="currentPassword"
											onChange={handleChange}
										/>
									</>
								) : (
									<>
										<label
											className="small mb-1"
											htmlFor="currentPassword"
										>
											Username
										</label>
										<input
											className="form-control"
											id="currentPassword"
											type="text"
											placeholder="Ingresa tu username"
											name="username"
											onChange={handleChange}
										/>
										<Form.Text id="usernameHelpBlock" muted>
											Los usuarios de plataformas sociales
											deben ingresar un username y una
											contraseña por unica vez para crear
											sus credenciales, el username no se
											podrá cambiar, a menos que contactes
											al administrador.
										</Form.Text>
									</>
								)}
							</div>
							<div className="mb-3">
								<label
									className="small mb-1"
									htmlFor="newPassword"
								>
									Nueva contraseña
								</label>
								<input
									className="form-control"
									id="newPassword"
									type="password"
									placeholder="Enter new password"
									name="newPassword"
									required
									onChange={handleChange}
								/>
							</div>
							<div className="mb-3">
								<label
									className="small mb-1"
									htmlFor="confirmPassword"
								>
									Confirmar nueva contraseña
								</label>
								<input
									className="form-control"
									id="confirmPassword"
									type="password"
									required
									placeholder="Confirm new password"
									name="confirmPassword"
									onChange={handleChange}
								/>
							</div>
							{loader ? (
								<button className={Styles.btn} type="submit">
									<Spinner animation="border" />
									Actualizar
								</button>
							) : (
								<button className={Styles.btn} type="submit">
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
			<div className="col-lg-4">
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
