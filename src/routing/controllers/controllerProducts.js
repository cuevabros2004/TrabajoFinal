import loggerError from '../../negocio/utils/pinoError.js';
import {productoServicio} from '../../negocio/services/productoService.js'
import loggerWarn from '../../negocio/utils/pinoWarn.js';
 

//llama al servicio que permite grabar el producto.
async function controladorPostProductos(req, res) {
    res.status(201);
    const dataProd = req.body;
    
    const resul = await productoServicio.grabarProducto(dataProd)

    if (resul.message)
        loggerError(resul.message)
    else
        res.json(dataProd)
}

//Permite listar los productos existentes.
async function controladorGetProductos(req, res) {
    const productos = await productoServicio.listarProducto();
    if (productos)
        if (productos.message)
            loggerError(productos.message)
        else
            res.status(201).json(productos);
    else
        res.json({ "mensaje": "No hay producrtos" })
}

//permite obtener los datos de un producto.
async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await productoServicio.listarProductoPorId(id);

    if (!productos) {
        res.status(200);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if (productos.message)
            loggerError(productos.message)
        else {
            res.json(productos);
        }
    }
}


//Permite actualizar los datos de un producto.
async function controladorPutProductosSegunId({ body, params: { id } }, res) {

    const productos = await productoServicio.listarProductoPorId(id);

    if (!productos) {
        res.status(200);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if (productos.message)
            loggerError(productos.message)
        else {
            body._id = id;
            await productoServicio.actualizarProducto(body);
            res.status(201).json(body);
        }
    }

}

//Permite eliminar un producto.
async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await productoServicio.eliminarProducto(id);

    if (!productos) {
        res.status(200);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if (productos.message)
            loggerError(productos.message)
        else {
            res.json(productos);
        }
    }
}






export {
    controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, controladorPutProductosSegunId,
    controladorDeleteProductosSegunId
};