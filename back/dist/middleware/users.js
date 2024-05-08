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
const verificationsUsersField = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, birthdate, nDni, username } = req.body;
        if (!name || !email || !password || !birthdate || !nDni || !username) {
            return res.status(400).json({
                message: 'Error al crear usuario',
                detail: 'Los campos estan incompletos',
            });
        }
        else
            next();
    }
    catch (error) {
        console.error('Error en el middleware verificationsUsersField:', error);
        return res.status(500).json({
            message: 'Error interno del servidor',
            detail: 'Por favor, inténtalo de nuevo más tarde',
        });
    }
});
exports.default = verificationsUsersField;
