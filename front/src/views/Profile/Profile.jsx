import { useState, useEffect } from 'react';
import Navbar from '../../components/profile/navbar';
import Payments from '../../components/profile/payments';
import Security from '../../components/profile/secutity';
import EditProfile from '../../components/profile/editProfile';
import Styles from './Profile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../redux/reducers';
import Aos from 'aos';

function Profile() {
	const [view, setView] = useState('profile');
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const currentUser = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

	useEffect(() => {
		const currentToken = localStorage.getItem('token');
		setToken(currentToken);
		Aos.init();
	}, []);
	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
	}, [currentUser]);
	useEffect(() => {
		if (user === null) {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				const getUser = async () => {
					const response = await axios(
						`${VITE_BASE_URL}/users/token}`,
						config
					);
					setUser(response.data);
					dispatch(addUser(response.data));
				};
				if (token) {
					getUser();
				}
			} catch (error) {
				console.log(error);
				localStorage.removeItem('token');
				window.location.href = '/';
			}
		}
	}, [token, dispatch, VITE_BASE_URL, user]);

	return (
		<>
			<div className="container-xl px-4 mt-4">
				<Navbar Styles={Styles} setView={setView} view={view} />
				<hr className="mt-0 mb-4" />
				{user !== null ? (
					view === 'profile' && (
						<div className="row" data-aos="fade-down">
							<div className="col-xl-4">
								<div className="card mb-4 mb-xl-0">
									<div
										className={`${Styles.bgHeader} card-header`}
									>
										Foto de Perfil
									</div>
									<div
										className={`${Styles.bgMain} card-body text-center`}
									>
										<img
											className={`${Styles['img-account-profile']} ${Styles['rounded-circle']} mb-2`}
											src={user?.image || ''}
											alt={user?.name || 'Profile image'}
										/>
									</div>
								</div>
							</div>
							<div className="col-xl-8">
								<div className="card mb-4">
									<div
										className={`${Styles.bgHeader} card-header`}
									>
										Detalles de la cuenta
									</div>
									<div
										className={`${Styles.bgMain} card-body`}
									>
										<div className="mb-3">
											<label
												className="small mb-1"
												htmlFor="inputUsername"
											>
												Nombre
											</label>
											<input
												className="form-control"
												id="inputUsername"
												type="text"
												disabled
												value={user?.name || ''}
											/>
										</div>

										<div className="mb-3">
											<label
												className="small mb-1"
												htmlFor="inputEmailAddress"
											>
												Email
											</label>
											<input
												className="form-control"
												id="inputEmailAddress"
												type="email"
												disabled
												value={user?.email || ''}
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
													disabled
													value={user?.nDni || '-'}
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
													disabled
													value={
														user?.birthdate || '-'
													}
												/>
											</div>
										</div>

										<button
											className={Styles.btn}
											type="button"
											onClick={() =>
												setView('editProfile')
											}
										>
											Quiero editar mis datos
										</button>
									</div>
								</div>
							</div>
						</div>
					)
				) : (
					<>
						<div>Cargando...</div>
					</>
				)}
				{view === 'payments' && (
					<Payments user={user} Styles={Styles} />
				)}
				{view === 'security' && (
					<Security user={user} Styles={Styles} token={token} />
				)}
				{view === 'editProfile' && (
					<EditProfile
						user={user}
						Styles={Styles}
						VITE_BASE_URL={VITE_BASE_URL}
						dispatch={dispatch}
					/>
				)}
			</div>
		</>
	);
}

export default Profile;
