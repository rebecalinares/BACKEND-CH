const fs = require('fs')

class ProductManager {
    #ruta = './SegundoD/products.json'
    constructor(){
        this.path = this.#ruta
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        
        if(fs.existsSync(this.path)){     //si el archivo existe se pushea el producto
            console.log("existe el archivo");
            let data = fs.readFileSync(this.path, 'utf-8') //data en JSON
            let dataJS = JSON.parse(data)                             //data en JS

            product.id = dataJS[dataJS.length - 1].id + 1             //agrego id
            dataJS.push(product)

            fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')        //se escribe en el archivo los productos en JSON

        }else{                           //si el archivo NO existe se crea uno
            console.log("NO existe el archivo");
            product.id = 1
            const arrProducts = [product]

            fs.writeFileSync(this.path, `${JSON.stringify(arrProducts, null, 2)}`, 'utf-8')   //se crea el archivo con el producto en JSON
        }
    }

    getProducts(){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        console.log(dataJS)
        return dataJS
    }

    getProductById(id){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        const productById = dataJS.find(product => product.id == id)

        console.log(productById)
        return productById
    }

    updateProduct(id, obj){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        let productById = dataJS.find(product => product.id == id)

        productById = obj
        productById.id = id

        dataJS.splice((id - 1), 1, productById)

        console.log(dataJS)

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
    }

    deleteProduct(id){
        let data = fs.readFileSync(this.path, 'utf-8')
        let dataJS = JSON.parse(data)

        dataJS.splice((id - 1), 1)

        let contador = 1

        dataJS.forEach(product => {
            product.id = contador++
        })

        fs.writeFileSync(this.path, `${JSON.stringify(dataJS, null, 2)}`, 'utf-8')
    }
}

const productManager = new ProductManager()

let remplazo =  {
                    title: "Remplazo",
                    description: "obj actualizado",
                    price: 2000,
                    thumbnail: "null",
                    code : 5,
                    stock: 20
                }

productManager.addProduct("titulo", "prueba", 2000, "null", 5, 20)
productManager.addProduct("titulo 2", "prueba", 2000, "null", 5, 20)
productManager.addProduct("titulo 3", "prueba", 2000, "null", 5, 20)
productManager.addProduct("titulo 4", "prueba", 2000, "null", 5, 20)
productManager.addProduct("titulo 5", "prueba", 2000, "null", 5, 20)
productManager.getProducts()
productManager.getProductById(3)
productManager.updateProduct(1, remplazo)
productManager.deleteProduct(2)