"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_server_1 = __importDefault(require("./services/web-server"));
const servidor = new web_server_1.default();
servidor.listen();
//# sourceMappingURL=index.js.map