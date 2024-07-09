import { useEffect, useState } from 'react';
import Styles from './Payment.module.css';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
	const [id, setId] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const idTransaction = query.get('id');
		setId(idTransaction);
	}, []);
	return (
		<div className={Styles.container}>
			<div
				className={Styles.row + ' ' + Styles['justify-content-center']}
			>
				<div className={Styles['col-md-5']}>
					<div
						className={
							Styles['message-box'] +
							' ' +
							Styles._success +
							' ' +
							Styles._failed
						}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 24 24"
							fill="#9a0909"
							className="icon icon-tabler icons-tabler-filled icon-tabler-circle-x"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-6.489 5.8a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" />
						</svg>
						<h1>Tú pago no fue exitoso 😞</h1>
						<h2>Ocurrió un error al procesar tu pago</h2>
						<p>
							Lo sentimos. Tú pago no fue procesado. <br /> si
							tienes problemas puedes ponerte en contacto con
							nuestro equipo
							<br />
						</p>
						<h5>
							El ID de tu transacción fallida es: <br />
							<strong
								style={{
									color: '#9a0909',
									textDecoration: 'underline',
									marginBottom: '10px',
								}}
							>
								{id}
							</strong>
						</h5>
						<button
							className={Styles.btnCancel}
							onClick={() => navigate('/home')}
						>
							Home
						</button>
						<button
							className={Styles.btnCancel}
							onClick={() => navigate('/cart')}
						>
							Intentar de nuevo
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PaymentCancel;
