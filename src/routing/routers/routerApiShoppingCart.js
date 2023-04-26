import express from 'express';
import { autenticacion } from '../../negocio/middleware.js/autenticacion.js';
const routerApiShoppingCart = express.Router();


import  {controladorPostItemProducts,
        controladorGetItems,
        controladorDeleteItems,
        controladorDeleteItemsSegunIdProducts
        }  from '../controllers/controllerShoppingCart.js';


routerApiShoppingCart.post('/', autenticacion, controladorPostItemProducts);
routerApiShoppingCart.get('/', autenticacion, controladorGetItems);
routerApiShoppingCart.delete('/', autenticacion, controladorDeleteItems);
routerApiShoppingCart.delete('/:idProd', autenticacion, controladorDeleteItemsSegunIdProducts);


export default routerApiShoppingCart;
