import { ProductsDTO } from "../dtos/productsDTO.js"
import { randomUUID } from "crypto"

class Productos {
    #id
    #name
    #description
    #price
    #image

    constructor({ _id = randomUUID(), name, description, price, image }) {
        this.#id = _id
        this.#name = name
        this.#description = description
        this.#price = price
        this.#image = image
    }

    get _id() { return this.#id }

    get name() { return this.#name }

    get description() { return this.#description }

    get price() { return this.#price }

    get image() { return this.#image }
 

    datos(){
        return new ProductsDTO(
            {
                _id: this.#id,
                name: this.#name,
                description: this.#description,
                price: this.#price,
                image: this.#image
            }
        )
    }



}

export default Productos;