import { PERSISTENCIA } from "../../../daos/db/config.js";
import { Usuario } from "./usuario.js";

let User

switch (PERSISTENCIA) {
    case 'mongodb':
        const { ContainerMongodb } = await import('../../../daos/container/containerMongodb.js')
        const dao_mongodb = new ContainerMongodb('users');
        User = new Usuario(dao_mongodb);
        break;


}

export {User}