import { PERSISTENCIA } from "../../../daos/db/config.js";
import { carrito } from "./carrito.js";

let Carritos

switch (PERSISTENCIA) {

    case 'mongodb':
        const {ContainerMongodb} = await import('../../../daos/container/containerMongodb.js')     
        const dao_mongodb = new ContainerMongodb('cart');
        Carritos = new carrito(dao_mongodb)
        break  
  
}


export { Carritos } 