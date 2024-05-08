"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get('/', appointmentController_1.getAppointments);
exports.default = appointmentsRouter;
