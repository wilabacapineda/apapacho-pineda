class Producto {
    constructor(id,categoria,modelo,descripcion,talla,color,stock,precio){
        this.id=id
        this.categoria=categoria
        this.modelo=modelo
        this.descripcion=descripcion
        this.talla=talla
        this.color=color
        this.stock=stock
        this.precio=precio
    }
}

class ProductoCarro {
    constructor(idProducto,detalle,cantidad,preciounitario,subtotal){
        this.idProducto=idProducto
        this.detalle=detalle
        this.cantidad=cantidad
        this.preciounitario=preciounitario
        this.subtotal=subtotal
    }
}

const productos = [
    new Producto(1,'Poleron','Poleron Amaranta','','S','Amaranta',2,20000),
    new Producto(2,'Poleron','Poleron Amaranta','','M','Amaranta',3,20000),
    new Producto(3,'Poleron','Poleron Amaranta','','L','Amaranta',3,20000),
    new Producto(4,'Poleron','Poleron Amaranta','','XL','Amaranta',2,20000),
    new Producto(5,'Poleron','Poleron Amapola','','S','Amapola',2,15000),
    new Producto(6,'Poleron','Poleron Amapola','','M','Amapola',3,15000),
    new Producto(7,'Poleron','Poleron Amapola','','L','Amapola',3,15000),
    new Producto(8,'Poleron','Poleron Amapola','','XL','Amapola',2,15000),
    new Producto(9,'Poleron','Poleron Jacinto','','S','Negro',2,10000),
    new Producto(10,'Poleron','Poleron Jacinto','','M','Negro',3,10000),
    new Producto(11,'Poleron','Poleron Jacinto','','L','Negro',3,10000),
    new Producto(12,'Poleron','Poleron Jacinto','','XL','Negro',2,10000),
    new Producto(13,'Poleron','Poleron Jacinto','','S','Gris',2,10000),
    new Producto(14,'Poleron','Poleron Jacinto','','M','Gris',3,10000),
    new Producto(15,'Poleron','Poleron Jacinto','','L','Gris',3,10000),
    new Producto(16,'Poleron','Poleron Jacinto','','XL','Gris',2,10000),
    new Producto(17,'Poleron','Poleron No me olvides','','S','Azul',2,17000),
    new Producto(18,'Poleron','Poleron No me olvides','','M','Azul',3,17000),
    new Producto(19,'Poleron','Poleron No me olvides','','L','Azul',3,17000),
    new Producto(20,'Poleron','Poleron No me olvides','','XL','Azul',2,17000),
    new Producto(21,'Poleron','Poleron No me olvides','','S','Morado',2,17000),
    new Producto(22,'Poleron','Poleron No me olvides','','M','Morado',3,17000),
    new Producto(23,'Poleron','Poleron No me olvides','','L','Morado',3,17000),
    new Producto(24,'Poleron','Poleron No me olvides','','XL','Morado',2,17000),
    new Producto(25,'Poleron','Poleron Violeta','','S','Violeta',2,17500),
    new Producto(26,'Poleron','Poleron Violeta','','M','Violeta',3,17500),
    new Producto(27,'Poleron','Poleron Violeta','','L','Violeta',3,17500),
    new Producto(28,'Poleron','Poleron Violeta','','XL','Violeta',2,17500)
]

const carro = []

function verTienda(){  
    let terminar=0
    while(terminar==0){   
        console.log('Elija una opción')      
        console.log('0- Salir')
        console.log('1- Buscar Producto')      
        console.log('2- Ver Categorias')  
        let opcion = parseInt(prompt('Elija una opción:\n 0- Salir\n 1- Buscar Producto\n 2- Ver Categorias'))
        if(opcion == 1){
            const resultadoProductos = buscarProductos()
            if(resultadoProductos){
                if (resultadoProductos.length==1){
                    console.log('Resultado Busqueda:')
                    const resultado = resultadoProductos[0]     
                    console.log('¿Desea agregar el producto al carro?')      
                    console.log('0- No')
                    console.log('1- Si')      
                    console.table(resultado)
                    let opcion2 = parseInt(prompt('¿Desea agregar el producto al carro?:\n 0- No\n 1- Si'))
                    if (opcion2==1){
                        agregarProductoCarro(resultado)
                    }
    
                } else if(resultadoProductos.length>1){                
                    console.log('Resultado Busqueda:')
                    console.table(resultadoProductos)
                    console.log('¿Desea agregar producto a carro?')      
                    console.log('0- Salir')
                    console.log('1- Agregar por Indice del Producto')      
                    console.log('2- Agregar por Id del Producto')  
                    let opcion2 = parseInt(prompt('Elija una opción:\n 0- Salir\n 1- Agregar por Indice del Producto\n 2- Agregar por Id del Producto'))
                    if(opcion2 == 1){
                        console.log('Ingrese el indice del producto:')
                        console.table(resultadoProductos)
                        let idx = prompt('Ingrese el indice del producto')
                        const resultado = resultadoProductos[idx]     
                        console.table(resultado)
                        agregarProductoCarro(resultado)
                    } else if(opcion2 ==2){
                        console.log('Ingrese el ID del producto:')
                        console.table(resultadoProductos)
                        let idx = parseInt(prompt('Ingrese el ID del producto'))
                        const resultado = productos.find( (producto) => producto.id==idx )
                        console.table(resultado)
                        agregarProductoCarro(resultado)
                    }              
                }
                if(confirm('¿Desea Añadir otro Producto al Carrito?')){
                    terminar=0
                } else {
                    terminar=1
                }
                verCarro()
            }
        } else if (opcion == 2 ) {
            let modelo = seleccionarModelo()
            if(modelo!='Salir'){               
                let id_producto = seleccionarTallaColor(modelo)   
                if (id_producto!=0) {
                    let resultado = productos.find( (producto) => producto.id===id_producto)
                    agregarProductoCarro(resultado)
                    if(confirm('¿Desea Añadir otro Producto al Carrito?')){
                        terminar=0
                    } else {
                        terminar=1
                    }
                    verCarro()                                
                } else {
                    console.log('Gracias por Venir')
                    break
                }                   
                verCarro()
            } else {
                verCarro()
                console.log('Gracias por Venir')
                break
            }
        } else if (opcion==0 || isNaN(opcion)) {
            terminar = 1
        } else {
            console.log('Opción no encontrada')
        }
    }
}

function agregarProductoCarro(resultado){
    console.log("Stock: "+resultado.stock+"\n¿Cuantos productos desea añadir?")
    let j=0;
    let cantidad = resultado.stock+1
    while(isNaN(cantidad) || cantidad%1!=0 || cantidad>resultado.stock) {
        if(j==0){
            j++
        } else {
            console.log('Debe Ingresar un número valido dentro del stock del producto')
        }
        cantidad = parseInt(prompt("Stock: "+resultado.stock+"\n¿Cuantos productos desea añadir al carro?"))
    }
    let subtotal = parseFloat(cantidad)*parseFloat(resultado.precio)
    console.log("Resumen Producto:")
    console.log("  - Modelo:",resultado.modelo)
    console.log("  - Talla:",resultado.talla)
    console.log("  - Color:",resultado.color)
    console.log("  - Precio:",resultado.precio)  
    console.log("  - Cantidad:",cantidad)
    console.log("  - Subtotal:",subtotal)  

    if(confirm("¿Desea añadir Producto?\nModelo: "+resultado.modelo+"\nTalla: "+resultado.talla+"\nColor: "+resultado.color+"\nPrecio: "+resultado.precio+"\nCantidad: "+cantidad+"\nSubtotal: "+subtotal)){
        //cantidad_productos++
        carro.push(new ProductoCarro(resultado.id,resultado.modelo+' Talla:'+resultado.talla+' Color:'+resultado.color,cantidad,resultado.precio,subtotal))
        resultado.stock-=parseInt(cantidad)
        return resultado  
    } 

}

function buscarProductos(){
    let buscar =  prompt('BUSQUEDA DE PRODUCTOS: ingrese una palabra como color, talla, modelo, categoria o id del producto')
    if(buscar && isNaN(parseInt(buscar))){       
        return resultado = productos.filter((producto) => ((producto.categoria.toLowerCase() == buscar.toLowerCase() || producto.modelo.toLowerCase() == buscar.toLowerCase() || producto.color.toLowerCase() == buscar.toLowerCase() || producto.talla.toLowerCase() == buscar.toLowerCase() || producto.descripcion.toLowerCase() == buscar.toLowerCase()) && producto.stock>0) )
    } else if(buscar) {
        return resultado = productos.filter((producto) => (producto.id == buscar && producto.stock>0))
    }
}

function seleccionarModelo(){
    console.log("Seleccione el producto para añadir a su carro:")

    const aux = ['Salir']
    productos.forEach( (producto) => {
        if(aux.indexOf(producto.modelo)==-1){            
            aux.push(producto.modelo)
        }
    } )
  
    console.table(aux)    
    let x = aux.length+1
    while(isNaN(x) || x%1!=0 || x>aux.length){
        x = parseInt(prompt("Seleccione el producto a añadir a su carro:"))
        if(!x){
            x = 0
            break
        }   
    }   
    return aux[x]
}

function seleccionarTallaColor(m){

    console.log("Seleccione la talla y color del producto:")
    const aux = [{opcion:"Salir",id:0},]
    productos.forEach( (producto) => {
        if(m==producto.modelo){
            if(producto.stock>0){                
                aux.push({opcion:"Talla: " + producto.talla + "| Color: "+ producto.color,id:producto.id,})     
            }
        }
    })

    console.table(aux)

    let x = aux.length+1
    while(isNaN(x) || x%1!=0 || x>aux.length){
        x = prompt("Seleccione la talla y color del producto a añadir al carro:")
        if(!x){
            x = 0
            break
        } 
    }
    return aux[x].id  
}

function verCarro(){
    if(carro.length>0){
        console.log("Detalle Carro:")
        console.table(carro)
        let total = carro.reduce((acc,producto) => acc + producto.subtotal,0)
        console.log("Total: "+ total)  
    } else {
        console.log('Detalle Carro: Sin productos')
    }   
}