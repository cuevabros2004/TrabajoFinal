const { ContainerMongodb } = await import('../../daos/container/containerMongodb.js')
import ContainerUser from '../../daos/container/containerUser.js'
import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import { EMAILADMIN } from '../../config/config.js'
import { usuarioServicio } from '../../negocio/services/usuarioService.js';
import nodemailer from '../../negocio/utils/nodemailer.js'
import { cifrarJWT, descifrarJWT } from '../../negocio/utils/jwt.js'

const users = new ContainerUser('users')
const cart = new ContainerMongodb('cart')



function controladorLogout(req, res) {
  if (req.session.user) {
    req.session.destroy();
    res.status(200).json({ "mensaje": "Usuario deslogueado" })
  } else {
    loggerWarn({ "mensaje": "No hay Usuario logueado" })
    res.json({ "mensaje": "No hay Usuario logueado" })
  }
}


async function controladorLoginp(req, res) {

  const usuarioBuscado = await usuarioServicio.existeUsuario(req.body.email)

  //Controlar que exista y los datos sean correctos
  if (usuarioBuscado) {
    const passwordMatch = await usuarioServicio.validaPassword(usuarioBuscado.password, req.body.password)

    if (passwordMatch) {
      const token = cifrarJWT(req.body)
      res.header('authorization', token)
      res.status(200).json({"token": token} )
    } else {
      return res.status(401).json('Contraseña Incorrecta')
    }

  } else {
    return res.status(401).json('Usuario no autorizado')
  }

}


async function controladorRegistro(req, res) {

  const objeto = req.body;

  const userRegistered = await usuarioServicio.registerUsuario(req.body)

  res.header('authorization', cifrarJWT(objeto))

  //Doy de alta un carrito para este usuario
  const productos = []

  const carrito = {
    usuario: req.body.username,
    productos: productos
  }
  if (carrito.message)
    loggerError(objeto.message)
  else
    cart.save(carrito)
  ////////////


  //Envio correo al administrador con los datos del usuario dado de alta
  const html = `<h1 style="color: blue;">Datos del Usuario creado: </h1> <strong>Usuario: </strong> ${req.body.email} <br> <strong>Contraseña: </strong> ${req.body.password} <br> <strong>Nombre: </strong> ${req.body.name} <br> <strong>Apellido: </strong> ${req.body.apellido} <br> <strong>Tipo de Usuario: </strong> "Usuario" <br>`
  nodemailer("Mailer", EMAILADMIN, "nuevo registro", html, null)

  res.status(201).json(objeto);

}


async function controladorInfousuario(req, res) {

  if (req.user){
    const usuario = await usuarioServicio.existeUsuario(req.user)
    if (usuario.message) 
      loggerError(usuario.message)
      else
      res.json(usuario)
  } else {
    loggerWarn("No hay usuario logueado")
    res.json({ "mensaje": "No hay usuario logueado" })
  }

}



export { controladorLoginp, controladorRegistro, controladorLogout, controladorInfousuario }
