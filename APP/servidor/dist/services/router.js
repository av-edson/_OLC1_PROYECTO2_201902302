"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pruebas_1 = require("../controllers/pruebas");
const router = express_1.Router();
router.get('/', pruebas_1.funcionPrueba);
router.get('/otro', (req, res) => res.send('hello'));
router.post('/compilar', pruebas_1.compilar);
exports.default = router;
