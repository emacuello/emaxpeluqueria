"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAppointment = exports.createAppointment = exports.getAppointmentbyId = exports.getAllAppointments = void 0;
const appointmentRepository_1 = require("../repository/appointmentRepository");
const userServices_1 = require("./userServices");
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointmentRepository_1.appointmentsRepository.findAllAppointments();
        return appointments;
    }
    catch (error) {
        console.log('Error al encontrar en la base de datos', error);
        throw error;
    }
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentbyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentRepository_1.appointmentsRepository.findAppointmentsbyId(id);
        return appointment;
    }
    catch (error) {
        console.log('Error al encontrar en la base de datos', error);
        throw error;
    }
});
exports.getAppointmentbyId = getAppointmentbyId;
const createAppointment = (appointments) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = {
            date: appointments.date,
            time: appointments.time,
            description: appointments.description,
        };
        const newAppointment = appointmentRepository_1.appointmentsRepository.create(appointment);
        const userid = yield (0, userServices_1.getUserId)(appointments.userid);
        if (userid !== undefined)
            newAppointment.user = userid;
        else
            throw Error('Error al crear el turno');
        const saveAppointment = yield appointmentRepository_1.appointmentsRepository.save(newAppointment);
        if (!appointment)
            throw Error('Error al crear el turno');
        return saveAppointment;
    }
    catch (error) {
        console.log('Error al crear el turno', error);
        throw error;
    }
});
exports.createAppointment = createAppointment;
const changeAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointmentRepository_1.appointmentsRepository.statusChanged(id);
        if (appointment.status !== 'cancelled')
            appointment.status = 'cancelled';
        else
            throw Error('El turno ya fue cancelado');
        yield appointmentRepository_1.appointmentsRepository.save(appointment);
    }
    catch (error) {
        console.log('Error al cambiar el estado del turno');
        throw error;
    }
});
exports.changeAppointment = changeAppointment;
