import { useEffect, useState } from 'react';
import Styles from './Cart.module.css';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { setCountCart } from '../../redux/reducers';
import { useDispatch } from 'react-redux';
import Aos from 'aos';

function Cart() {
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [token, setToken] = useState('');
	const [loading, setLoading] = useState(false);
	const [userLogin, setUserLogin] = useState(false);
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const dispatch = useDispatch();
	const handleLogin = () => {
		setShow(false);
		navigate('/login');
	};
	const handleRegister = () => {
		setShow(false);
		navigate('/register');
	};
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('product'));
		const userToken = localStorage.getItem('token');
		if (cart) {
			setProducts(cart);
		}
		if (userToken) {
			setToken(userToken);
			setUserLogin(true);
		}
		Aos.init();
	}, []);
	useEffect(() => {
		const priceTotal = products
			.map((product) => product.total)
			.reduce((total, price) => total + price, 0);
		setTotal(formatCurrency(priceTotal));
	}, [products]);

	const formatCurrency = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};

	function truncateDescription(description, wordLimit) {
		const words = description.split(' ');
		if (words.length <= wordLimit) {
			return description;
		}
		return words.slice(0, wordLimit).join(' ') + '...';
	}
	const minus = (quantity, id) => {
		if (quantity > 1) {
			const updatedProducts = products.map((element) => {
				if (element._id === id) {
					const newQuantity = element.quantity - 1;
					return {
						...element,
						quantity: newQuantity,
						total: element.price * newQuantity,
					};
				}
				return element;
			});
			setProducts(updatedProducts);
			localStorage.setItem('product', JSON.stringify(updatedProducts));
		} else {
			removeItem(id);
		}
	};
	const popover = (
		<Popover id="popover-basic">
			<Popover.Header as="h3">
				No hay productos en el carrito
			</Popover.Header>
			<Popover.Body>
				Tu carrtito está vacio. Necesitas agregar productos para poder
				continuar
			</Popover.Body>
		</Popover>
	);

	const plus = (quantity, id) => {
		const updatedProducts = products.map((element) => {
			if (element._id === id) {
				const newQuantity = element.quantity + 1;
				return {
					...element,
					quantity: newQuantity,
					total: element.price * newQuantity,
				};
			}
			return element;
		});
		setProducts(updatedProducts);
		localStorage.setItem('product', JSON.stringify(updatedProducts));
	};

	const removeItem = (id) => {
		const updatedProducts = products.filter(
			(element) => element._id !== id
		);
		setProducts(updatedProducts);
		localStorage.setItem('product', JSON.stringify(updatedProducts));
		dispatch(setCountCart(updatedProducts.length));
	};
	const parseCurrency = (str) => {
		return parseInt(str.replace(/\./g, ''), 10);
	};
	const payment = async (products, total) => {
		setLoading(true);
		const data = {
			products: products,
			total: parseCurrency(total),
		};
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};
		if (userLogin) {
			try {
				const response = await axios.post(
					`${VITE_BASE_URL}/payment`,
					data,
					config
				);

				if (response.data && response.data.url) {
					window.location.href = response.data.url;
				}
			} catch (error) {
				console.log(error);
				setErrorMessage(error.response.data.message);
				setLoading(false);
				handleShow();
			}
		} else {
			setLoading(false);
			handleShow();
		}
	};
	return (
		<>
			<section className="mt-5 mb-5">
				<div className={Styles.card} data-aos="fade-down">
					<div className="row">
						<div className={`${Styles.cart} col-md-8`}>
							<div className={Styles.title}>
								<div className="row">
									<div className="col">
										<h4>
											<b>Carrito de compras</b>
										</h4>
									</div>
									<div className="col align-self-center text-right text-muted">
										{products.length > 1
											? `${products.length} productos en el carrito`
											: `${products.length} producto en el carrito`}
									</div>
								</div>
							</div>
							{products.length > 0 ? (
								products?.map((product, idx) => (
									<div
										className={`row border-top border-bottom`}
										key={idx}
									>
										<div
											className={`${Styles.main} row align-items-center`}
										>
											<div className="col-2">
												<img
													className="img-fluid"
													src={product.image[0]}
												/>
											</div>
											<div className="col">
												<div className="row text-muted">
													{product.name}
												</div>
												<div className="row">
													{truncateDescription(
														product.description,
														5
													)}
												</div>
											</div>
											<div className="col">
												<a
													onClick={() =>
														minus(
															product.quantity,
															product._id
														)
													}
													className={Styles.quantity}
												>
													-
												</a>
												<a
													className={`${Styles.quantity} border`}
												>
													{product.quantity}
												</a>
												<a
													onClick={() =>
														plus(
															product.quantity,
															product._id
														)
													}
													className={Styles.quantity}
												>
													+
												</a>
											</div>
											<div
												className={`col d-flex justify-content-between align-items-center`}
											>
												{`$ ${formatCurrency(
													product.price
												)}`}{' '}
												<span className={Styles.close}>
													<button
														className={Styles.x}
														onClick={() =>
															removeItem(
																product._id
															)
														}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="20"
															height="20"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
															className="icon icon-tabler icons-tabler-outline icon-tabler-x"
														>
															<path
																stroke="none"
																d="M0 0h24v24H0z"
																fill="none"
															/>
															<path d="M18 6l-12 12" />
															<path d="M6 6l12 12" />
														</svg>
													</button>
												</span>
											</div>
										</div>
									</div>
								))
							) : (
								<p className="text-center">
									No hay productos en el carrito 😞
								</p>
							)}
							<div className="mt-3">
								<a href="/shops" className={Styles.linksvg}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="white"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left "
									>
										<path
											stroke="none"
											d="M0 0h24v24H0z"
											fill="none"
										/>
										<path d="M5 12l14 0" />
										<path d="M5 12l6 6" />
										<path d="M5 12l6 -6" />
									</svg>
									<span className="text-muted">
										Continuar comprando
									</span>
								</a>
							</div>
						</div>
						<div className={`${Styles.summary} col-md-4`}>
							<div>
								<h5>
									<b>Resumen de compra</b>
								</h5>
							</div>
							<hr />
							<div className="row">
								<div className="col">PROD. Total</div>
								<div className="col text-right">{`$ ${total}`}</div>
							</div>
							<form>
								<p>ENVIO</p>
								<select>
									<option className="text-muted">
										Envio Gratis - $ 0.00
									</option>
								</select>
								{/* <p>GIVE CODE</p>
								<input
									id={Styles.code}
									placeholder="Enter your code"
								/> */}
							</form>
							<div
								className="row"
								style={{
									borderTop: '1px solid rgba(0,0,0,.1)',
									padding: '2vh 0',
								}}
							>
								<div className="col">PRECIO TOTAL</div>
								<div className="col text-right">{`$ ${total}`}</div>
							</div>
							{!loading ? (
								products.length > 0 ? (
									<button
										className={Styles.btn}
										onClick={() => payment(products, total)}
										disabled={products.length === 0}
									>
										Pagar
									</button>
								) : (
									<OverlayTrigger
										trigger="click"
										placement="bottom"
										overlay={popover}
									>
										<button className={Styles.btn}>
											Pagar
										</button>
									</OverlayTrigger>
								)
							) : (
								<button className={Styles.btn} disabled={true}>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									Procesando
								</button>
							)}
						</div>
					</div>
				</div>
			</section>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					{errorMessage ? (
						<Modal.Title className="text-danger">
							Error en el procesamiento del pago
						</Modal.Title>
					) : (
						<Modal.Title>No estás logueado</Modal.Title>
					)}
				</Modal.Header>
				{errorMessage ? (
					<Modal.Body className="text-danger">
						{errorMessage}
					</Modal.Body>
				) : (
					<Modal.Body>
						Para poder pagar tu pedido debes iniciar sesión.
					</Modal.Body>
				)}
				<Modal.Footer>
					{errorMessage ? (
						<button className={Styles.btn} onClick={handleClose}>
							Cerrar
						</button>
					) : (
						<>
							<button
								className={Styles.btn}
								onClick={handleLogin}
							>
								Iniciar sesión
							</button>
							<button
								className={Styles.btn}
								onClick={handleRegister}
							>
								Registrarme
							</button>
						</>
					)}
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Cart;
