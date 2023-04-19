import Usuarios from "../models/usuario.js";
import { randomUUID } from "crypto";
import { User } from "../repository/usuario/index.js";
import { user } from "../../daos/db/config.js";
import {validatePassword, createHash} from '../utils/authentication.js'

class UsuarioServicio{

    async loginUsuario(objeto){

        try {
            return objeto
        } catch (error) {
            return error
        }

    }

    async registerUsuario(objeto){

        try {     
            //encripto la clave para que se guarde encriptada en la bd       
            objeto.password =  createHash(objeto.password)
            
            const user = new Usuarios(objeto);            
            const userRegister = await User.registerUsuario(user)

            return userRegister

        } catch (error) {
            return error
        }

    }

    async existeUsuario(usuario){
        try {           
           const usuarioBuscado = await User.buscarUsuario(usuario)
           return usuarioBuscado
           
        } catch (error) {
            return error
            
        }
    }

    async validaPassword(passwordReq, passwordBD){
        try {
            const correctPassword = await validatePassword(passwordReq, passwordBD)

            return correctPassword

        } catch (error) {
            return error
        }
    }

}

export const usuarioServicio = new UsuarioServicio();