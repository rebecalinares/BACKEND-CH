class ProductManager{
    constructor(){
        this.products = []
    }
    addProduct(title, description, price, thumbnail,  stock){
        const product = {
                            title,
                            description,
                            price,
                            thumbnail,
                            stock
                        }
        
        if(this.products.length == 0){
            product.code = 1
        }else{
            product.code = this.products[this.products.length - 1].code + 1
        }
        this.products.push(product)
    }
    getProducts(){
        return console.log(this.products);
    }
    getProductById(code){
        const productById = this.products.find(product => product.code == code)
        
        productById ? console.log(productById) : console.log("Not found")
    }
}

const productManager = new ProductManager();

productManager.addProduct("titulo", "prueba", 2000, "null", 5)
productManager.addProduct("titulo", "prueba", 2000, "null", 5)
productManager.addProduct("titulo", "prueba", 2000, "null", 5)
productManager.getProducts()
productManager.getProductById(4)