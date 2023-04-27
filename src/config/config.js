import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

process.env.NODE_ENV

dotenv.config(
    {
    
    path:    
        process.env.NODE_ENV === "prod"
            ? process.env.RUTA_PROD
            : process.env.RUTA_DESARROLLO
       
})

export const STRING_CONEXION_MONGO = process.env.STRING_CONEXION_MONGO
export const USUARIO_CONEXION_MONGO = process.env.USUARIO_CONEXION_MONGO
export const PASSWORD_CONEXION_MONGO = process.env.PASSWORD_CONEXION_MONGO
export const BD_MONGO = process.env.BD_MONGO
export const MYSQL_CONEXTION_STRING = process.env.MYSQL_CONEXTION_STRING
export const BD_MYSQL = process.env.BD_MYSQL
export const SECRET=process.env.SECRET
export const TTL=process.env.TTL
export const SERVER=process.env.SERVER
export const MODO_POR_DEFECTO=process.env.MODO_POR_DEFECTO
export const PUERTO_POR_DEFECTO=process.env.PUERTO_POR_DEFECTO
export const SALTENV=process.env.SALTENV
export const TIPO_USUARIO_POR_DEFECTO=process.env.TIPO_USUARIO_POR_DEFECT
export const SERVICEEMAIL=process.env.SERVICEEMAIL
export const PORTEMAIL=process.env.PORTEMAIL
export const EMAILADMIN=process.env.EMAILADMIN
export const PASSWORDADMIN=process.env.PASSWORDADMIN
export const USUARIOADMIN=process.env.USUARIOADMIN