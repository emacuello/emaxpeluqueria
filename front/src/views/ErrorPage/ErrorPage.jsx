import { useEffect } from 'react';
import styles from './ErrorPage.module.css';
import Aos from 'aos';
const ErrorPage = () => {
	useEffect(() => {
		Aos.init();
	}, []);
	return (
		<>
			<div data-aos="zoom-out">
				<div className={styles.errorCode}>404</div>
				<div className={styles.errorTittle}>Not Found</div>
				<div className={`${styles.errorSubtittle} ${styles.bot}`}>
					Oops, la pagina que estas buscando no existe
				</div>
			</div>
		</>
	);
};

export default ErrorPage;
