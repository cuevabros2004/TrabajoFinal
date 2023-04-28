import Productos from '../../models/producto.js'


export class product {

    #dao
    constructor(dao) {
        this.#dao = dao
    }

    //Función que permite grabar productos.
    async grabarProducto(producto) {
        try {
            const resul = await this.#dao.save(producto.datos())
            return resul
        } catch (error) {
            return error
        }
    }

    //función que pemite listar los productos.
    async listarProducto() {
        try {
            const dtos = await this.#dao.getAll()

            if (dtos !== []) {
                const datos = dtos.map(dto => new Productos(dto))
                return datos
            } else
                return null

        } catch (error) {
            return error
        }
    }


    //Función que permite actualizar datos de un producto.
    async actualizarProducto(producto) {
        try {
            const resul = await this.#dao.update(producto.datos())
            return resul
        } catch (error) {
            return error
        }
    }

    //Función que permite eliminar un producto.
    async eliminarProducto(id) {
        try {
            const resul = await this.#dao.deleteById(id)
            return resul
        } catch (error) {
            return error
        }
    }

    //Función que permite obtener los datos de un producto.
    async listarProductoPorId(id) {
        try {
            const dtos = await this.#dao.getById(id)

            if (dtos) {
                const datos = new Productos(dtos)
                return datos
            } else
                return null

        } catch (error) {
            return error
        }
    }

}

