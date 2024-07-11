import { useNavigate } from 'react-router-dom';
import styles from './MiniCart.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCountCart } from '../../redux/reducers';
import useWindowSize from '../../hooks/useWindowsSize';
import Badge from 'react-bootstrap/Badge';

const MiniCart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.cart.cart);
	const { width } = useWindowSize();
	const breakpoint = 768;

	useEffect(() => {
		const products = JSON.parse(localStorage.getItem('product')) || [];
		dispatch(setCountCart(products.length));
	}, [dispatch]);

	return (
		<>
			{width < breakpoint ? (
				<div className="d-flex">
					<button
						className={`${styles.btn} mt-2 mb-2 mb-md-0`}
						onClick={() => navigate('/cart')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#cc82e8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M17 17h-11v-14h-2" />
							<path d="M6 5l14 1l-1 7h-13" />
						</svg>
						<i className="bi-cart-fill me-1"></i>
						Carrito
						<Badge
							className="ms-1 rounded-pill text-black"
							bg="secondary"
						>
							{counter}
						</Badge>
					</button>
				</div>
			) : (
				<div className="d-flex">
					<button
						className={styles.btn}
						onClick={() => navigate('/cart')}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#cc82e8"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
							<path d="M17 17h-11v-14h-2" />
							<path d="M6 5l14 1l-1 7h-13" />
						</svg>
						<i className="bi-cart-fill me-1"></i>
						Carrito
						<Badge
							bg="secondary"
							className="ms-1 rounded-pill text-black"
						>
							{counter}
						</Badge>
					</button>
				</div>
			)}
		</>
	);
};

export default MiniCart;
