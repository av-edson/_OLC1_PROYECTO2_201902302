"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webServerConfig = require('../config/web-server');
const router_1 = __importDefault(require("../services/router"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            rutas: '/'
        };
        this.app = express_1.default();
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.port = webServerConfig.port;
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor iniciado en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.rutas, router_1.default);
    }
}
exports.default = Server;
