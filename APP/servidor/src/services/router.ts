import {Router} from 'express';
import {compilar, funcionPrueba} from '../controllers/pruebas';
import {compilarEntrada} from '../controllers/compilerController'

const router = Router();

router.get('/',funcionPrueba);
router.get('/otro',(req,res)=> res.send('hello'))

router.post('/compilar', compilarEntrada)

export default router;