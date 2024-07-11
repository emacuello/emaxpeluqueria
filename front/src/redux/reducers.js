import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	userAppointments: {},
	products: {},
	cart: 0,
	payments: {},
};

const loginCredentials = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
			state.user = action.payload;
		},
		userLogOut: () => initialState,
	},
});

const appointmentsSlice = createSlice({
	name: 'appointments',
	initialState,
	reducers: {
		addAppointments: (state, action) => {
			state.userAppointments = {
				...state.userAppointments,
				...action.payload,
			};
		},
		addOneAppointments: (state, action) => {
			state.userAppointments.appointment.push(action.payload);
		},
		changeAppointments: (state, action) => {
			const appointments = state.userAppointments.appointment;

			let appointmentFound = false;

			for (const key in appointments) {
				if (appointments[key].id === action.payload) {
					appointments[key].status = 'cancelled';
					appointmentFound = true;
					break;
				}
			}

			if (!appointmentFound) {
				throw Error(`Appointment not found`);
			}
		},
	},
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProducts: (state, action) => {
			state.products = action.payload;
		},
	},
});
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.cart = state.cart + action.payload;
		},
		setCountCart: (state, action) => {
			state.cart = action.payload;
		},
	},
});

const paymentsSlice = createSlice({
	name: 'payments',
	initialState,
	reducers: {
		addPayments: (state, action) => {
			state.payments = action.payload;
		},
	},
});

const rootReducer = combineReducers({
	user: loginCredentials.reducer,
	appointments: appointmentsSlice.reducer,
	products: productsSlice.reducer,
	cart: cartSlice.reducer,
	payments: paymentsSlice.reducer,
});

export const { addAppointments, changeAppointments, addOneAppointments } =
	appointmentsSlice.actions;
export const { addUser, userLogOut } = loginCredentials.actions;
export const { addPayments } = paymentsSlice.actions;
export const { addProducts } = productsSlice.actions;
export const { addProduct, setCountCart } = cartSlice.actions;
export default rootReducer;
