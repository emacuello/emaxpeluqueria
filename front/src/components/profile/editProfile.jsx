/* eslint-disable react/prop-types */
import Aos from 'aos';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addUser } from '../../redux/reducers';

// eslint-disable-next-line react/prop-types
const EditProfile = ({ user, Styles, VITE_BASE_URL, dispatch }) => {
	const [editUser, setEditUser] = useState(user);
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(user.image);
	const [token, setToken] = useState(null);
	const handleDeletePreview = () => {
		setFile(null);
		setPreview(user.image);
	};

	const handleImageUpload = (event) => {
		setFile(event.target.files[0]);
		setPreview(URL.createObjectURL(event.target.files[0]));
	};
	const handleChange = (event) => {
		setEditUser({
			...editUser,
			[event.target.name]: event.target.value,
		});
	};
	useEffect(() => {
		Aos.init();
		const currentToken = localStorage.getItem('token');
		setToken(currentToken);
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData();

		for (const key in editUser) {
			if (editUser[key] === null || editUser[key] === '') {
				continue;
			}
			data.append(key, editUser[key]);
		}

		if (file) {
			data.append('file', file);
		}

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		};
		if (token) {
			try {
				const response = await axios.post(
					`${VITE_BASE_URL}/users/profile`,
					data,
					config
				);
				if (response.data) {
					console.log(response.data);
					dispatch(addUser(response.data));
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<>
			<div className="row" data-aos="fade-up">
				<div className="col-xl-4">
					<div className="card mb-4 mb-xl-0">
						<div className={`${Styles.bgHeader2} card-header`}>
							Foto de Perfil
						</div>
						<div
							className={`${Styles.bgMain2} card-body text-center`}
						>
							<img
								className={`${Styles['img-account-profile']} ${Styles['rounded-circle']} mb-2`}
								src={preview}
								alt={editUser?.name}
							/>
							<div className="small font-italic text-muted mb-4">
								El no tamaño no debe ser mayor a 5 MB
							</div>
							{file ? (
								<>
									<button
										className={`${Styles.btn} mt-auto`}
										onClick={handleDeletePreview}
									>
										Eliminar imagen seleccionada
									</button>
								</>
							) : (
								<input
									type="file"
									className="form-control"
									id="inputGroupFile01"
									accept="image/*"
									onChange={handleImageUpload}
								/>
							)}
						</div>
					</div>
				</div>
				<div className="col-xl-8">
					<div className="card mb-4">
						<div className={`${Styles.bgHeader2} card-header`}>
							Detalles de la cuenta
						</div>
						<div
							className={`${Styles.bgMain2} card-body text-center`}
						>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label
										className="small mb-1"
										htmlFor="inputUsername"
									>
										Nombre (Nombre del cual se reservaran
										los turnos)
									</label>
									<input
										className="form-control"
										id="inputUsername"
										type="text"
										name="name"
										placeholder="Enter your username"
										value={editUser?.name}
										onChange={handleChange}
									/>
								</div>

								<div className="mb-3">
									<label
										className="small mb-1"
										htmlFor="inputEmailAddress"
									>
										Email (Email de contacto para las
										notificaciones)
									</label>
									<input
										className="form-control"
										id="inputEmailAddress"
										type="email"
										placeholder="Enter your email address"
										name="email"
										value={editUser?.email}
										onChange={handleChange}
									/>
								</div>

								<div className="row gx-3 mb-3">
									<div className="col-md-6">
										<label
											className="small mb-1"
											htmlFor="inputPhone"
										>
											DNI
										</label>
										<input
											className="form-control"
											id="inputPhone"
											type="tel"
											placeholder="Enter your phone number"
											name="nDni"
											value={
												editUser?.nDni
													? editUser?.nDni
													: '-'
											}
											onChange={handleChange}
										/>
									</div>

									<div className="col-md-6">
										<label
											className="small mb-1"
											htmlFor="inputBirthday"
										>
											Fecha de Nacimiento
										</label>
										<input
											className="form-control"
											id="inputBirthday"
											type="text"
											name="birthday"
											placeholder="Enter your birthday"
											value={
												editUser?.birthday
													? editUser?.birthday
													: '-'
											}
											onChange={handleChange}
										/>
									</div>
								</div>

								<button className={Styles.btn} type="submit">
									Guardar cambios
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
