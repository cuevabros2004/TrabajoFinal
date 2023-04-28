import { descifrarJWT } from "../utils/jwt.js"

function autenticacion(req, res, next) {
    // si no tiene credenciales/token reboto con error 401....
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      res.status(401).json("Usuario no logueado")
      return "No logueado"
    }
    
    // Extraemos el token del authorizationHeader del header
    const token = authorizationHeader.split(' ')[1]
  
    const user = descifrarJWT(token)
  
    // sino, autenticacion exitosa
    req.user = user
    next()
  }

  export {autenticacion}