import styles from './ErrorPage.module.css';
const ErrorPage = () => {
	return (
		<>
			<div className={styles.errorCode}>404</div>
			<div className={styles.errorTittle}>Not Found</div>
			<div className={`${styles.errorSubtittle} ${styles.bot}`}>
				Oops, la pagina que estas buscando no existe
			</div>
		</>
	);
};

export default ErrorPage;
