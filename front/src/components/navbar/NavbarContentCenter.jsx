import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styles from './NavbarContentCenter.module.css';
const NavbarContent = () => {
	return (
		<>
			<Nav>
				<Link className={styles.a} to="/">
					Inicio
				</Link>
				<Link className={styles.a} to={'/shops'}>
					Tienda
				</Link>
				<Link className={styles.a} to={'/aboutus'}>
					Sobre nosotros
				</Link>
				<Link className={styles.a} to={'/services'}>
					Servicios
				</Link>
			</Nav>
		</>
	);
};
export default NavbarContent;
