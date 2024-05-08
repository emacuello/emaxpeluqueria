import styles from './WhithoutLoggin.module.css';
import { Link } from 'react-router-dom';
const WhithoutLoggin = () => {
	return (
		<>
			<div className={styles.warning}>
				Tienes que ingresar para poder ver esta página!
			</div>
			<div className={styles.login}>
				<Link to="/login" className={styles.a}>
					Quiero entrar!
				</Link>
			</div>
			<div className={styles.register}>No tienes cuenta? </div>
			<div className={`${styles.register} ${styles.bot}`}>
				<Link to="/register" className={styles.a}>
					Registrate!!
				</Link>
			</div>
		</>
	);
};

export default WhithoutLoggin;
