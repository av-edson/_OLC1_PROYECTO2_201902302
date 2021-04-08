import {Router} from 'express';
import {funcionPrueba} from '../controllers/pruebas';

const router = Router();

router.get('/',funcionPrueba);

export default router;