import express, {Application} from 'express';
const webServerConfig = require('../config/web-server')
import usserRoutes from '../services/router';
import morgan from 'morgan'
import cors from 'cors'

class Server {
    private app: Application;
    private port:string;
    
    private apiPaths  = {
        rutas: '/'
    }
    
    constructor() {
        this.app = express()
        this.app.use(morgan('dev'))
        this.app.use(cors());
        this.app.use(express.json());
        this.port = webServerConfig.port;
        this.routes();
    }

    listen() {
        this.app.listen( this.port, () =>{
            console.log('Servidor iniciado en el puerto ' + this.port);
        })
    }

    routes() {
        this.app.use(this.apiPaths.rutas, usserRoutes);
    }
}

export default Server;