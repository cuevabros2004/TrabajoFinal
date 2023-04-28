import loggerError from "../../negocio/utils/pinoError.js"
import { usuarioServicio } from "../../negocio/services/usuarioService.js"
import { orderService } from "../../negocio/services/order.service.js"


//Llama al servicio que obtiene las ordenes del usuario logueado.
async function controladorGetOrders(req, res){
    try {
        const prods = await orderService.listarOrder(req.user._id)
        res.status(200).json(prods)
      } catch (error) {
        loggerError(error.message)
        res.json({error: error.message})
      }

}

//Llama al servicio que graba los datos de la orden.
async function controladorPostOrders(req, res){
    try {
        const resul = await orderService.grabarOrden(req.user)
        res.status(201).json(resul)
      } catch (error) {
        loggerError(error.message)
        res.json({error: error.message})
      }

}

export {controladorGetOrders, controladorPostOrders}