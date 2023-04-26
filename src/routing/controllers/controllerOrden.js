import loggerError from "../../negocio/utils/pinoError.js"
import { usuarioServicio } from "../../negocio/services/usuarioService.js"
import { orderService } from "../../negocio/services/order.service.js"

async function controladorGetOrders(req, res){
    try {
        const {_id} = await usuarioServicio.existeUsuario(req.user)
        const prods = await orderService.listarOrder(_id)
        res.status(200).json(prods)
      } catch (error) {
        loggerError(error.message)
        res.json({error: error.message})
      }

}

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