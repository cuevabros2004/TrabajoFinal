import fs from 'fs';
import {MYSQL_CONEXTION_STRING, BD_MYSQL} from '../../config/config.js'
import { STRING_CONEXION_MONGO, USUARIO_CONEXION_MONGO, PASSWORD_CONEXION_MONGO,  BD_MONGO} from '../../config/config.js'

//MongoDB
//export const CNX_STR = 'mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test'
export const CNX_STR = STRING_CONEXION_MONGO + USUARIO_CONEXION_MONGO + ':' + PASSWORD_CONEXION_MONGO + BD_MONGO
//mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test


export const user = 'root'
export const DB_NAME = 'ecommerce'
export const PERSISTENCIA = 'mongodb'