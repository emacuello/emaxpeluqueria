import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styles from './Tienda.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../../redux/reducers';
import Placeholder from 'react-bootstrap/Placeholder';
const Shops = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState(null);
	const [loader, setLoader] = useState(false);
	const dispatch = useDispatch();
	const productsState = useSelector((state) => state.products?.products);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		console.log(productsState);
		if (productsState[1]) {
			setProducts(productsState);
			setLoader(true);
		} else {
			try {
				const axiosResponse = async () => {
					const response = await axios(`${VITE_BASE_URL}/products`);
					console.log(response.data);
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
	return (
		<>
			<h1 className="text-center pt-4">Nuestra tienda</h1>
			<div className="container p-5">
				<Row xs={1} md={2} className="g-4 justify-content-center">
					{loader ? (
						products &&
						products?.map((product, idx) => (
							<Col
								className="m-30 p-30"
								style={{ width: '18rem' }}
								key={idx}
							>
								<Card>
									<Card.Img
										variant="top"
										src={product.image[0]}
									/>
									<Card.Body>
										<Card.Title>{`$ ${product.price}`}</Card.Title>
										<Card.Text>{product.name}</Card.Text>
									</Card.Body>
									<button
										className={styles.btn}
										onClick={() => {
											navigate(`/shops/${product._id}`);
										}}
									>
										Ver Detalles
									</button>
								</Card>
							</Col>
						))
					) : (
						<Card style={{ width: '18rem' }}>
							<Card.Img
								variant="top"
								src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/xacizdmxtpf7knsrzfth"
							/>
							<Card.Body>
								<Placeholder as={Card.Title} animation="glow">
									<Placeholder xs={6} />
								</Placeholder>
								<Placeholder as={Card.Text} animation="glow">
									<Placeholder xs={7} />{' '}
									<Placeholder xs={4} />{' '}
									<Placeholder xs={4} />{' '}
									<Placeholder xs={6} />{' '}
									<Placeholder xs={8} />
								</Placeholder>
								<Placeholder.Button variant="primary" xs={6} />
							</Card.Body>
						</Card>
					)}
				</Row>
			</div>
		</>
	);
};
export default Shops;
