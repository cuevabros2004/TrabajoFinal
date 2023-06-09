import { STRING_CONEXION_MONGO, BD_MONGO } from '../../src/config/config.js'
import { PUERTO_POR_DEFECTO } from '../../src/config/config.js'
import express from 'express';
import routerApiProducts from './routers/routerApiProducts.js'
import routerApiShoppingCart from './routers/routerApiShoppingCart.js'
import { Server as HttpServer } from 'http'
import routerLogin from './routers/routerLogin.js'
import routerApiOrden from './routers/routerApiOrden.js';
import loggerError from '../negocio/utils/pinoError.js';
import parseArgs from 'yargs/yargs'
import routerImage from './routers/routerImagenes.js';

const servidor = express()

const httpServer = new HttpServer(servidor)

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))


//Middlewares para los routers
servidor.use('/api/products', routerApiProducts)
servidor.use('/api/shoppingcartproducts', routerApiShoppingCart)
servidor.use('/', routerLogin)
servidor.use('/api/orders', routerApiOrden)
servidor.use('/api/images', routerImage)
servidor.use(express.static('public'))
servidor.use(express.static('public/img'))
servidor.use((err, req, res, next) => loggerError(err.message));


//Si viene de una ruta no implementada
servidor.all('*', (req, res) => {
  res.status(404).json({ error: "404", descripcion: "ruta " + req.url + " método " + req.method + " no implementado" })
})



const yargs = parseArgs(process.argv.slice(2))

const argv = yargs.alias({ p: 'port' }).default({ port: PUERTO_POR_DEFECTO }).argv

const puerto = argv.port



function conectar() {
  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })

  })
}



export default conectar


















