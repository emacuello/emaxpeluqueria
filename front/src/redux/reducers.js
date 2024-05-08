import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	userAppointments: {},
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

const rootReducer = combineReducers({
	user: loginCredentials.reducer,
	appointments: appointmentsSlice.reducer,
});

export const { addAppointments, changeAppointments } =
	appointmentsSlice.actions;
export const { addUser, userLogOut } = loginCredentials.actions;

export default rootReducer;
