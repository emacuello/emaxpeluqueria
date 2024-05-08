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
exports.credentialCheck = exports.newUsers = exports.getUserId = exports.getAllUsers = void 0;
const userRepository_1 = require("../repository/userRepository");
const credentialServices_1 = require("./credentialServices");
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
const getUserId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userById = yield userRepository_1.usersRepository.findID(id);
        if (userById !== undefined)
            return userById;
    }
    catch (error) {
        console.log('Error al encontrar el usuario en la DB', error);
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
        const userCreated = yield userRepository_1.usersRepository.create(newUsers);
        const credential = yield (0, credentialServices_1.addCredential)({
            username: user.username,
            password: user.password,
        });
        if (credential !== undefined)
            userCreated.credential = credential;
        else
            throw Error('Error al crear usuarios, datos incompletos');
        yield userRepository_1.usersRepository.save(userCreated);
        return userCreated;
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
        if (checkUser)
            return (0, exports.getUserId)(checkUser);
        else
            throw Error('Error al encontrar el usuario');
    }
    catch (error) {
        throw Error('Error al validar credenciales');
    }
});
exports.credentialCheck = credentialCheck;
