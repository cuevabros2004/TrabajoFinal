export class usuarioDTO{
    constructor ({_id, email, password, name, lastname, image}){
        this._id = _id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.image = image;
    }
}