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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialCheck = exports.newUsers = exports.getUserId = exports.getAllUsers = void 0;
const envs_1 = require("../config/envs");
const userRepository_1 = require("../repository/userRepository");
const credentialServices_1 = require("./credentialServices");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = userRepository_1.usersRepository.findAllUsers();
        return users;
    }
    catch (error) {
        throw Error('Error al encontrar los usuarios en la DB');
    }
});
exports.getAllUsers = getAllUsers;
const getUserId = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userById = yield userRepository_1.usersRepository.findID(id);
        if (!userById)
            throw Error('El usuario con el id no fue encontrado');
        if (userById.email !== (user === null || user === void 0 ? void 0 : user.aud)) {
            throw Error('No estas autorizado para realizar esta accion');
        }
        return userById;
    }
    catch (error) {
        console.log('Error al encontrar el usuario en la DB', error);
        throw error;
    }
});
exports.getUserId = getUserId;
const newUsers = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUsers = {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
        };
        const userCreated = userRepository_1.usersRepository.create(newUsers);
        const credential = yield (0, credentialServices_1.addCredential)({
            username: user.username,
            password: user.password,
        });
        if (credential !== undefined) {
            userCreated.credential = credential;
            yield userRepository_1.usersRepository.save(userCreated);
            return userCreated;
        }
        else
            throw Error('Error al crear usuarios, datos incompletos');
    }
    catch (error) {
        console.log('error al crear el usuario', error);
        throw error;
    }
});
exports.newUsers = newUsers;
const credentialCheck = (credenciales) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield (0, credentialServices_1.checkCredential)(credenciales);
        if (!checkUser)
            throw Error('Error validar credenciales');
        const user = yield (0, exports.getUserId)(checkUser);
        if (!user)
            throw Error('Error al encontrar el usuario');
        const payload = {
            sub: user.id,
            aud: user.email,
        };
        if (envs_1.SECRET_KEY === undefined)
            throw Error('Error al generar el token 1');
        const token = jsonwebtoken_1.default.sign(payload, envs_1.SECRET_KEY, { expiresIn: '7h' });
        if (!token)
            throw Error('Error al generar el token 2');
        return token;
    }
    catch (error) {
        throw Error('Error al validar credenciales');
    }
});
exports.credentialCheck = credentialCheck;
