import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import styles from './NavbarContentCenter.module.css';
const NavbarContentLogin = () => {
	return (
		<>
			<Nav>
				<Link className={styles.a} to={'/home'}>
					Home
				</Link>
				<Link className={styles.a} to={'/myappointments'}>
					Mis turnos
				</Link>
				<Link className={styles.a} to={'/locals'}>
					Salones
				</Link>
				<Link className={styles.a} to={'/contacts'}>
					Contacto
				</Link>
			</Nav>
		</>
	);
};

export default NavbarContentLogin;
