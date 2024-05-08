import Home from './views/Home/Home';
import Navbar from './components/navbar/Navbar';
import Register from './views/Register/Register';
import MyAppointments from './views/MyAppointments/MyAppointments';
import Login from './views/Login/Login';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';
import Footer from './components/footer/Footer';
import AboutUs from './views/AboutUs/AboutUs';
import Contacts from './views/Contact/Contact';
import Services from './views/Service/Services';
import Shops from './views/Tienda/Tienda';
import LandingPage from './views/Landin/LandingPage';
import { useSelector } from 'react-redux';
import WhithoutLoggin from './views/Login/WhithoutLoggin';
import Locals from './views/Locals/Locals';
import Profile from './components/profile/Profile';
function App() {
	const userLogin = useSelector((state) => state.user.user.user);
	return (
		<>
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<LandingPage></LandingPage>}></Route>
				<Route
					path="/home"
					element={
						userLogin ? (
							<Home></Home>
						) : (
							<WhithoutLoggin></WhithoutLoggin>
						)
					}
				></Route>
				<Route
					path="/myappointments"
					element={
						userLogin ? (
							<MyAppointments></MyAppointments>
						) : (
							<WhithoutLoggin></WhithoutLoggin>
						)
					}
				></Route>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="*" element={<ErrorPage></ErrorPage>}></Route>
				<Route path="/aboutus" element={<AboutUs />}></Route>
				<Route
					path="/contacts"
					element={userLogin ? <Contacts /> : <WhithoutLoggin />}
				></Route>
				<Route path="/services" element={<Services />}></Route>
				<Route path="/shops" element={<Shops></Shops>}></Route>
				<Route
					path="/locals"
					element={
						userLogin ? (
							<Locals></Locals>
						) : (
							<WhithoutLoggin></WhithoutLoggin>
						)
					}
				></Route>
				<Route
					path="/profile"
					element={
						userLogin ? (
							<Profile></Profile>
						) : (
							<WhithoutLoggin></WhithoutLoggin>
						)
					}
				></Route>
			</Routes>
			<Footer></Footer>
		</>
	);
}

export default App;
