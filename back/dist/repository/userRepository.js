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
exports.usersRepository = void 0;
const data_source_1 = require("../config/data-source");
const Users_1 = require("../entities/Users");
exports.usersRepository = data_source_1.AppDataSource.getRepository(Users_1.User).extend({
    findID: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userbyid = yield this.createQueryBuilder('user')
                .leftJoinAndSelect('user.appointment', 'appointment')
                .where('user.id = :id', { id })
                .getOne();
            if (userbyid != null && userbyid != undefined)
                return userbyid;
            else
                throw Error('El usuario con el id no fue encontrado');
        });
    },
    findAllUsers: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.find({ relations: { appointment: true } });
            if (users)
                return users;
            else
                throw Error('No se encontraron los usuarios');
        });
    },
});
