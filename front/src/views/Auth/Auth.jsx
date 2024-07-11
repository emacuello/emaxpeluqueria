import { useEffect } from 'react';
import Spinner from 'react-bootstrap/esm/Spinner';

function Auth() {
	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const userToken = query.get('token');
		localStorage.setItem('token', userToken);
		setTimeout(() => {
			window.location.href = '/home';
		}, 800);
	}, []);
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
