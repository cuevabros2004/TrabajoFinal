const { ContainerMongodb } = await import('../../daos/container/containerMongodb.js')
import ContainerUser from '../../daos/container/containerUser.js'
import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import { EMAILADMIN } from '../../config/config.js'
import { usuarioServicio } from '../../negocio/services/usuarioService.js';
import nodemailer from '../../negocio/utils/nodemailer.js'
import { cifrarJWT, descifrarJWT } from '../../negocio/utils/jwt.js'
import { carritoServicio } from '../../negocio/services/carritoService.js';

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
    console.log("usuario buscado")
console.log(usuarioBuscado)
    if (passwordMatch) {
      const token = cifrarJWT(usuarioBuscado)
      res.header('authorization', token)
      res.status(200).json({ "token": token })
    } else {
      res.status(401).json('Contraseña Incorrecta')
    }

  } else {
    return res.status(401).json('Usuario no autorizado')
  }

}


async function controladorRegistro(req, res) {

  try {
    const objeto = req.body;

    const userRegistered = await usuarioServicio.registerUsuario(req.body)
    
    res.header('authorization', cifrarJWT(objeto))
    res.status(201).json(userRegistered)
  } catch (error) {
    res.status(201).json(error.message)
  }
  


  

}


async function controladorInfousuario(req, res) {

  if (req.user) {
    const usuario = await usuarioServicio.existeUsuario(req.user.email)
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
