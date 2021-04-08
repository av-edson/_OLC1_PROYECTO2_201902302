import express, {Application} from 'express';
const webServerConfig = require('../config/web-server')
import usserRoutes from '../services/router';

class Server {
    private app: Application;
    private port:string;
    private apiPaths  = {
        rutas: '/'
    }
    
    constructor() {
        this.app = express()
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