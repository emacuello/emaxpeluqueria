"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("../controllers"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
const appointmentsRouter_1 = __importDefault(require("./appointmentsRouter"));
const router = (0, express_1.Router)();
router.use('/users', usersRouter_1.default);
router.use('/appointment', appointmentRouter_1.default);
router.use('/appointments', appointmentsRouter_1.default);
router.use('/', controllers_1.default);
exports.default = router;
