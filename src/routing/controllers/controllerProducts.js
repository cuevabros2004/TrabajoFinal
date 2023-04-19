import loggerError from '../../negocio/utils/pinoError.js';
import {productoServicio} from '../../negocio/services/productoService.js'
 
 

async function controladorPostProductos(req, res) {
    res.status(201);
    const dataProd = req.body;
    
    const resul = await productService.grabarProducto(objeto)

    if (resul.message)
        loggerError(resul.message)
    else
        res.json(objeto)
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

    const productos = await productService.listarProductoPorId(id);

    if (!productos) {
        res.status(404);
        loggerWarn(`no se encontró producto con ese id (${id})`)
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        if (productos.message)
            loggerError(productos.message)
        else {
            body._id = id;
            await prodTest.update(body);
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


async function soloParaAdmins(req, res, next) {

    const esAdmin = await users.esAdmin(req.session.user)

    if (req.session.user) {
        if (esAdmin.message)
            loggerError(esAdmin.message)
        else {
            if (await esAdmin) {
                next()
            } else {
                loggerWarn("error: 403, descripcion:  ruta " + req.originalUrl + " método " + req.method + " no autorizada")
                res.status(403).json({ error: "403", descripcion: "ruta " + req.originalUrl + " método " + req.method + " no autorizada" })
            }
        }
    } else {
        loggerWarn("No hay un usuario logueado")
        res.status(201).json({ "mensaje": "No hay un usuario logueado" })
    }

}



export {
    controladorGetProductos, controladorPostProductos, controladorGetProductosSegunId, controladorPutProductosSegunId,
    controladorDeleteProductosSegunId, soloParaAdmins
};