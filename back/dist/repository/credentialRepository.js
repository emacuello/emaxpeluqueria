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
exports.credentialsRepository = void 0;
const data_source_1 = require("../config/data-source");
const credential_1 = require("../entities/credential");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.credentialsRepository = data_source_1.AppDataSource.getRepository(credential_1.Credential).extend({
    createCredentials: function (credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, username } = credential;
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            const credentials = this.create({
                password: hashPassword,
                username,
            });
            if (!credentials)
                throw new Error('Error en la creacion de las credenciales');
            const newCredentials = yield this.save(credentials);
            if (newCredentials !== undefined)
                return credentials;
            else
                throw Error('Error en la creacion de las credenciales');
        });
    },
    checkCredentials: function (credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = credential;
            const credentials = yield this.findOneBy({ username });
            if (!credentials)
                throw new Error('Credenciales Incorrectas');
            const comparePassword = yield bcrypt_1.default.compare(password, credentials.password);
            if (comparePassword) {
                return credentials.id;
            }
            else
                throw Error('Credenciales Incorrectas');
        });
    },
});
