import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import styles from './NavbarLoginRegister.module.css';
import MiniCart from '../minicart/MiniCart';
import useWindowSize from '../../hooks/useWindowsSize';
const NavbarLoginResgister = () => {
	const { width } = useWindowSize();
	const breakpoint = 768;

	return (
		<>
			{width < breakpoint ? (
				<>
					<MiniCart />
					<div>
						<Link to="/login">
							<Button
								className={`${styles.btn} mt-2 mb-2 mb-md-0`}
							>
								Login/Register
							</Button>
						</Link>
					</div>
				</>
			) : (
				<>
					<MiniCart />
					<div>
						<Link to="/login">
							<Button className={styles.btn}>
								Login/Register
							</Button>
						</Link>
					</div>
				</>
			)}
		</>
	);
};
export default NavbarLoginResgister;
