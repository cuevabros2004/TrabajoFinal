

 export class Usuario{
    #dao

    constructor(dao){
        this.#dao = dao;
    }

    //Función que permite registrar un usuario.
    async  registerUsuario(usuario){
        
        try {
            const resul = await this.#dao.save(usuario.datosUsuario())
            return resul
        } catch (error) {
            return error
        }

    }

    //Función que pemite buscar los datos de un usuario.
    async buscarUsuario(usuario){
        try {
            const resul = await this.#dao.buscar_usuario(usuario)
            return resul
        } catch (error) {
            return error
            
        }
    }

    //Función que permite validad la contraseña del usuario.
    async validaContrasenia(usuario){
        try {
            const resul = await this.#dao.validatePassword(usuario)
            return resul
        } catch (error) {
            return error           
        }
    }

 }