"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./src/config/database"));
const server_1 = __importDefault(require("./src/server"));
const port = process.env.PORT || 3000;
(0, database_1.default)();
server_1.default.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
