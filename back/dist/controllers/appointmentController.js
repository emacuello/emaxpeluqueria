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
exports.putAppointment = exports.postAppointment = exports.getAppointments = exports.getAppointment = void 0;
const appointmentServices_1 = require("../services/appointmentServices");
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield Number(req.params.id);
        const result = yield (0, appointmentServices_1.getAppointmentbyId)(id);
        res.status(200).json(result);
    }
    catch (error) {
        console.log('Error encontrar el turno en la base de datos', error);
        res.status(404).json({
            message: 'Turno no encontrado',
            details: 'Error al ingresar los datos',
        });
    }
});
exports.getAppointment = getAppointment;
const getAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, appointmentServices_1.getAllAppointments)();
        res.status(200).json(result);
        console.log('Turnos encontrados');
    }
    catch (error) {
        res.status(404).json({
            message: 'Error al buscar los turnos',
            details: 'Los datos son incorrectos',
        });
    }
});
exports.getAppointments = getAppointments;
const postAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, time, userid, description } = yield req.body;
        const result = yield (0, appointmentServices_1.createAppointment)({
            date,
            time,
            userid,
            description,
        });
        if (!result)
            throw Error('Error al crear el turno');
        res.status(201).json({ details: 'Turno creado exitosamente' });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error al crear el turno',
            details: 'los datos son incorrectos',
        });
        console.log('Error al crear el turno', error);
    }
});
exports.postAppointment = postAppointment;
const putAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield Number(req.params.id);
        yield (0, appointmentServices_1.changeAppointment)(id);
        res.status(200).json({ details: 'Turno cancelado con exito' });
    }
    catch (error) {
        console.log('Error al cambiar el estado del turno', error);
        res.status(404).json({
            message: 'Error cancelar el turno',
            details: 'Los datos son incorrectos o el turno ya fue cancelado',
        });
    }
});
exports.putAppointment = putAppointment;
