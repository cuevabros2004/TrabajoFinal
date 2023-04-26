import { PERSISTENCIA } from '../../daos/db/config.js'
import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import carritos from '../../negocio/models/carrito.js';
import { carritoServicio } from '../../negocio/services/carritoService.js';



async function controladorPostItemProducts(req, res) {
  console.log("req.user")
console.log(req.user)
  try {
    const cartProductsByuserId = await carritoServicio.agregaProductosAlCarrito(req.user, req.body)   
    res.status(201).json(cartProductsByuserId) 
  } catch (error) {    
    loggerError(error.message)
    res.status(201).json(error.message)
  }

}


async function controladorGetItems(req, res) {

  try {
    const cartProductsByuserId = await carritoServicio.listarProductosCarritoUsuario(req.user)
    res.status(201).json(cartProductsByuserId)
  } catch (error) {
    loggerError(error.message)
    res.status(201).json(error.message)
  }

}



async function controladorDeleteItems(req, res) {

  try {
    const eliminados = carritoServicio.eliminarProductosCarrito(req.user)
    res.status(200).json(eliminados)
  } catch (error) {
    loggerError(error.message)
    res.json(error.message)
  }


}



async function controladorDeleteItemsSegunIdProducts( { user, params: {idProd}  } , res) {

  try {
      const productoEliminado = await carritoServicio.eliminarProductoCarritoPorId(user, idProd)     
      res.status(201).json(productoEliminado) 
    } catch (error) {
      loggerError(error.message)
      res.json(error.message)
    }

}



export {
  controladorPostItemProducts, controladorGetItems,
  controladorDeleteItems, controladorDeleteItemsSegunIdProducts
};