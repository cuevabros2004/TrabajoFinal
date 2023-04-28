import Ordenes from '../../models/orden.js'


export class order {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    //Función que permite grabar la orden de compra del usuario.
    async grabarOrden(order) {
        try {
            const resul = await this.#dao.save(order.datos())
            return resul
        } catch(error) {
            return error
        }
    }

    //Permite listar ordenes de compras del usuario.
    async listarOrder(usuario) {
        try {
            const dtos = await this.#dao.getByIdUserOrders(usuario)
          if(dtos !== []){
            const datos = dtos.map(dto => new Ordenes(dto))
            return datos
          } else 
            return null

        } catch (error) {
            return error
        }
    }

}

