import { useEffect, useState } from 'react';
import Styles from './Cart.module.css';
function Cart() {
	const [products, setProducts] = useState([]);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('product'));
		if (cart) {
			setProducts(cart);
		}
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
	};
	const parseCurrency = (str) => {
		return parseInt(str.replace(/\./g, ''), 10);
	};

	return (
		<>
			<section className="mt-5 mb-5">
				<div className={Styles.card}>
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
							{products?.map((product, idx) => (
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
														removeItem(product._id)
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
							))}
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
							<button className={Styles.btn}>Pagar</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Cart;
