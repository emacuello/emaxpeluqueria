"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const users_1 = __importDefault(require("../middleware/users"));
const usersRouter = (0, express_1.Router)();
usersRouter.post('/register', users_1.default, usersController_1.postUser);
usersRouter.get('/:id', usersController_1.getUserById);
usersRouter.get('/', usersController_1.getUsers);
usersRouter.post('/login', usersController_1.login);
exports.default = usersRouter;
