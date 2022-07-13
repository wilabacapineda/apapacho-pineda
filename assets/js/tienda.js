const productosTiendaX = document.getElementById('productosTienda')
const cargarTienda = () => {   
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
                  producto_precio.append("$"+min.toLocaleString()+"-$"+max.toLocaleString())
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
                  producto_a.href=base_url+"/pages/producto/producto.html"
                  producto_a.className="producto_comprar"
                  producto_a.id=producto.modelo
                  producto_a.append(producto_a_div)
                  producto_a.addEventListener('click',(e)=>{
                    e.preventDefault()
                    sessionStorage.setItem('modelo',producto.modelo.toLowerCase().replaceAll(" ","-"))
                    window.location.href=base_url+"/pages/producto/producto.html"             
                  })

            const producto_div = document.createElement('div')
                  producto_div.id=producto.modelo.toLowerCase().replaceAll(" ","-")
                  producto_div.className="card mb-3 producto animate__animated animate__flipinX"
                  producto_div.append(producto_div_img)    
                  producto_div.append(producto_div_detalle)              
                  producto_div.append(producto_a)
            productosTiendaX.append(producto_div)
        }
    } )
}

const rangoPrecios = (modelo) => {
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


