export const validate = (inputs, notAvailable) => {
	const errors = {};
	const regexPass = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,_-])([A-Za-z\d$@$!%*?&.,_-]|[^ ]){8,15}$/
	);
	const regexMail = new RegExp(
		/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
	);
	const regexName = new RegExp(
		/^(?!(?:\S+\s*){20})[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
	);
	const regexUsername = new RegExp(
		/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()\-_+=.]{3,20}$/
	);
	const regexDni = new RegExp(/^\d{5,10}$/);

	if (inputs.password !== '' && !regexPass.test(inputs.password)) {
		errors.password =
			'Por favor, comprueba que tu contraseña cuente con entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial';
	}
	if (inputs.email !== '' && !regexMail.test(inputs.email)) {
		errors.email = 'Por favor, introduce un correo electrónico valido';
	}
	if (inputs.name !== '' && !regexName.test(inputs.name)) {
		errors.name = 'Por favor, introduce un nombre valido';
	}
	if (inputs.username !== '' && !regexUsername.test(inputs.username)) {
		errors.username = 'Por favor, introduce un username valido';
	}
	if (inputs.nDni !== '' && !regexDni.test(inputs.nDni)) {
		errors.nDni =
			'Por favor, introduce un dni valido, entre 5 y 10 caracteres';
	}
	if (inputs.birthdate !== '' && validateDate(inputs.birthdate)) {
		errors.birthdate = inputs.birthdate + ' es una fecha no valida';
	}

	if (notAvailable) {
		if (notAvailable.includes(inputs.username)) {
			errors.username = 'El usuario ya existe, introduce otro';
		}
	}
	return errors;
};

const validateDate = (date) => {
	const currentDate = validateCurrentDate();
	if (date > currentDate) return true;

	return false;
};
export const validateSecurity = (inputs) => {
	const errors = {};
	const regexPass = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,_-])([A-Za-z\d$@$!%*?&.,_-]|[^ ]){8,15}$/
	);
	if (inputs.oldPassword !== '' && !regexPass.test(inputs.oldPassword)) {
		errors.oldPassword =
			'Por favor, comprueba que tu contraseña cuente con entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial';
	}
	if (inputs.newPassword !== '' && !regexPass.test(inputs.newPassword)) {
		errors.newPassword =
			'Por favor, comprueba que tu contraseña cuente con entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial';
	}
	if (
		inputs.confirmPassword !== '' &&
		!regexPass.test(inputs.confirmPassword)
	) {
		errors.confirmPassword =
			'Por favor, comprueba que tu contraseña cuente con entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial';
	}
	if (
		inputs.confirmPassword !== '' &&
		inputs.confirmPassword !== inputs.newPassword
	) {
		errors.password = 'Las contraseñas no coinciden';
	}
	return errors;
};
export const validateLogin = (inputs) => {
	const errors = {};
	const regexPass = new RegExp(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.,_-])([A-Za-z\d$@$!%*?&.,_-]|[^ ]){8,15}$/
	);
	const regexUsername = new RegExp(
		/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()\-_+=.]{3,20}$/
	);
	if (!regexPass.test(inputs.password)) {
		errors.password =
			'Por favor, comprueba que tu contraseña cuente con entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial ($, @, !, %, *, ?, &, ,, ., _ o -.)';
	}
	if (!regexUsername.test(inputs.username)) {
		errors.username = 'Por favor, introduce un username valido';
	}

	return errors;
};

export const validateFields = (user) => {
	for (const key in user) {
		if (!user[key]) {
			return true;
		}
	}
	return false;
};
export const validateFieldsErrors = (errors) => {
	for (let key in errors) {
		if (errors[key]) {
			return false; // Si hay un campo con datos, retornar false
		}
	}
	return true; // Si todos los campos están vacíos, retornar true
};
export const validateFieldsErrors2 = (data) => {
	let error = true;
	for (const key in data) {
		if (!data[key]) {
			error = false;
		}
	}
	return error;
};

const validateCurrentDate = () => {
	const today = new Date();
	const year = today.getFullYear();
	let month = today.getMonth() + 1;
	let day = today.getDate();
	if (month < 10) {
		month = '0' + month;
	}
	if (day < 10) {
		day = '0' + day;
	}

	const date = `${year}-${month}-${day}`;
	return date;
};

const validateHour = () => {
	const today = new Date();
	const hour = today.getHours();
	const minutes = today.getMinutes();
	const currentHour = `${hour}:${minutes}`;
	return currentHour;
};
export const validateAppointments = (appointment) => {
	const error = {};
	const validateDay = new Date(appointment.date);
	const day = validateDay.getDay();
	if (
		(appointment.date !== '' && appointment.date < validateCurrentDate()) ||
		day === 0 ||
		day === 6
	) {
		error.date =
			'Por favor, introduce una fecha válida, no puede ser en el pasado y recuerda que no trabajamos los domingos y lunes';
	}
	if (appointment.date <= validateCurrentDate() || day === 0 || day === 6) {
		if (appointment.time !== '' && appointment.time < validateHour()) {
			error.time = 'Por favor, introduce una hora válida';
		}
	}
	if (
		appointment.description !== '' &&
		typeof appointment.description !== 'string' &&
		appointment.description === 'Servicios'
	) {
		error.description = 'Por favor, selecciona un servicio';
	}
	return error;
};
