import { Link, useNavigate } from 'react-router-dom';
import styles from './NavbarProfile.module.css';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../redux/reducers';
const NavbarProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const logOut = () => {
		dispatch(userLogOut());
		//Por alguna extraña razon, no se si relacionada a la magia negre pero similar, el navigate no me funciona sin usar el SetTimeout, pero bueno, tuve que hacerlo para darle esa hermosa funcionalidad.
		setTimeout(() => {
			navigate('/');
		}, 100);
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
								<Link className={styles.a} onClick={logOut}>
									Logout
								</Link>
							</div>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</>
		</>
	);
};

export default NavbarProfile;
