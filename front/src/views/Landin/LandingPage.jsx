import Carousel from 'react-bootstrap/Carousel';
import styles from './LandingPage.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const LandingPage = () => {
	return (
		<>
			<div className={styles.divContainer}>
				<Carousel fade>
					<Carousel.Item>
						<LazyLoadImage
							className={styles.imgCarrousel}
							src="https://i.ibb.co/rcbGFMT/Peluqueria1.jpg"
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
							src="https://i.ibb.co/FXzp6ms/Peluqueria2.jpg"
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
							src="https://i.ibb.co/2dN6hcC/Peluqueria3.jpg"
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
			<div className="text-center fs-1 container fst-italic font-monospace mt-5">
				Transforma tu estilo, eleva tu confianza: donde el arte se
				encuentra con la belleza en cada corte.
				<div>
					<LazyLoadImage
						src="https://i.ibb.co/stDtVXC/Logo-Emax-Peluqueria-Actualizado.png"
						alt=""
					/>
				</div>
			</div>
			<div className="container mb-5 pb-5">
				<div className="row">
					<div className="col-sm-6 text-end fs-3 font-monospace">
						En el corazón de nuestra peluquería reside una pasión
						inquebrantable por realzar la belleza de cada cliente,
						combinada con un compromiso inquebrantable con la
						excelencia y la atención personalizada.
					</div>
					<div className="col-sm-6">
						<LazyLoadImage
							className={styles.imgLeyends}
							src="https://i.ibb.co/qdpvHQX/jeppe-monster-GOj-F1v-XObrg-unsplash.jpg"
							alt=""
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default LandingPage;
