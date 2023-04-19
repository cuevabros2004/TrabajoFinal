import { ProductsDTO } from "../dtos/productsDTO.js"


class Productos {
    #id
    #title
    #price
    #thumbnail

    constructor({ _id, title, price, thumbnail }) {
        this.#id = _id
        this.#title = title
        this.#price = price
        this.#thumbnail = thumbnail
    }

    get _id() { return this.#id }

    get title() { return this.#title }

    get price() { return this.#price }

    get thumbnail() { return this.#thumbnail }
 
   guardarProducto(producto){
        const resul =   products.save(producto);
        return resul
    }

    datos(){
        return new ProductsDTO(
            {
                _id: this.#id,
                title: this.#title,
                price: this.#price,
                thumbnail: this.#thumbnail
            }
        )
    }



}

export default Productos;