import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Styles from './Contact.module.css';
import axios from 'axios';
const Contacts = () => {
	const [data, setData] = useState(null);
	const [show, setShow] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loader, setLoader] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const VITE_FORM_URL = import.meta.env.VITE_FORM_URL;
	const VITE_HEADERS_KEY = import.meta.env.VITE_HEADERS_KEY;
	const VITE_HEADERS_VALUE = import.meta.env.VITE_HEADERS_VALUE;

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		setLoader(true);
		e.preventDefault();
		console.log(data);

		const key = VITE_HEADERS_KEY;
		const value = VITE_HEADERS_VALUE;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				[key]: value,
			},
		};
		try {
			console.log(config);
			const response = await axios.post(
				`${VITE_FORM_URL}/contact`,
				{
					name: data?.name,
					email: data?.email,
					subject: data?.subject,
					message: data?.message,
				},
				config
			);
			console.log(response);
			setData(null);
			setLoader(false);
			handleShow();
		} catch (error) {
			console.log(error);
			setLoader(false);
			setErrorMessage(error.response.data.message);
			handleShow();
		}
	};

	return (
		<div id="contact" className="contact-area section-padding mt-3 mb-5">
			<div className="container">
				<div className="section-title text-center">
					<h1 className={Styles.title}>Contáctanos </h1>
					<p className="text-muted mb-5">
						Ponganse en contacto con nosotros si tiene alguna
						consulta.
					</p>
				</div>
				<div className="row">
					<div className="col-lg-7">
						<div className={Styles.contact}>
							<form
								className={Styles.form}
								onSubmit={handleSubmit}
							>
								<div className="row">
									<div className="form-group col-md-6 mb-3">
										<input
											type="text"
											name="name"
											className="form-control"
											placeholder="Nombre"
											required="required"
											value={data?.name || ''}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group col-md-6 mb-3">
										<input
											type="email"
											name="email"
											className="form-control"
											placeholder="Email"
											required="required"
											value={data?.email || ''}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group col-md-12 mb-3">
										<input
											type="text"
											name="subject"
											className="form-control"
											placeholder="Asunto"
											required="required"
											value={data?.subject || ''}
											onChange={handleChange}
										/>
									</div>
									<div className="form-group col-md-12">
										<textarea
											rows="6"
											name="message"
											className="form-control"
											placeholder="Tú mensaje"
											required="required"
											value={data?.message || ''}
											onChange={handleChange}
										></textarea>
									</div>
									<div className="col-md-12 text-center">
										{loader ? (
											<button
												disabled
												className={
													Styles['btn-contact-bg'] +
													' mt-3' +
													' ' +
													Styles['btn-disabled']
												}
											>
												Enviando...
											</button>
										) : (
											<button
												type="submit"
												value="Send message"
												name="submit"
												id="submitButton"
												className={
													Styles['btn-contact-bg'] +
													' mt-3'
												}
												title="Envia tu mensaje!"
											>
												Enviar
											</button>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
					<div className="col-lg-5">
						<div className={Styles.single_address}>
							<i>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="#7564e5"
									className="icon icon-tabler icons-tabler-filled icon-tabler-map-pin"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
								</svg>
							</i>

							<h4>Nuestra dirección</h4>
							<p>
								Balcarce 78, C1064 Cdad. Autónoma de Buenos
								Aires
							</p>
						</div>
						<div className={Styles.single_address}>
							<i className="fa fa-envelope">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="#7564e5"
									className="icon icon-tabler icons-tabler-filled icon-tabler-mail"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
									<path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
								</svg>
							</i>
							<h4>Envianos un mensaje</h4>
							<p>emaxpeluqueria@gmail.com</p>
						</div>
						<div className={Styles.single_address}>
							<i className="fa fa-phone">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="#7564e5"
									className="icon icon-tabler icons-tabler-filled icon-tabler-phone"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M9 3a1 1 0 0 1 .877 .519l.051 .11l2 5a1 1 0 0 1 -.313 1.16l-.1 .068l-1.674 1.004l.063 .103a10 10 0 0 0 3.132 3.132l.102 .062l1.005 -1.672a1 1 0 0 1 1.113 -.453l.115 .039l5 2a1 1 0 0 1 .622 .807l.007 .121v4c0 1.657 -1.343 3 -3.06 2.998c-8.579 -.521 -15.418 -7.36 -15.94 -15.998a3 3 0 0 1 2.824 -2.995l.176 -.005h4z" />
								</svg>
							</i>
							<h4>Llamanos</h4>
							<p>(+1) 517 397 7100</p>
						</div>
						<div className={Styles.single_address}>
							<i className="fa fa-clock-o">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="#7564e5"
									className="icon icon-tabler icons-tabler-filled icon-tabler-clock"
								>
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 2.66a1 1 0 0 0 -.993 .883l-.007 .117v5l.009 .131a1 1 0 0 0 .197 .477l.087 .1l3 3l.094 .082a1 1 0 0 0 1.226 0l.094 -.083l.083 -.094a1 1 0 0 0 0 -1.226l-.083 -.094l-2.707 -2.708v-4.585l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
								</svg>
							</i>
							<h4>Horario de trabajo</h4>
							<p>
								Martes - Sabado: 09.00 - 19.30 <br />
							</p>
						</div>
					</div>
				</div>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{errorMessage
							? 'Error al enviar el mensaje'
							: 'El mensaje se envió correctamente'}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{errorMessage
						? errorMessage
						: 'Gracias por tu contacto, nos pondremos en contacto contigo de ser necesario'}
				</Modal.Body>
				<Modal.Footer>
					<button className={Styles.btn} onClick={handleClose}>
						Cerrar
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Contacts;
