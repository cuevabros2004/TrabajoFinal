import { SALTENV, TTL } from "../../config/config.js"
import jwt from 'jsonwebtoken'
import { json } from "express"

function cifrarJWT(datos) {
    return jwt.sign(JSON.parse(JSON.stringify(datos)), SALTENV, { expiresIn: TTL })
}
function descifrarJWT(token) {
    console.log(jwt.verify(token, SALTENV))
    return  jwt.verify(token, SALTENV)
}

export  {cifrarJWT, descifrarJWT}