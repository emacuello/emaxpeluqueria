import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './NavbarLoginRegister.module.css';

const NavbarLoginResgister = () => {
	return (
		<div>
			<Link to="/login">
				<Button className={styles.btn}>Login/Register</Button>
			</Link>
		</div>
	);
};
export default NavbarLoginResgister;
