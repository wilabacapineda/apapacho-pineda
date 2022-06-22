const productosTiendaX = document.getElementById('productosTienda')

function cargarTienda(){   
    const aux = []
    productos.forEach( (producto) => {
        if(aux.indexOf(producto.modelo)==-1){            
            aux.push(producto.modelo)
            const [min, max] = rangoPrecios(producto.modelo)
            //Imagen
            const producto_img = document.createElement('img')
                  producto_img.src=base_url+'/assets/img/'+producto.img
                  producto_img.className="card-img-top"
                  producto_img.alt=producto.modelo
            const producto_div_img = document.createElement('div')
                  producto_div_img.className="producto_imagen"
                  producto_div_img.append(producto_img)

            //Precio
            const producto_precio = document.createElement('p')
                  producto_precio.className="card-text producto_info_precioCompra_precio"
                  producto_precio.append("$"+min+"-$"+max)
            const producto_precio_div = document.createElement('div')
                  producto_precio_div.className="row producto_info_precioCompra"
                  producto_precio_div.append(producto_precio)
            //Titulo
            const producto_titulo = document.createElement('h5')
                  producto_titulo.className="card-title"
                  producto_titulo.append(producto.modelo)
            //Precio + Titulo        
            const producto_div_detalle = document.createElement('div')
                  producto_div_detalle.className="card-body producto_info text-center"
                  producto_div_detalle.append(producto_titulo)
                  producto_div_detalle.append(producto_precio_div)

            //href
            const producto_a_div = document.createElement('span')
                  producto_a_div.className="producto_comprar_btn"
                  producto_a_div.innerHTML="Comprar"
            const producto_a=document.createElement('a')
                  producto_a.href=base_url+"/pages/producto/producto.html?modelo="+producto.modelo.toLowerCase().replaceAll(" ","-")
                  producto_a.className="producto_comprar"
                  producto_a.append(producto_a_div)
            
            const producto_div = document.createElement('div')
                  producto_div.id=producto.modelo.toLowerCase().replaceAll(" ","-")
                  producto_div.className="card mb-3 producto animate__animated animate__flipinX"
                  producto_div.append(producto_div_img)    
                  producto_div.append(producto_div_detalle)              
                  producto_div.append(producto_a)
            productosTiendaX.append(producto_div)
        }
    } )

    for(const producto of productos){                
        
    }
}
cargarTienda()

function rangoPrecios(modelo){
    let min = 0
    let max = 0    
    productos.forEach( (producto) => { 
        if(producto.modelo===modelo) {    
            if((producto.precio>min && min==0) || (min!=0 && producto.precio<min)){
                min = producto.precio
            }
            if(producto.precio>max){
                max = producto.precio
            }   
        }     
    })  
    return [min,max]
}


/*
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
*/