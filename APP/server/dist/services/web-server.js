"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webServerConfig = require('../config/web-server');
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = webServerConfig.port;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor iniciado en el puerto' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=web-server.js.map