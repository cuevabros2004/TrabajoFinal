import carritos from "../../models/carrito.js";


export class carrito {
    #dao

    constructor(dao) {
        this.#dao = dao
    }

    //funciíón que permite crear carrito para el usuario registrado.
    async crearCarrito(carrito) {
        try {
            const carritoCreado = await this.#dao.save(carrito.datos())
            return carritoCreado
        } catch (error) {
            return error
        }

    }

    //función que permite lista los productos del carrito logueado.
    async listarProductosCarritoPorUsuario(_id) {
        try {
            const listaProductosCarritoUsuario = await this.#dao.getById(_id)
            return listaProductosCarritoUsuario
        } catch (error) {
            return error
        }
    }

    //Busca el carrito del usuario.
    async buscarCarritoUsuarioPorId(idUsuario) {

        try {
            const carritoUsuario = await this.#dao.getCarritoByUserId(idUsuario)
            return carritoUsuario
        } catch (error) {
            return error
        }
    }

    //función que permite agregar productos al carrito.
    async agregaProductosAlCarrito(objeto) {
        try {
            const prodAgregado = await this.#dao.save_products(objeto)
            return prodAgregado
        } catch (error) {
            return error
        }
    }

    //Función que elimina productos del carrito.
    async eliminarProductoCarritoPorId(idCart, productos){
        try {
            const prodEliminado = await this.#dao.deleteByIdProd(idCart, productos)
            return prodEliminado
        } catch (error) {
            return error
        }
    }

    //Función que permite eliminar el carrito del usuario.
    async eliminarCarrito(usuario) {
        try {
            const resul = await this.#dao.deleteByIdCart(usuario)
            return resul
        } catch(error) {
            return error
        }
    }

}