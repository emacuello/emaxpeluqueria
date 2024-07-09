import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Navbar({ Styles, setView, view }) {
	const navigate = useNavigate();
	return (
		<nav className={`${Styles.cursor} nav nav-borders`}>
			<a
				className={`${Styles.linkNav} nav-link active ms-0  ${
					view === 'profile' && Styles.selected
				}`}
				onClick={() => setView('profile')}
			>
				Perfil
			</a>
			<a
				className={`${Styles.linkNav} nav-link ${
					view === 'payments' && Styles.selected
				}`}
				onClick={() => setView('payments')}
			>
				Pagos
			</a>
			<a
				className={`${Styles.linkNav} nav-link ${
					view === 'security' && Styles.selected
				}`}
				onClick={() => setView('security')}
			>
				Seguridad
			</a>
			<a
				className={`${Styles.linkNav} nav-link ${
					view === 'myAppointments' && Styles.selected
				}`}
				onClick={() => navigate('/myappointments')}
			>
				Mis turnos
			</a>
		</nav>
	);
}

export default Navbar;
