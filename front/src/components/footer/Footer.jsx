import styles from './Footer.module.css';
const Footer = () => {
	return (
		<>
			<footer className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-4">
						<p className={`${styles.p} text-center`}>
							Hecho con <a className={styles.a}>♥</a> por Emanuel
						</p>
					</div>
					<div className="col-4 text-center">
						<a
							className={styles.a}
							href="https://github.com/emacuello"
							target="_blank"
						>
							Github
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
