import express from 'express';
import { controladorLoginp } from '../controllers/controllerLogin.js';
import passport from "passport";
import {controladorRegistro} from '../controllers/controllerLogin.js';
import {controladorLogout} from '../controllers/controllerLogin.js';
import {controladorInfousuario} from '../controllers/controllerLogin.js';
import { autenticacion } from '../../negocio/middleware.js/autenticacion.js';
import { esAdmin } from '../../negocio/middleware.js/esAdmin.js';


const routerLogin = express.Router();

routerLogin.post('/api/sessions',  controladorLoginp); 
routerLogin.post('/api/users', autenticacion, esAdmin, controladorRegistro);
routerLogin.get('/api/users', autenticacion, controladorInfousuario);
routerLogin.post('/logout',  controladorLogout);




function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next(); 
    }
    res.redirect('/')
  }



export default routerLogin;

