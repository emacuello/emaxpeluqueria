"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const appointments_1 = __importDefault(require("../middleware/appointments"));
const appointmentRouter = (0, express_1.Router)();
appointmentRouter.post('/schedule', appointments_1.default, appointmentController_1.postAppointment);
appointmentRouter.put('/cancel/:id', appointmentController_1.putAppointment);
appointmentRouter.get('/:id', appointmentController_1.getAppointment);
exports.default = appointmentRouter;
