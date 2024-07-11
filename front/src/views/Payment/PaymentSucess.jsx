import { useEffect, useState } from 'react';
import Styles from './Payment.module.css';
import { useNavigate } from 'react-router-dom';

function PaymentSucess() {
	const [id, setId] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const idTransaction = query.get('id');
		setId(idTransaction);
		if (idTransaction) {
			localStorage.removeItem('product');
		}
	}, []);
	return (
		<div className={Styles.container}>
			<div
				className={Styles.row + ' ' + Styles['justify-content-center']}
			>
				<div className={Styles['col-md-5']}>
					<div
						className={
							Styles['message-box'] + ' ' + Styles._success
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 24 24"
							fill="#04cb01"
							className="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
						</svg>
						<h1>¡Felicidades!</h1>
						<h2>Tú pago fue exitoso</h2>
						<p>
							Gracias por tu compra. Te llegará <br /> un email
							con los datos de la transacción
							<br />
						</p>
						<h5>
							El ID de tu transacción es: <br />
							<strong
								style={{
									color: '#04cb01',
									textDecoration: 'underline',
									marginBottom: '10px',
								}}
							>
								{id}
							</strong>
						</h5>
						<button
							className={Styles.btn}
							onClick={() => navigate('/home')}
						>
							Home
						</button>
						<button
							className={Styles.btn}
							onClick={() => navigate('/shops')}
						>
							Seguir comprando
						</button>
					</div>
				</div>
			</div>
			<hr />
		</div>
	);
}

export default PaymentSucess;
