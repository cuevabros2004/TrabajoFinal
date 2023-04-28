import express from 'express';
import { controladorLoginp } from '../controllers/controllerLogin.js';
import {controladorRegistro} from '../controllers/controllerLogin.js';
import {controladorInfousuario} from '../controllers/controllerLogin.js';
import { autenticacion } from '../../negocio/middleware.js/autenticacion.js';


const routerLogin = express.Router();

routerLogin.post('/api/sessions',  controladorLoginp); 
routerLogin.post('/api/users', controladorRegistro);
routerLogin.get('/api/users', autenticacion, controladorInfousuario);


export default routerLogin;

