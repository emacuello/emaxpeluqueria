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
exports.appointmentsRepository = void 0;
const data_source_1 = require("../config/data-source");
const appointments_1 = require("../entities/appointments");
exports.appointmentsRepository = data_source_1.AppDataSource.getRepository(appointments_1.Appointment).extend({
    findAllAppointments: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield this.find({
                relations: {
                    user: true,
                },
            });
            if (appointments !== undefined)
                return appointments;
            else
                throw Error('Error al buscar los turnos');
        });
    },
    findAppointmentsbyId: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield this.createQueryBuilder('appointment')
                .leftJoinAndSelect('appointment.user', 'user')
                .where('appointment.id = :id', { id })
                .getOne();
            if (appointments !== null)
                return appointments;
            else
                throw Error('Error al buscar el ID del turno');
        });
    },
    statusChanged: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointments = yield this.createQueryBuilder('appointment')
                .where('appointment.id = :id', { id })
                .getOne();
            if (appointments !== null)
                return appointments;
            else
                throw Error('Error al cancelar el turno');
        });
    },
});
