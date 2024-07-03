import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';

function Product() {
	const [product, setProduct] = useState(null);
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

	return (
		<div>
			<Carousel>
				{product?.image?.length > 0 &&
					product.image.map((image, idx) => {
						return (
							<Carousel.Item key={idx} interval={5000}>
								<img
									className="d-block w-100"
									height={500}
									src={image}
								/>
								<Carousel.Caption>
									<h1>{product.name}</h1>
								</Carousel.Caption>
							</Carousel.Item>
						);
					})}
			</Carousel>
			{product && <p>{product.description}</p>}
		</div>
	);
}

export default Product;
