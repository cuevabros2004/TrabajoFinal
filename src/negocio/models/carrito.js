import { randomUUID } from "crypto"
import { carritoDTO } from "../dtos/carritoDTO.js"

class carritos{
    #id
    #idUsuario    
    #productos 

    constructor({_id = randomUUID(), idUsuario, productos = []}){
        this.#id = _id
        this.#idUsuario = idUsuario
        this.#productos = productos
    }

    get _id() {return this.#id}
    get idUsuario() {return this.#idUsuario}
    get productos(){return this.#productos}

   datos(){
    return new carritoDTO({
        _id:this.#id,
        idUsuario:this.#idUsuario,
        productos:this.#productos
    })
   }

}

export default carritos