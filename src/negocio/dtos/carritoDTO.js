export class carritoDTO{
    constructor({_id, idUsuario, productos = []}){
        this._id = _id;
        this.idUsuario = idUsuario;
        this.productos = productos;         
    }
}