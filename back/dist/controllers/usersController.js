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
exports.login = exports.postUser = exports.getUserById = exports.getUsers = void 0;
const userServices_1 = require("../services/userServices");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userServices_1.getAllUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(404).json({
            message: 'Error al ingresar los datos',
            detail: 'Usuarios no encontrados',
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const userbyId = yield (0, userServices_1.getUserId)(id);
        if (userbyId === null || userbyId === undefined) {
            throw new Error('Usuario no encontrado');
        }
        res.status(200).json(userbyId);
    }
    catch (error) {
        res.status(404).json({
            detail: 'El id del usuario es incorrecto',
            message: 'Error al buscar el usuario',
        });
    }
});
exports.getUserById = getUserById;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, birthdate, nDni, username } = yield req.body;
        const newUser = yield (0, userServices_1.newUsers)({
            name,
            email,
            password,
            birthdate,
            nDni,
            username,
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(400).json({
            meassage: 'Error al crear usuario',
            detail: 'Los datos son incorrectos',
        });
    }
});
exports.postUser = postUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credenciales = yield req.body;
        const user = yield (0, userServices_1.credentialCheck)(credenciales);
        res.status(200).json({ login: true, user });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error al iniciar sesion',
            details: 'Las credenciales son incorrectas',
        });
    }
});
exports.login = login;
