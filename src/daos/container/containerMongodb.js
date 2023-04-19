import { mongoDatabase } from '../db/mongoClient.js';

class ContainerMongodb {

    coleccion;

    constructor(nombreColeccion) {
        this.coleccion = mongoDatabase.collection(nombreColeccion);
    }



    //PRODUCTOS y CARRITO 
    async save(objeto) {

        try {
            await this.coleccion.insertOne(objeto)
            return 'Id del objeto guardado: ' + this.coleccion._id
        }
        catch (error) {
            return error
        }

    }


    //PRODUCTOS y CARRITO
    async getByIdUser(usuario) {

        try {

            const carrito = await this.coleccion.find({ usuario: usuario }).toArray()

            if (!carrito) {
                return null
            } else {
                return carrito[0];
            }

        }

        catch (error) {
            return error
        }

    }



    async getById(id) {

        try {

            const objetoBuscado = await this.coleccion.find({ _id: id }).toArray()

            if (objetoBuscado[0] === undefined) {
                return null
            } else {
                return objetoBuscado[0];
            }

        }

        catch (error) {
            error => { throw error }
        }

    }


    //PRODUCTOS y CARRITO
    async getAll() {

        try {

            const objetoBuscado = await this.coleccion.find({}).toArray()

            if (objetoBuscado === undefined) {
                return null
            } else {
                return objetoBuscado;
            }

        }

        catch (error) {
            return error
        }

    }


    //PRODUCTOS y CARRITO
    async deleteById(id) {
        try {
            const objetoBorrado = await this.coleccion.find({ _id: id }).toArray()

            if (objetoBorrado[0]) {
                await this.coleccion.deleteOne({ _id: id })
                return objetoBorrado[0]
            } else {
                return null
            }
        }

        catch (error) {
            return error
        }

    }


    //PRODUCTOS y CARRITO
    async update(objeto) {

        try {
            await this.coleccion.updateMany({ _id: objeto._id }, { $set: { "name": objeto.name, "description": objeto.description, "price": objeto.price, "image(url)": objeto.imageurl } })
            return objeto;
        }
        catch (error) {
            return error
        }
    }


    //CARRITO
    async save_products(objeto) {
        try {
            console.log(objeto)
            await this.coleccion.updateOne({ _id: objeto._id }, { $set: { "productos": objeto.productos } })
            return objeto;
        }
        catch (error) {
            return error
        }
    }


    //CARRITO
    async deleteByIdCart(usuario) {
        try {
            const carritoVaciado = await this.coleccion.updateOne({ usuario: usuario }, { $set: { "productos": [] } })
            return carritoVaciado
        }
        catch (error) {
            return error
        }
    }


    //CARRITO
    async deleteByIdProd(indice_cart, indice_prod) {
        try {
            this.cart = await this.getAll()
            const eliminado = this.cart[indice_cart].productos.splice(indice_prod, 1)
            await this.coleccion.updateOne({ _id: this.cart[indice_cart]._id }, { $set: { "productos": this.cart[indice_cart].productos } })
            return eliminado
        }
        catch (error) {
            return error
        }
    }


    //Funciones de usuarios
    async esAdmin(usuario) {
        try {
            const user = await this.coleccion.findOne({ username: usuario })
            if (user.tipo_usuario == USUARIOADMIN) {
                return true
            }
            else {
                return false
            }
        } catch (error) {
            return error
        }
    }

    async buscar_usuario(usuario) {
        try {
            const user = await this.coleccion.findOne({ email: usuario })
            return user
        } catch (error) {
            return error
        }
    }

 


}





export { ContainerMongodb };