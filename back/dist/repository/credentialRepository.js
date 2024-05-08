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
exports.credentialsRepository = void 0;
const data_source_1 = require("../config/data-source");
const credential_1 = require("../entities/credential");
exports.credentialsRepository = data_source_1.AppDataSource.getRepository(credential_1.Credential).extend({
    createCredentials: function (credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentials = yield this.create(credential);
            yield this.save(credentials);
            if (credentials !== undefined)
                return credentials;
            else
                throw Error('Eror en la creacion de las credenciales');
        });
    },
    checkCredentials: function (credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = credential;
            const credentials = yield this.findOneBy({ username });
            if ((credentials === null || credentials === void 0 ? void 0 : credentials.password) === password) {
                return credentials.id;
            }
            else
                throw Error('Error al buscar las credenciales');
        });
    },
});
