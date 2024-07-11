import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from 'react-redux';
import { setCountCart } from '../../redux/reducers';
import styles from './Product.module.css';
import Toast from 'react-bootstrap/Toast';

function Product() {
	const [product, setProduct] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [show, setShow] = useState(false);
	const [messageToast, setMessageToast] = useState({
		message: '',
		product: '',
		quantity: '',
	});
	const dispatch = useDispatch();
	const { id } = useParams();
	const products = useSelector((state) => state.products?.products);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		console.log(products);
		if (products[1]) {
			const product = products.find((product) => product._id === id);
			setProduct(product);
		} else {
			const axiosResponse = async () => {
				const response = await axios(`${VITE_BASE_URL}/products/${id}`);
				console.log(response.data);
				if (response.data) setProduct(response.data);
			};
			if (product === null) axiosResponse();
		}
	}, [product, id, products, VITE_BASE_URL]);
	const addToCart = (product, quantity) => {
		setShow(false);
		const currentCart = JSON.parse(localStorage.getItem('product')) || [];
		if (
			currentCart?.some((productCart) => productCart._id === product._id)
		) {
			currentCart.forEach((product) => {
				if (product._id === product._id) {
					product.quantity += quantity;
					product.total = product.price * product.quantity;
				}
			});
		} else {
			currentCart.push({
				...product,
				quantity: quantity,
				total: product.price * quantity,
			});
		}

		localStorage.setItem('product', JSON.stringify(currentCart));

		dispatch(setCountCart(currentCart.length));
		setMessageToast({
			message: 'Producto agregado al carrito',
			product: product.name,
			quantity: quantity,
		});
		setShow(true);
	};

	return (
		<>
			<section className="py-5">
				<div className="container px-4 px-lg-5 my-5">
					<div className="row gx-4 gx-lg-5 align-items-center">
						<div className="col-md-6">
							<Carousel prevIcon={null} nextIcon={null}>
								{product?.image?.length > 0 &&
									product.image.map((image, idx) => {
										return (
											<Carousel.Item
												key={idx}
												interval={5000}
											>
												<img
													className="d-block w-100"
													height={500}
													src={image}
												/>
											</Carousel.Item>
										);
									})}
							</Carousel>
						</div>
						<div className="col-md-6">
							<div className="small mb-1">ID: {product?._id}</div>
							<h1 className="display-5 fw-bolder">
								{product?.name}
							</h1>
							<div className="fs-5 mb-5">
								{product?.offer ? (
									<span className="text-decoration-line-through">
										$ {product?.price}
									</span>
								) : (
									''
								)}
								{!product?.offer ? (
									<span>{`$ ${product?.price}`}</span>
								) : (
									<span>{`$ ${product?.offerprice}`}</span>
								)}
							</div>
							<p className="lead">{product?.description}</p>
							<div className="d-flex">
								<input
									className="form-control text-center me-3"
									id="inputQuantity"
									name="quantity"
									type="num"
									value={quantity}
									min="1"
									max={product?.stock}
									onChange={(e) => {
										setQuantity(e.target.value);
									}}
									style={{
										maxWidth: '3rem',
										background: 'inherit',
									}}
								/>
								<button
									className={`${styles.btn} flex-shrink-0`}
									onClick={() => {
										addToCart(product, quantity);
										setQuantity(1);
									}}
									type="button"
								>
									<i className="bi-cart-fill me-1"></i>
									Añadir al carrito
								</button>
							</div>
							<div className="small mb-1 mt-2">
								Stock: {product?.stock}
							</div>
						</div>
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
						Se agregaron {messageToast.quantity} unidades del
						producto {messageToast.product} al carrito
					</Toast.Body>
				</Toast>
			</section>
		</>
	);
}

export default Product;
