import styles from './EnConstruccion.module.css';
const EnConstruccion = () => {
	return (
		<>
			<div className="container-fluid">
				<div className={styles.tittle}>Proximamente.....</div>
				<div className={styles.construccion}>
					Esta página se encuentra actualmente en construcción
				</div>
				<div className={`${styles.leyends} ${styles.bot}`}>
					Disculpe las molestias{' '}
				</div>
			</div>
		</>
	);
};

export default EnConstruccion;
