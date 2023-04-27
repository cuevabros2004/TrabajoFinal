

 export class Usuario{
    #dao

    constructor(dao){
        this.#dao = dao;
    }

 

    async  registerUsuario(usuario){
        
        try {
            const resul = await this.#dao.save(usuario.datosUsuario())
            return resul
        } catch (error) {
            return error
        }

    }

    async buscarUsuario(usuario){
        try {
            const resul = await this.#dao.buscar_usuario(usuario)
            return resul
        } catch (error) {
            return error
            
        }
    }

    async validaContrasenia(usuario){
        try {
            const resul = await this.#dao.validatePassword(usuario)
            return resul
        } catch (error) {
            return error           
        }
    }

 }