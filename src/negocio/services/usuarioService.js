import Usuarios from "../models/usuario.js";
import { User } from "../repository/usuario/index.js";
import { validatePassword, createHash } from '../utils/authentication.js'
import { carritoServicio } from "./carritoService.js";
import nodemailer from '../../negocio/utils/nodemailer.js'
import { EMAILADMIN } from "../../config/config.js";

class UsuarioServicio {

    //Controla si ya existe el usuario. Si no existe encripta la clave, 
    //graba el usuario y el carrito vacio para el usuario.
    async registerUsuario(objeto) {

        const usuarioNuevoBuscado = await this.existeUsuario(objeto.email)

        if (usuarioNuevoBuscado) {
            throw new Error(`Usuario: ${usuarioNuevoBuscado.email} ya existe`);
        }           
            //encripto la clave para que se guarde encriptada en la bd       
            objeto.password = createHash(objeto.password)

            const user = new Usuarios(objeto);

            const userRegistered = await User.registerUsuario(user)

            const carritoObject = {
                idUsuario: user._id,
                productos: []
            }

            await carritoServicio.crearCarrito(carritoObject)
            //Envio correo al administrador con los datos del usuario dado de alta
            const html = `<h1 style="color: blue;">Datos del Usuario creado: </h1> <strong>Usuario: </strong> ${userRegistered.email} <br> <strong>Contraseña: </strong> ${userRegistered.password} <br> <strong>Nombre: </strong> ${userRegistered.name} <br> <strong>Apellido: </strong> ${userRegistered.lastname} <br> <strong>Tipo de Usuario: </strong> "Usuario" <br>`
            nodemailer("Mailer", EMAILADMIN, "nuevo registro", html, null)


            return userRegistered

        
    }

    //Busca el usuario
    async existeUsuario(usuario) {
        try {
            const usuarioBuscado = await User.buscarUsuario(usuario)
            return usuarioBuscado

        } catch (error) {
            return error

        }
    }

    //Valida si la contraseña en la BD coincide con la ingresada por el usuario.
    async validaPassword(passwordReq, passwordBD) {
        try {
            const correctPassword = await validatePassword(passwordReq, passwordBD)

            return correctPassword

        } catch (error) {
            return error
        }
    }



}

export const usuarioServicio = new UsuarioServicio();