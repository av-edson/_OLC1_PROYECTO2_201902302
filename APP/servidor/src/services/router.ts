import {Router} from 'express';
import {compilar, funcionPrueba} from '../controllers/pruebas';

const router = Router();

router.get('/',funcionPrueba);
router.get('/otro',(req,res)=> res.send('hello'))

router.post('/compilar', compilar)

export default router;