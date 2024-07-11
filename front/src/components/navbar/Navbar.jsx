import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from './NavbarBrand';
import NavbarContent from './NavbarContentCenter';
import NavbarLoginResgister from './NavbarLoginRegister';
import NavbarProfile from './NavbarProfile';
import NavbarContentLogin from './NavbarContentLogin';
import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowsSize';
const MyNavbar = () => {
	const [userLogin, setUserLogin] = useState(false);
	const { width } = useWindowSize();
	const breakpoint = 768;
	useEffect(() => {
		const userLogin = localStorage.getItem('token');
		if (userLogin) {
			setUserLogin(true);
		} else {
			setUserLogin(false);
		}
	}, []);
	const NavbarContentCenter = () => {
		if (!userLogin) {
			return <NavbarContent></NavbarContent>;
		} else {
			return <NavbarContentLogin></NavbarContentLogin>;
		}
	};
	const NavbarContentRight = () => {
		if (!userLogin) {
			return <NavbarLoginResgister></NavbarLoginResgister>;
		} else {
			return <NavbarProfile></NavbarProfile>;
		}
	};
	return (
		<>
			<Navbar expand="lg" className={`${styles.nav} sticky-top`}>
				<Container>
					<Navbar.Brand>
						<NavbarBrand className="d-inline-block align-top"></NavbarBrand>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse
						className="justify-content-center"
						id="basic-navbar-nav"
					>
						{NavbarContentCenter()}
						{width < breakpoint && NavbarContentRight()}
					</Navbar.Collapse>

					{width > breakpoint && NavbarContentRight()}
				</Container>
			</Navbar>
		</>
	);
};

export default MyNavbar;
