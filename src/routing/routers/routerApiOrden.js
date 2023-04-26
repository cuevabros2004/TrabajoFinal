import express from 'express';
import { controladorPostOrders } from '../controllers/controllerOrden.js';
import { controladorGetOrders } from '../controllers/controllerOrden.js';
import { autenticacion } from '../../negocio/middleware.js/autenticacion.js';

const routerApiOrden = express.Router();

routerApiOrden.post('/', autenticacion,  controladorPostOrders); 
routerApiOrden.get('/',  autenticacion, controladorGetOrders); 



export default routerApiOrden;

