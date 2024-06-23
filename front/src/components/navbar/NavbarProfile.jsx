import { Link } from 'react-router-dom';
import styles from './NavbarProfile.module.css';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
const NavbarProfile = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const logOut = () => {
		localStorage.removeItem('token');

		window.location.href = '/';
	};
	return (
		<>
			<>
				<Dropdown className={styles.newbg}>
					<Dropdown.Toggle>
						<Image
							className={styles.img}
							src="https://i.ibb.co/8Ns4z0t/user-center-5-128.png"
							alt="userProfile"
						/>
					</Dropdown.Toggle>
					<Dropdown.Menu className={styles.dropdown}>
						<Dropdown.Item>
							<div>
								<Link className={styles.a} to={'/profile'}>
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
								<Link className={styles.a} onClick={handleShow}>
									Logout
								</Link>
							</div>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
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
