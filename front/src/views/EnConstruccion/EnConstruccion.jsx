import { useEffect } from 'react';
import styles from './EnConstruccion.module.css';
import Aos from 'aos';
const EnConstruccion = () => {
	useEffect(() => {
		Aos.init();
	}, []);
	return (
		<>
			<div data-aos="zoom-out">
				<div className="container-fluid">
					<div className={styles.tittle}>Proximamente.....</div>
					<div className={styles.construccion}>
						Esta página se encuentra actualmente en construcción
					</div>
					<div className={`${styles.leyends} ${styles.bot}`}>
						Disculpe las molestias{' '}
					</div>
				</div>
			</div>
		</>
	);
};

export default EnConstruccion;
