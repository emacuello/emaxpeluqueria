"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookieVerify_1 = require("./middleware/cookieVerify");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(cookieVerify_1.cookieVerify);
exports.app.use(indexRouter_1.default);
