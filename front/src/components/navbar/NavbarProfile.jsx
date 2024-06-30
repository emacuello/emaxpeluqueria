import { Link, useNavigate } from 'react-router-dom';
import styles from './NavbarProfile.module.css';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/reducers';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const NavbarProfile = () => {
	const [show, setShow] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const dispatch = useDispatch();
	const userGlobal = useSelector((state) => state.user.user);
	const [loader, setLoader] = useState(false);
	const navigate = useNavigate();
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const userToken = localStorage.getItem('token');
		if (!userToken) {
			navigate('/');
		}
		setToken(userToken);
	}, [navigate, token]);

	useEffect(() => {
		if (userGlobal.id) {
			setUser(userGlobal);
			setLoader(true);
			return;
		} else {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			const axiosResponse = async () => {
				const response = await axios(
					`${VITE_BASE_URL}/users/token`,
					config
				);
				console.log(response.data);
				setUser(response.data);
				dispatch(addUser(response.data));
				setLoader(true);
			};
			if (token) {
				axiosResponse();
			}
		}
	}, [user, dispatch, userGlobal, token, VITE_BASE_URL]);
	const logOut = () => {
		localStorage.removeItem('token');

		window.location.href = '/';
	};
	return (
		<>
			<>
				{!loader ? (
					<Spinner animation="grow" />
				) : (
					user.image && (
						<Dropdown className={styles.newbg}>
							<Dropdown.Toggle>
								<Image
									className={styles.img}
									src={user.image}
									alt="userProfile"
								/>
							</Dropdown.Toggle>
							<Dropdown.Menu className={styles.dropdown}>
								<Dropdown.Item>
									<div>
										<Link
											className={styles.a}
											to={'/profile'}
										>
											Mi perfil
										</Link>
									</div>
								</Dropdown.Item>
								<Dropdown.Item>
									<div>
										<Link
											className={styles.a}
											to={'/myappointments'}
										>
											Mis turnos
										</Link>
									</div>
								</Dropdown.Item>
								<Dropdown.Item>
									<div>
										<Link
											className={styles.a}
											onClick={handleShow}
										>
											Logout
										</Link>
									</div>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					)
				)}
			</>
			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Seguro que quieres salir?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Si cierras sesión, tienes que volver a ingresar tus
					credenciales!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="primary" onClick={logOut}>
						Cerrar sesión
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default NavbarProfile;
