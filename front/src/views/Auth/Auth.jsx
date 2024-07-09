import { useEffect } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useNavigate } from 'react-router-dom';

function Auth() {
	const navigate = useNavigate();
	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const userToken = query.get('token');
		localStorage.setItem('token', userToken);
		setTimeout(() => {
			navigate('/home');
		}, 500);
	}, [navigate]);
	return (
		<div>
			<Spinner
				animation="grow"
				size="lg"
				className="m-5"
				variant="info"
			/>
			<h1>Autenticando...</h1>
		</div>
	);
}

export default Auth;
