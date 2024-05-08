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
exports.checkCredential = exports.addCredential = void 0;
const credentialRepository_1 = require("../repository/credentialRepository");
const addCredential = (credentialDto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCredential = yield credentialRepository_1.credentialsRepository.createCredentials(credentialDto);
        if (newCredential !== undefined)
            return newCredential;
        else
            throw Error('Error al agregar las credenciales');
    }
    catch (error) {
        console.log('Error al agregar las credenciales', error);
        throw error;
    }
});
exports.addCredential = addCredential;
const checkCredential = (credentialDtos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credential = yield credentialRepository_1.credentialsRepository.checkCredentials(credentialDtos);
        if (credential !== undefined)
            return credential;
        else
            throw Error('Error al encontrar el usuario');
    }
    catch (error) {
        console.log('Eror al hacer el login', error);
        throw error;
    }
});
exports.checkCredential = checkCredential;
