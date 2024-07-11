import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addPayments } from '../../redux/reducers';
/* eslint-disable react/prop-types */
function Payments({ Styles, token }) {
	const [paymentData, setPaymentData] = useState(null);
	const [newToken, setNewToken] = useState(token);
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState('$ -');
	const [lastPayment, setLastPayment] = useState('-');
	const dispatch = useDispatch();
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	const data = useSelector((state) => state.payments.payments);
	useEffect(() => {
		if (!newToken) {
			const jwt = localStorage.getItem('token');
			setNewToken(jwt);
		}
	}, [newToken]);
	useEffect(() => {
		if (data && data.length > 0) {
			setPaymentData(data);
			setLoading(false);
			const paidFilter = data.filter(
				(payment) => payment.status === 'Abonado'
			);

			const totalAmount = paidFilter.reduce(
				(total, payment) => total + payment.price,
				0
			);
			setTotal(`$ ${formatCurrency(totalAmount)}`);
			setLastPayment(paidFilter[0].createdAt.toLocaleString());
		}
	}, [data]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios(`${VITE_BASE_URL}/payment`, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${newToken}`,
					},
				});
				if (response.data && response.data.length > 0) {
					setPaymentData(response.data);
					dispatch(addPayments(response.data));
					setLoading(false);
					const paidFilter = response.data.filter(
						(payment) => payment.status === 'Abonado'
					);

					const totalAmount = paidFilter.reduce(
						(total, payment) => total + payment.price,
						0
					);
					setTotal(`$ ${formatCurrency(totalAmount)}`);
					setLastPayment(paidFilter[0]?.createdAt.toLocaleString());
				} else {
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (newToken && !data?.length) {
			fetchData();
		}
		Aos.init();
	}, [VITE_BASE_URL, data, dispatch, newToken]);

	const paymentStatus = (payment, index) => {
		if (payment.status === 'Pendiente') {
			return (
				<tr key={index}>
					<td>{payment.id}</td>
					<td>{payment.createdAt.toLocaleString().slice(0, 10)}</td>
					<td>{`$ ${formatCurrency(payment.price)}`}</td>
					<td>
						<span className="badge bg-light text-dark">
							{payment.status}
						</span>
					</td>
				</tr>
			);
		} else if (payment.status === 'Abonado') {
			return (
				<tr key={index}>
					<td>{payment.id}</td>
					<td>{payment.createdAt.toLocaleString().slice(0, 10)}</td>
					<td>{`$ ${formatCurrency(payment.price)}`}</td>
					<td>
						<span className="badge bg-success">
							{payment.status}
						</span>
					</td>
				</tr>
			);
		} else if (payment.status === 'Cancelado') {
			return (
				<tr key={index}>
					<td>{payment.id}</td>
					<td>{payment.createdAt.toLocaleString().slice(0, 10)}</td>
					<td>{`$ ${formatCurrency(payment.price)}`}</td>
					<td>
						<span className="badge bg-danger">
							{payment.status}
						</span>
					</td>
				</tr>
			);
		}
	};
	const formatCurrency = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};
	return (
		<>
			<div className="row" data-aos="fade-right">
				<div className="col-lg-4 mb-4">
					<div
						className={`card h-100 border-start-lg ${Styles['border-start-primary']}`}
					>
						<div className={`${Styles.bgMain} card-body`}>
							<div className="small text-muted">Gasto total</div>
							<div className="h3">{total}</div>
							<p href="text-arrow-icon small">
								{' '}
								Monto total procesado con exito
							</p>
							{/* <a className="text-arrow-icon small" href="#!">
								Switch to yearly billing
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-arrow-right"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</a> */}
						</div>
					</div>
				</div>
				<div className="col-lg-4 mb-4">
					<div
						className={`card h-100 border-start-lg ${Styles['border-start-secondary']}`}
					>
						<div className={`${Styles.bgMain} card-body`}>
							<div className="small text-muted">
								Fecha de último pago
							</div>
							<div className="h3">{lastPayment.slice(0, 10)}</div>
							<p href="text-arrow-icon small">
								{' '}
								Ultimo pago exitoso
							</p>
							{/* <a
								className="text-arrow-icon small text-secondary"
								href="#!"
							>
								View payment history
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-arrow-right"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</a> */}
						</div>
					</div>
				</div>
				<div className="col-lg-4 mb-4">
					<div
						className={`card h-100 border-start-lg ${Styles['border-start-success']}`}
					>
						<div className={`${Styles.bgMain} card-body`}>
							<div className="small text-muted">Plan actual</div>
							<div className="h3 d-flex align-items-center">
								Base
							</div>
							<a
								className={`text-arrow-icon small text-success ${Styles.hook}`}
							>
								Proximamente...
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-arrow-right"
								>
									<line x1="5" y1="12" x2="19" y2="12"></line>
									<polyline points="12 5 19 12 12 19"></polyline>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="card card-header-actions mb-4" >
				<div className="card-header">
					Payment Methods
					<button className="btn btn-sm btn-primary" type="button">
						Add Payment Method
					</button>
				</div>
				<div className="card-body px-0">
					<div className="d-flex align-items-center justify-content-between px-4">
						<div className="d-flex align-items-center">
							<i className="fab fa-cc-visa fa-2x cc-color-visa"></i>
							<div className="ms-4">
								<div className="small">Visa ending in 1234</div>
								<div className="text-xs text-muted">
									Expires 04/2024
								</div>
							</div>
						</div>
						<div className="ms-4 small">
							<div className="badge bg-light text-dark me-3">
								Default
							</div>
							<a href="#!">Edit</a>
						</div>
					</div>
					<hr />

					<div className="d-flex align-items-center justify-content-between px-4">
						<div className="d-flex align-items-center">
							<i className="fab fa-cc-mastercard fa-2x cc-color-mastercard"></i>
							<div className="ms-4">
								<div className="small">
									Mastercard ending in 5678
								</div>
								<div className="text-xs text-muted">
									Expires 05/2022
								</div>
							</div>
						</div>
						<div className="ms-4 small">
							<a className="text-muted me-3" href="#!">
								Make Default
							</a>
							<a href="#!">Edit</a>
						</div>
					</div>
					<hr />

					<div className="d-flex align-items-center justify-content-between px-4">
						<div className="d-flex align-items-center">
							<i className="fab fa-cc-amex fa-2x cc-color-amex"></i>
							<div className="ms-4">
								<div className="small">
									American Express ending in 9012
								</div>
								<div className="text-xs text-muted">
									Expires 01/2026
								</div>
							</div>
						</div>
						<div className="ms-4 small">
							<a className="text-muted me-3" href="#!">
								Make Default
							</a>
							<a href="#!">Edit</a>
						</div>
					</div>
				</div>
			</div> */}

			<div className="card mb-4" data-aos="fade-left">
				<div className={`${Styles.bgHeader} card-header`}>
					Historial de pago
				</div>
				<div className={`${Styles.bgMain} card-body p-0`}>
					<div
						className={`table-responsive ${Styles['table-billing-history']}`}
					>
						<table className={`${Styles.tabla} table mb-0`}>
							<thead>
								<tr>
									<th className="border-gray-200" scope="col">
										Transaction ID
									</th>
									<th className="border-gray-200" scope="col">
										Date
									</th>
									<th className="border-gray-200" scope="col">
										Amount
									</th>
									<th className="border-gray-200" scope="col">
										Status
									</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									<>
										<Spinner animation="border"></Spinner>
									</>
								) : paymentData?.length > 0 ? (
									paymentData?.map((payment, index) => {
										return paymentStatus(payment, index);
									})
								) : (
									<tr>
										<td colSpan="4">
											No hay historial de pagos
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default Payments;
