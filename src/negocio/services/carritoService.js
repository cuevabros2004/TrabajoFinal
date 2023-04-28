import { Carritos } from "../repository/carrito/index.js"
import carritos from "../models/carrito.js"
import { productoServicio } from "./productoService.js"


class CarritoServicio {

    //Crea el carrito
    async crearCarrito(objeto) {
        try {
            const cartObject = new carritos(objeto)

            const carritoNuevo = await Carritos.crearCarrito(cartObject)
            return carritoNuevo
        } catch (error) {
            return error
        }
    }

    //Busca el carrito del usuario y luego con el id del carrito obtiene la lista de productos.
    async listarProductosCarritoUsuario(objeto) {
            const carritoUsuario = await Carritos.buscarCarritoUsuarioPorId(objeto._id)
            const listaProductosCarritoUsuario = await Carritos.listarProductosCarritoPorUsuario(carritoUsuario._id)

            if (!listaProductosCarritoUsuario) {
                throw new Error (`No existen productos en el Carrito con Id: ${carritoUsuario._id}`)
              }

            return listaProductosCarritoUsuario.productos
    }

    //Busca el carrito del usuario mediante el _id del usuario
    //luego obtiene los datos del producto que se desea agregar y lo agrega al carrito.
    async agregaProductosAlCarrito(usuario, objeto) {

        const carritoUsuario = await Carritos.buscarCarritoUsuarioPorId(usuario._id)

        if (!carritoUsuario) {
            throw new Error(`No existe Carrito para el usuario: (${usuario._id})`)
        }

        const productos = await productoServicio.listarProductoPorId(objeto.idProd);

        if (!productos) {
            throw new Error(`No existe el producto con Id: (${objeto.idProd})`)
        }

        let prodExistente = carritoUsuario.productos.find(p => p.idProd === objeto.idProd)

        if (prodExistente) {
            carritoUsuario.productos.find(p => p.idProd === objeto.idProd).cant++
        } else {
            objeto.cant = 1
            prodExistente = objeto
            carritoUsuario.productos.push(objeto)
        }
        const newProd = new carritos(carritoUsuario)
        await Carritos.agregaProductosAlCarrito(newProd)

        return prodExistente

    }

    //Busca el carrito del usuario mediante su _id. Luego busca el producto a eliminar dentro del carrito y lo elimina.

    async eliminarProductoCarritoPorId(usuario, idProd) {

        const carritoUsuario = await Carritos.buscarCarritoUsuarioPorId(usuario._id)

        const prodExistentte = carritoUsuario.productos.find(p => p.idProd === idProd)

        if (prodExistentte) {
            const index = carritoUsuario.productos.findIndex(p => p.idProd === idProd);

            if (prodExistentte.cant === 1) {
                const prodsCarrito = carritoUsuario.productos.splice(index, 1)
                carritoUsuario.productos = prodsCarrito

            } else {
                carritoUsuario.productos.find(p => p.idProd === idProd).cant--
            }

        } else {
            throw new Error('Producto con id: ' + idProd + ' inexistente')
        }

        await Carritos.eliminarProductoCarritoPorId(carritoUsuario._id, carritoUsuario.productos)

        return prodExistentte
    }

    //busca el carrito del usuario y elimina los productos del mismo.
    async eliminarProductosCarrito(usuario){
        const Items = await Carritos.buscarCarritoUsuarioPorId(usuario)

        if(!Items)
         return "No hay carritos"
 
        const indiceBuscado = Items.findIndex(c => c.usuario === usuario._id);
      
        if (indiceBuscado === -1) 
            throw new Error(`no existe carrito para el usuario (${usuario._id})`);

        if(!Items[indiceBuscado].productos[0]) 
            throw new Error(`el carrito para el usuario (${usuario._id}) no tiene productos`);

        const borrados = Items[indiceBuscado].productos

        await Carritos.eliminarCarrito(usuario._id)

        return borrados    
    }

}



export const carritoServicio = new CarritoServicio()