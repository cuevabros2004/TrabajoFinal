import express from 'express';
import { esAdmin } from '../../negocio/middleware.js/esAdmin.js';
import { autenticacion } from '../../negocio/middleware.js/autenticacion.js';

const routerApiProducts = express.Router();


import  {controladorGetProductos,
        controladorPostProductos,
        controladorPutProductosSegunId,
        controladorGetProductosSegunId,
        controladorDeleteProductosSegunId}  from '../controllers/controllerProducts.js';



routerApiProducts.post('/',  autenticacion, esAdmin, controladorPostProductos);
routerApiProducts.get('/', controladorGetProductos);
routerApiProducts.get('/:id', controladorGetProductosSegunId);
routerApiProducts.put('/:id', autenticacion, esAdmin, controladorPutProductosSegunId);
routerApiProducts.delete('/:id',  autenticacion, esAdmin, controladorDeleteProductosSegunId);



export default routerApiProducts;
