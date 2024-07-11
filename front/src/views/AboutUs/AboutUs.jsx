import Contacts from '../Contact/Contact';
import Styles from './AboutUs.module.css';
const AboutUs = () => {
	return (
		<>
			<section className="py-3 py-md-5">
				<div className="container">
					<div className="row gy-3 gy-md-4 gy-lg-0 align-items-lg-center">
						<div className="col-12 col-lg-6 col-xl-5">
							<img
								className={Styles['fix-image']}
								loading="lazy"
								src="https://res.cloudinary.com/dxrjz4ycj/image/upload/f_auto,q_auto/vjzufpui5rqppjhmfqcj"
								alt="Foto de Adam Winger en Unsplash"
							/>
						</div>
						<div className="col-12 col-lg-6 col-xl-7">
							<div className="row justify-content-xl-center">
								<div className="col-12 col-xl-11">
									<h2 className="mb-3">Quiénes Somos?</h2>
									<p className="lead fs-5 text-secondary mb-3">
										Bienvenidos a Emax Peluqueria, donde la
										belleza y el cuidado personal se
										encuentran con la creatividad y la
										pasión. Desde nuestra creación, hemos
										trabajado incansablemente para ofrecer a
										nuestros clientes servicios de
										peluquería de la más alta calidad en un
										ambiente acogedor y profesional.
									</p>
									<p className="mb-5">
										Nacimos con la visión de crear un
										espacio donde cada cliente se sienta
										especial y pueda expresar su estilo
										único. Nuestro equipo de estilistas ha
										evolucionado y se ha adaptado a las
										últimas tendencias y técnicas para
										garantizar resultados excepcionales.
									</p>
									<div className="row gy-4 gy-md-0 gx-xxl-5X">
										<div className="col-12 col-md-6">
											<div className="d-flex">
												<div className="me-4 text-primary">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="32"
														height="32"
														viewBox="0 0 24 24"
														fill="none"
														stroke="#cc82e8"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="icon icon-tabler icons-tabler-outline icon-tabler-scissors"
													>
														<path
															stroke="none"
															d="M0 0h24v24H0z"
															fill="none"
														/>
														<path d="M6 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
														<path d="M6 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
														<path d="M8.6 8.6l10.4 10.4" />
														<path d="M8.6 15.4l10.4 -10.4" />
													</svg>
												</div>
												<div>
													<h2 className="h4 mb-3">
														Creatividad
													</h2>
													<p className="text-secondary mb-0">
														Nos mantenemos a la
														vanguardia de las
														tendencias de moda y
														belleza para ofrecerte
														estilos frescos y
														modernos.
													</p>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-6">
											<div className="d-flex">
												<div className="me-4 text-primary">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="32"
														height="32"
														viewBox="0 0 24 24"
														fill="none"
														stroke="#cc82e8"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
														className="icon icon-tabler icons-tabler-outline icon-tabler-razor-electric"
													>
														<path
															stroke="none"
															d="M0 0h24v24H0z"
															fill="none"
														/>
														<path d="M8 3v2" />
														<path d="M12 3v2" />
														<path d="M16 3v2" />
														<path d="M9 12v6a3 3 0 0 0 6 0v-6h-6z" />
														<path d="M8 5h8l-1 4h-6z" />
														<path d="M12 17v1" />
													</svg>
												</div>
												<div>
													<h2 className="h4 mb-3">
														Calidad
													</h2>
													<p className="text-secondary mb-0">
														Utilizamos productos de
														las mejores marcas y
														técnicas innovadoras
														para asegurar resultados
														duraderos y
														satisfactorios.
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Contacts></Contacts>
		</>
	);
};

export default AboutUs;
