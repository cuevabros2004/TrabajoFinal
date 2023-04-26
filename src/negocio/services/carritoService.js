import { Carritos } from "../repository/carrito/index.js"
import carritos from "../models/carrito.js"
import { usuarioServicio } from "./usuarioService.js"
import { productoServicio } from "./productoService.js"
import Productos from "../models/producto.js"

class CarritoServicio {

    async crearCarrito(objeto) {
        try {
            const cartObject = new carritos(objeto)

            const carritoNuevo = await Carritos.crearCarrito(cartObject)
            return carritoNuevo
        } catch (error) {
            return error
        }
    }


    async listarProductosCarritoUsuario(objeto) {
            const carritoUsuario = await Carritos.buscarCarritoUsuarioPorId(objeto._id)
            const listaProductosCarritoUsuario = await Carritos.listarProductosCarritoPorUsuario(carritoUsuario._id)

            if (!listaProductosCarritoUsuario) {
                throw new Error (`No existen productos en el Carrito con Id: ${carritoUsuario._id}`)
              }

            return listaProductosCarritoUsuario.productos
    }

    async agregaProductosAlCarrito(usuario, objeto) {
        console.log("este es el usuario")
console.log(usuario)
        //const usuarioLogueado = await usuarioServicio.existeUsuario(usuario)
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


        //const prodPost =  carritoUsuario.productos.find(p => p.idProd === objeto.idProd)

        return prodExistente

    }

    async eliminarProductoCarritoPorId(usuario, idProd) {

       // const usuarioLogueado = await usuarioServicio.existeUsuario(usuario)
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

        //const newProd = new carritos(carritoUsuario)

        await Carritos.eliminarProductoCarritoPorId(carritoUsuario._id, carritoUsuario.productos)

        return prodExistentte
    }

    async eliminarProductosCarrito(usuario){
        const Items = await Carritos.buscarCarritoUsuarioPorId(usuario)
console.log(Items)
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