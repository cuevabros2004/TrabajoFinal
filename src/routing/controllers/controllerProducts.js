import loggerError from '../../negocio/utils/pinoError.js';
import {productoServicio} from '../../negocio/services/productoService.js'
import loggerWarn from '../../negocio/utils/pinoWarn.js';
 

async function controladorPostProductos(req, res) {
    res.status(201);
    const dataProd = req.body;
    
    const resul = await productoServicio.grabarProducto(dataProd)

    if (resul.message)
        loggerError(resul.message)
    else
        res.json(dataProd)
}

async function controladorGetProductos(req, res) {
    const productos = await productoServicio.listarProducto();
    if (productos)
        if (productos.message)
            loggerError(productos.message)
        else
            res.json(productos);
    else
        res.json({ "mensaje": "No hay producrtos" })
}

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await productoServicio.listarProductoPorId(id);

    if (!productos) {
        res.status(404);
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


async function controladorPutProductosSegunId({ body, params: { id } }, res) {

    const productos = await productoServicio.listarProductoPorId(id);

    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if (productos.message)
            loggerError(productos.message)
        else {
            body._id = id;
            await productoServicio.actualizarProducto(body);
            res.json(body);
        }
    }

}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await productoServicio.eliminarProducto(id);

    if (!productos) {
        res.status(404);
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