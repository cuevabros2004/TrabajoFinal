const { ContainerMongodb } = await import('../../daos/container/containerMongodb.js')
import loggerError from '../../negocio/utils/pinoError.js';
import loggerWarn from '../../negocio/utils/pinoWarn.js';
import { usuarioServicio } from '../../negocio/services/usuarioService.js';
import { cifrarJWT, descifrarJWT } from '../../negocio/utils/jwt.js'


const cart = new ContainerMongodb('cart')

//Busca el usuario para corroborar si existe.
//Valida la contraseña. Crea el token y lo envia por el header para que quede logueado el usuario.
async function controladorLoginp(req, res) {

  const usuarioBuscado = await usuarioServicio.existeUsuario(req.body.email)

  //Controlar que exista y los datos sean correctos
  if (usuarioBuscado) {
    const passwordMatch = await usuarioServicio.validaPassword(usuarioBuscado.password, req.body.password)

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

//Llama al servicio que permite la registración del usuario.
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

//Obtiene los datos del usuario logueado.
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



export { controladorLoginp, controladorRegistro,  controladorInfousuario }
