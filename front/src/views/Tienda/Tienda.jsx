import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import styles from './Tienda.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts, setCountCart } from '../../redux/reducers';
import Placeholder from 'react-bootstrap/Placeholder';
import Toast from 'react-bootstrap/Toast';
const Shops = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState(null);
	const [loader, setLoader] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [cart, setCart] = useState([]);
	const [messageToast, setMessageToast] = useState({
		message: '',
		product: '',
	});
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const productsState = useSelector((state) => state.products?.products);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('product')) || [];
		setCart(storedCart.cart);
	}, []);
	const addToCart = (product) => {
		setShow(false);
		const currentCart = JSON.parse(localStorage.getItem('product')) || [];
		if (
			currentCart?.some((productCart) => productCart._id === product._id)
		) {
			currentCart.forEach((product) => {
				if (product._id === product._id) {
					product.quantity += 1;
					product.total = product.price * product.quantity;
				}
			});
		} else {
			currentCart.push({ ...product, quantity: 1, total: product.price });
		}
		setCart(currentCart);
		dispatch(setCountCart(currentCart.length));
		localStorage.setItem('product', JSON.stringify(currentCart));
		setMessageToast({
			message: 'Producto agregado al carrito',
			product: product.name,
		});
		setShow(true);
	};

	useEffect(() => {
		if (productsState[1]) {
			setProducts(productsState);
			setLoader(true);
		} else {
			try {
				const axiosResponse = async () => {
					const response = await axios(`${VITE_BASE_URL}/products`);

					if (response.data) {
						setProducts(response.data);
						setLoader(true);
						dispatch(addProducts(response.data));
					}
				};
				if (products === null) axiosResponse();
			} catch (error) {
				console.log(error);
			}
		}
	}, [VITE_BASE_URL, dispatch, products, productsState]);
	const formatCurrency = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
	};
	function isOffer(product, idx) {
		if (!product.offer) {
			return (
				<div className="col mb-5" key={idx}>
					<div className={`${styles.bgMain} card h-100`}>
						<img
							className="card-img-top"
							src={product.image[0]}
							alt={product.name}
						/>
						<div className="card-body p-4">
							<div className="text-center">
								<h5 className="fw-bolder">{product.name}</h5>
								{`$ ${formatCurrency(product?.price)}`}
							</div>
						</div>
						<div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div className="text-center">
								<button
									className={`${styles.btn} mt-auto`}
									onClick={() => {
										navigate(`/shops/${product._id}`);
									}}
								>
									Ver Detalles
								</button>
								<button
									className={`${styles.btn} mt-2`}
									onClick={() => addToCart(product)}
								>
									Añadir al carrito
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="col mb-5" key={idx}>
					<div className={`${styles.bgHeader} card h-100`}>
						<div
							className="badge bg-dark text-white position-absolute"
							style={{
								top: '0.5rem',
								right: '0.5rem',
							}}
						>
							Oferta
						</div>
						<img
							className="card-img-top"
							src={product.image[0]}
							alt={product.name}
						/>
						<div className="card-body p-4">
							<div className="text-center">
								<h5 className="fw-bolder">{product.name}</h5>
								<span className="text-muted text-decoration-line-through">
									{`$ ${formatCurrency(product?.price)}`}
								</span>
								{`$ ${formatCurrency(product?.offerprice)}`}
							</div>
						</div>
						<div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div className="text-center">
								<button
									className={`${styles.btn} mt-auto`}
									onClick={() => {
										navigate(`/shops/${product._id}`);
									}}
								>
									Ver Detalles
								</button>
								<button
									className={`${styles.btn} mt-2`}
									onClick={() => addToCart(product)}
								>
									Añadir al carrito
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	return (
		<>
			<header className={`${styles.bgMain} py-5`}>
				<div className="container px-4 px-lg-5 my-5">
					<div className="text-center text-white">
						<h1 className="display-4 fw-bolder">
							Donde nacen el estilo y la pasión.
						</h1>
						<p className="lead fw-normal text-white-50 mb-0">
							Nuestra tienda online
						</p>
					</div>
				</div>
			</header>
			<section className="py-5">
				<div className="container px-4 px-lg-5 mt-5">
					<div className="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">
						{loader ? (
							products &&
							products.map((product, idx) => {
								return isOffer(product, idx);
							})
						) : (
							<Card style={{ width: '18rem' }}>
								<Card.Img
									variant="top"
									src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/xacizdmxtpf7knsrzfth"
								/>
								<Card.Body>
									<Placeholder
										as={Card.Title}
										animation="glow"
									>
										<Placeholder xs={6} />
									</Placeholder>
									<Placeholder
										as={Card.Text}
										animation="glow"
									>
										<Placeholder xs={7} />{' '}
										<Placeholder xs={4} />{' '}
										<Placeholder xs={4} />{' '}
										<Placeholder xs={6} />{' '}
										<Placeholder xs={8} />
									</Placeholder>
									<Placeholder.Button
										variant="primary"
										xs={6}
									/>
								</Card.Body>
							</Card>
						)}
					</div>
				</div>
				<Toast
					onClose={() => setShow(false)}
					show={show}
					delay={1500}
					autohide
					bg="success"
					className="position-fixed bottom-50 start-50 translate-middle end-50 p-3 z-50"
				>
					<Toast.Header>
						<img
							src="holder.js/20x20?text=%20"
							className="rounded me-2"
							alt=""
						/>
						<strong className="me-auto">
							{messageToast.message}
						</strong>
					</Toast.Header>
					<Toast.Body>
						El producto {messageToast.product} fue agregado al
						carrito
					</Toast.Body>
				</Toast>
			</section>
		</>
	);
};
export default Shops;
