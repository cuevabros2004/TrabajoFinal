import { usuarioDTO } from "../dtos/usuarioDTO.js"
import { randomUUID } from "crypto"

class Usuarios{
    #_id
    #email
    #password
    #name
    #lastname
    #image

    constructor({email, password, name, lastname, image}){
        this.#_id = randomUUID();
        this.#email = email;
        this.#password = password;
        this.#name = name;
        this.#lastname = lastname;
        this.#image = image;
    }
    
        get _id() {return this.#_id}
        get email() {return this.#email}
        get password() {return this.#password}
        get name() {return this.#password}
        get lastname() {return this.#lastname}
        get image() {return this.#image}

        set password(password) {
            this.#password = password
        }

        datosUsuario(){
            return new usuarioDTO({
                _id: this.#_id,
                email: this.#email,
                password: this.#password,
                name: this.#name,
                lastname: this.#lastname,
                image: this.#image
            })
        }
    }

    export default Usuarios;