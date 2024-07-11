import Carousel from 'react-bootstrap/Carousel';
import styles from './LandingPage.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Aos from 'aos';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addProducts } from '../../redux/reducers';
const LandingPage = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products?.products);
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		Aos.init();
		if (products[1]) {
			return;
		} else {
			try {
				const axiosResponse = async () => {
					const response = await axios(`${VITE_BASE_URL}/products`);
					console.log(response.data);
					if (response.data) {
						dispatch(addProducts(response.data));
					}
				};
				axiosResponse();
			} catch (error) {
				console.log(error);
			}
		}
	}, [VITE_BASE_URL, dispatch, products]);
	return (
		<>
			<div className={styles.divContainer}>
				<Carousel fade>
					<Carousel.Item>
						<LazyLoadImage
							className={styles.imgCarrousel}
							src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/jpeg-optimizer_Peluqueria1_ebqweo"
							alt="Peluqueria1"
						/>
						<Carousel.Caption className={styles.caption}>
							<h3 className={styles.h3Lan}>Emax Peluqueria!</h3>
							<p className={styles.pLan}>
								Nuestra gran esperada apertura ya esta llegando!
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<LazyLoadImage
							className={styles.imgCarrousel}
							src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/jpeg-optimizer_Peluqueria2_hnsrbo"
							alt="Peluqueria2"
						/>
						<Carousel.Caption className={styles.caption}>
							<h3 className={styles.h3Lan}>Emax Peluqueria!</h3>
							<p className={styles.pLan}>
								Nuestra gran esperada apertura ya esta llegando!
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<LazyLoadImage
							className={styles.imgCarrousel}
							src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/jpeg-optimizer_Peluqueria3_iazwk4"
							alt="Peluqueria3"
						/>
						<Carousel.Caption className={styles.caption}>
							<h3 className={styles.h3Lan}>Emax Peluqueria!</h3>
							<p className={styles.pLan}>
								Nuestra gran esperada apertura ya esta llegando!
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
			<div
				className="text-center fs-1 container fst-italic font-monospace mt-5"
				data-aos="fade-up"
			>
				Transforma tu estilo, eleva tu confianza: donde el arte se
				encuentra con la belleza en cada corte.
				<div>
					<LazyLoadImage
						src="https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png"
						alt="Logo-Emax-Peluqueria-Actualizado"
					/>
				</div>
			</div>
			<div className="container mb-5 pb-5">
				<div className="row">
					<div
						className="col-sm-6 text-end fs-3 font-monospace"
						data-aos="fade-right"
					>
						En el corazón de nuestra peluquería reside una pasión
						inquebrantable por realzar la belleza de cada cliente,
						combinada con un compromiso in quebrantable con la
						excelencia y la atención personalizada.
					</div>
					<div className="col-sm-6" data-aos="fade-left">
						<LazyLoadImage
							className={styles.imgLeyends}
							src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/ctaicds3m3vqhsxpyjup"
							alt=""
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default LandingPage;
