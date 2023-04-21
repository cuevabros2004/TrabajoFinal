import {usuarioServicio} from '../../negocio/services/usuarioService.js'
import { EMAILADMIN } from '../../config/config.js';
import loggerError from '../utils/pinoError.js';
import loggerWarn from '../utils/pinoWarn.js';

export async function esAdmin(req, res, next){

    if(req.user){
      const usuario = await usuarioServicio.existeUsuario(req.user)
      if(usuario.message)
       loggerError(usuario.message)
      else
          if(usuario.email === EMAILADMIN)         
           next()
         else
           res.json({"mensaje": "El usuario no es Admin"})
     } else {
      loggerWarn("No hay usuario logueado")
      res.json({"mensaje": "No hay usuario logueado"})
    }
  
   }
  