if(window.location.origin=="https://wilabacapineda.github.io") {
    var base_url = window.location.origin+"/apapacho-pineda";
} else {
    var base_url = window.location.origin;
}

class Producto {
    constructor(id,categoria,modelo,descripcion,talla,color,stock,precio,ventas,img){
        this.id=id
        this.categoria=categoria
        this.modelo=modelo
        this.descripcion=descripcion
        this.talla=talla
        this.color=color
        this.stock=stock
        this.precio=precio
        this.ventas=ventas
        this.img=img
    }
}

class ProductoCarro {
    constructor(idProducto,modelo,detalle,cantidad,preciounitario,subtotal,img,stock){
        this.idProducto=idProducto
        this.modelo = modelo
        this.detalle=detalle
        this.cantidad=cantidad
        this.preciounitario=preciounitario
        this.subtotal=subtotal
        this.img=img
        this.stock=stock
    }
}

const URL = `${base_url}/assets/js/stock.json`
const productos = []
const cargarProductos = (URL) => {
      fetch(URL)
      .then( (response) => response.json() )
      .then( (data) => {
            for(const p in data){
                  productos.push(new Producto(data[p].id,data[p].categoria,data[p].modelo,data[p].descripcion,data[p].talla,data[p].color,data[p].stock,data[p].precio,data[p].ventas,data[p].img))
            }
            if(localStorage.getItem('carrito')){
                  const carro_aux = JSON.parse(localStorage.getItem('carrito'))    
                  for(const aux of carro_aux){        
                    const productoModeloID = productos.find((prod) => prod.id===aux.idProducto)
                    if(productoModeloID.stock>0){
                          if(aux.cantidad>productoModeloID.stock){
                                aux.cantidad=productoModeloID.stock                  
                                aux.stock=0
                          } 
                          aux.subtotal=aux.preciounitario*aux.cantidad
                          productoModeloID.stock-=parseInt(aux.cantidad) 
                          aux.stock=productoModeloID.stock
                          carro.push(new ProductoCarro(aux.idProducto,aux.modelo,aux.detalle,aux.cantidad,aux.preciounitario,aux.subtotal,aux.img,aux.stock))                                    
                    }        
                  }      
            }
            const carroTienda = document.getElementById("carrito")
            const productosCarritoX = document.getElementById('productosCarrito')
            if(carroTienda){     
                  writeCarrito()
            } else if (productosCarritoX){
                  cargarCarrito()     
            }  
            const productosTiendaX = document.getElementById('productosTienda')
            if(productosTiendaX) {
                  cargarTienda()
            }
            const productosX = document.getElementById('productoTienda')
            if(productosX) {
                  verProducto()
            }
            
      })
      .catch((error) => {
            const errorx = document.getElementById("error")
                  errorx.innerHTML="Tenemos problemas para cargar productos y el carrito."
                  errorx.classList.add("mostrar_error")
      })
}
cargarProductos(URL)

const carro = []
const carroTienda = document.getElementById("carrito")
const writeCarrito = () => {
      if(carro.length>0){
            carroTienda.innerHTML=""
            const ul = document.createElement("ul") 
            carroTienda.append(ul)
            const link_carrito = document.createElement("p")
            const link_carrito_a=document.createElement("a")                  
                  link_carrito_a.href=base_url+"/pages/carrito.html"
                  link_carrito_a.innerHTML="Ir al Carrito"
            link_carrito.append(link_carrito_a)
            carroTienda.append(link_carrito)            

            let total = carro.reduce((acc,producto) => acc + producto.subtotal,0)
            carro.forEach( (producto) => {            
                  const li = document.createElement("li")
                  ul.append(li)
                  const link1 = document.createElement("a")
                        link1.href=base_url+"/pages/producto/producto.html"
                        link1.addEventListener('click',(e)=>{
                              e.preventDefault()
                              sessionStorage.setItem('modelo',producto.modelo.toLowerCase().replaceAll(" ","-"))
                              window.location.href=base_url+"/pages/producto/producto.html"             
                        })
                  const link_img=document.createElement("img")
                        link_img.src=base_url+"/assets/img/"+producto.img
                        link_img.width="10px"
                  link1.append(link_img)
                  const link2 = document.createElement("a")
                        link2.href=base_url+"/pages/producto/producto.html"
                        link2.innerHTML = producto.detalle
                        link2.addEventListener('click',(e)=>{
                              e.preventDefault()
                              sessionStorage.setItem('modelo',producto.modelo.toLowerCase().replaceAll(" ","-"))
                              window.location.href=base_url+"/pages/producto/producto.html"             
                        })
                  const span_info_flex = document.createElement("div")
  
                  const span_info_flex_div1 = document.createElement("div")
                        span_info_flex_div1.id="carritoInfo-start"
                  const span_info_flex_div1_cantidad = document.createElement("span")
                        span_info_flex_div1_cantidad.id="carritoInfo-start-cantidad"
                  const span_info_flex_div1_cantidad_text = document.createElement("span")
                        span_info_flex_div1_cantidad_text.innerText = "Cantidad:"
                  const span_info_flex_div1_cantidad_input=document.createElement("input")
                        span_info_flex_div1_cantidad_input.type="number"
                        span_info_flex_div1_cantidad_input.id="ProductoCantidadCarro"+producto.idProducto
                        span_info_flex_div1_cantidad_input.name="ProductoCantidadCarro"
                        span_info_flex_div1_cantidad_input.min=1
                        span_info_flex_div1_cantidad_input.step=1
                        span_info_flex_div1_cantidad_input.max=parseInt(producto.stock)+parseInt(producto.cantidad)
                        span_info_flex_div1_cantidad_input.value=producto.cantidad
                        span_info_flex_div1_cantidad_input.addEventListener('change',(e) => {
                              e.preventDefault
                              updateCarrito(producto.idProducto)
                        })
                  span_info_flex_div1_cantidad.append(span_info_flex_div1_cantidad_text)
                  span_info_flex_div1_cantidad.append(span_info_flex_div1_cantidad_input)
                  //span_info_cantidad.innerHTML="Cantidad: "+producto.cantidad              
            const span_info_flex_div1_precio = document.createElement("span")   
                  span_info_flex_div1_precio.innerHTML="Subtotal: $"+producto.subtotal.toLocaleString()
            span_info_flex_div1.append(span_info_flex_div1_cantidad)
            span_info_flex_div1.append(span_info_flex_div1_precio)            
            
            const span_info_flex_div2 = document.createElement("div")
                  span_info_flex_div2.id="carritoInfo-del"
            const span_info_flex_div2_a = document.createElement("a")
                  span_info_flex_div2_a.className="btn"
                  span_info_flex_div2_a.id="producto_"+producto.idProducto
                  span_info_flex_div2_a.addEventListener('click', (e) => {
                        e.preventDefault()
                        //borrarCarrito(producto.idProducto)
                        Swal.fire({
                          title: '¿Deseas eliminar el producto del Carrito de Compras?',
                          showDenyButton: true,
                          showCancelButton: false,
                          confirmButtonText: 'Si',
                          denyButtonText: `No`,
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                                borrarCarrito(producto.idProducto)
                          } 
                        })                        
                        
                  })
            const span_info_flex_div2_a_close=document.createElement("i")
                  span_info_flex_div2_a_close.className="fas fa-trash-alt"                  
            span_info_flex_div2_a.append(span_info_flex_div2_a_close)
            span_info_flex_div2.append(span_info_flex_div2_a)
  
            span_info_flex.append(span_info_flex_div1)
            span_info_flex.append(span_info_flex_div2)
  
            const div_info =document.createElement("div")
                  div_info.id="carritoInfo"                  
            div_info.append(link2)
            div_info.append(span_info_flex)            
  
            li.append(link1)            
            li.append(div_info)
      })
      const total_li = document.createElement("li")
            total_li.id="carritoInfoTotal"
            total_li.innerHTML="Total compra: $"+total.toLocaleString()
      ul.append(total_li)
  
      } else {
            carroTienda.innerHTML="<p>El carro de compras está vacio</p>"
      }   
      localStorage.setItem('carrito',JSON.stringify(carro))
}

const productosCarritoX = document.getElementById('productosCarrito')
cargarCarrito = () => {
      const productosCarritoX = document.getElementById("productosCarrito")
      if(carro.length>0){
            productosCarritoX.innerHTML=""
            const divCarrito = document.createElement("div") 
                  divCarrito.id="productoCarrito"
                  divCarrito.className="row"
            productosCarritoX.append(divCarrito)
            let total = carro.reduce((acc,producto) => acc + producto.subtotal,0)
            carro.forEach( (producto) => {            
                  const li = document.createElement("span")
                  divCarrito.append(li)
                  const link1 = document.createElement("a")
                        link1.href=base_url+"/pages/producto/producto.html"
                        link1.addEventListener('click',(e)=>{
                              e.preventDefault()
                              sessionStorage.setItem('modelo',producto.modelo.toLowerCase().replaceAll(" ","-"))
                              window.location.href=base_url+"/pages/producto/producto.html"             
                        })
                  const link_img=document.createElement("img")
                        link_img.src=base_url+"/assets/img/"+producto.img
                        link_img.width="10px"
                  link1.append(link_img)
                  const link2 = document.createElement("a")
                        link2.href=base_url+"/pages/producto/producto.html"
                        link2.innerHTML = producto.detalle
                        link2.addEventListener('click',(e)=>{
                              e.preventDefault()
                              sessionStorage.setItem('modelo',producto.modelo.toLowerCase().replaceAll(" ","-"))
                              window.location.href=base_url+"/pages/producto/producto.html"             
                        })
                  const span_info_flex = document.createElement("div")
  
                  const span_info_flex_div1 = document.createElement("div")
                        span_info_flex_div1.id="carritoInfo-start"
                  const span_info_flex_div1_cantidad = document.createElement("span")
                        span_info_flex_div1_cantidad.id="carritoInfo-start-cantidad"
                  const span_info_flex_div1_cantidad_text = document.createElement("span")
                        span_info_flex_div1_cantidad_text.innerText = "Cantidad:"
                  const span_info_flex_div1_cantidad_input=document.createElement("input")
                        span_info_flex_div1_cantidad_input.type="number"
                        span_info_flex_div1_cantidad_input.id="ProductoCantidadCarro"+producto.idProducto
                        span_info_flex_div1_cantidad_input.name="ProductoCantidadCarro"
                        span_info_flex_div1_cantidad_input.min=1
                        span_info_flex_div1_cantidad_input.step=1
                        span_info_flex_div1_cantidad_input.max=parseInt(producto.stock)+parseInt(producto.cantidad)
                        span_info_flex_div1_cantidad_input.value=producto.cantidad
                        span_info_flex_div1_cantidad_input.addEventListener('change',(e) => {
                              e.preventDefault
                              updateCarrito(producto.idProducto)
                        })
                  span_info_flex_div1_cantidad.append(span_info_flex_div1_cantidad_text)
                  span_info_flex_div1_cantidad.append(span_info_flex_div1_cantidad_input)
                  //span_info_cantidad.innerHTML="Cantidad: "+producto.cantidad              
            const span_info_flex_div1_precio = document.createElement("span")   
                  span_info_flex_div1_precio.innerHTML="Subtotal: $"+producto.subtotal.toLocaleString()
            span_info_flex_div1.append(span_info_flex_div1_cantidad)
            span_info_flex_div1.append(span_info_flex_div1_precio)            
            
            const span_info_flex_div2 = document.createElement("div")
                  span_info_flex_div2.id="carritoInfo-del"
            const span_info_flex_div2_a = document.createElement("a")
                  span_info_flex_div2_a.className="btn"
                  span_info_flex_div2_a.id="producto_"+producto.idProducto
                  span_info_flex_div2_a.addEventListener('click', (e) => {
                        e.preventDefault()
                        Swal.fire({
                              title: '¿Deseas eliminar el producto del Carrito de Compras?',
                              showDenyButton: true,
                              showCancelButton: false,
                              confirmButtonText: 'Si',
                              denyButtonText: `No`,
                            }).then((result) => {
                              /* Read more about isConfirmed, isDenied below */
                              if (result.isConfirmed) {
                                    borrarCarrito(producto.idProducto)
                              } 
                            })                        
                        
                  })
            const span_info_flex_div2_a_close=document.createElement("i")
                  span_info_flex_div2_a_close.className="fas fa-trash-alt"                  
            span_info_flex_div2_a.append(span_info_flex_div2_a_close)
            span_info_flex_div2.append(span_info_flex_div2_a)
  
            span_info_flex.append(span_info_flex_div1)
            span_info_flex.append(span_info_flex_div2)
  
            const div_info =document.createElement("div")
                  div_info.id="carritoInfo"                  
            div_info.append(link2)
            div_info.append(span_info_flex)            
  
            li.append(link1)            
            li.append(div_info)
      })
      const total_li = document.createElement("span")
            total_li.id="carritoInfoTotal"
            total_li.innerHTML="Total compra: $"+total.toLocaleString()
      divCarrito.append(total_li)
  
      } else {
            productosCarritoX.innerHTML="<p>El carro de compras está vacio</p>"
      } 
      localStorage.setItem('carrito',JSON.stringify(carro)) 
}

const addCarrito = (id) => {
    const producto_form_inputCantidad = document.getElementById("productoCantidad")
    const producto_alert=document.getElementById("productoAlert")
    const producto_div_variations_stock=document.getElementById("productoVariacionesStock")
    const productoModeloID = productos.find((prod) => prod.id===id)                                 
    
    if(productoModeloID.stock>=producto_form_inputCantidad.value){
          
          const carroID = carro.find((prod) => prod.idProducto===id)
          productoModeloID.stock-=parseInt(producto_form_inputCantidad.value)                                                    
          if(carroID){                  
                carroID.cantidad+=parseInt(producto_form_inputCantidad.value)
                carroID.subtotal = parseInt(carroID.cantidad)*parseInt(productoModeloID.precio)
                carroID.stock=productoModeloID.stock
          } else {
                const subtotal = parseInt(producto_form_inputCantidad.value)*parseInt(productoModeloID.precio)                        
                carro.push(new ProductoCarro(productoModeloID.id,productoModeloID.modelo,productoModeloID.modelo+" "+productoModeloID.color+" Talla "+productoModeloID.talla,parseInt(producto_form_inputCantidad.value),productoModeloID.precio,subtotal,productoModeloID.img,productoModeloID.stock))
          }                                      
          if(productoModeloID.stock<=0){
                document.getElementById("productoSubmit").disabled=true   
                producto_alert.innerHTML = "Acabas de agregar todo el stock a tu carrito, muchas gracias!"                                                         
                producto_alert.style="color:green;"
          }                        
          if(carroTienda){
            writeCarrito()      
          } else if (productosCarritoX) {      
            cargarCarrito()
          }            
    } else {
          producto_alert.style="color:red;"
          producto_alert.innerHTML = "No quedan suficientes productos"                                                    
    }
    producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
                
}
 
const updateCarrito = (id) => {
    const producto_form_inputCantidad = document.getElementById("ProductoCantidadCarro"+id)
    const productoModeloID = productos.find((prod) => prod.id===id)                                 
    const carroID = carro.find((prod) => prod.idProducto===id)      
    const producto_alert=document.getElementById("productoAlert")
    const producto_div_variations_stock=document.getElementById("productoVariacionesStock")    
    const producto_talla=document.getElementById("productoSelectTalla")
    const producto_color=document.getElementById("productoSelectColor")
    if((carroID.stock+carroID.cantidad)>=producto_form_inputCantidad.value){
          productoModeloID.stock = (carroID.stock+carroID.cantidad)-parseInt(producto_form_inputCantidad.value)                           
          carroID.cantidad=parseInt(producto_form_inputCantidad.value)
          carroID.subtotal = parseInt(producto_form_inputCantidad.value)*parseInt(productoModeloID.precio)
          carroID.stock=productoModeloID.stock
          if(producto_talla && producto_color) {
            if(carroID.modelo.toLowerCase().replaceAll(" ","-")===modelo && producto_talla.value===productoModeloID.talla && producto_color.value===productoModeloID.color){
                  if(productoModeloID.stock<=0){
                        if(document.getElementById("productoSubmit")){
                              document.getElementById("productoSubmit").disabled=true   
                              producto_alert.innerHTML = "Acabas de agregar todo el stock a tu carrito, muchas gracias!"                                                         
                              producto_alert.style="color:green;"
                              producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
                        } 
  
                  } else {
                        if(document.getElementById("productoSubmit")){
                              document.getElementById("productoSubmit").disabled=false   
                              producto_alert.innerHTML = ""  
                              producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
                        } else {
                              const producto_div_variations = document.getElementById("productoVariaciones")
                                    producto_div_variations.style=""
                                    producto_div_variations.innerHTML=""
                              const producto_form=document.getElementById("productoForm")
                                    producto_form.innerHTML=""
                              const producto_alert=document.getElementById("productoAlert")
                                    producto_alert.innerHTML =""
  
                              const producto_div_variations_detail = document.createElement("span")
                                    producto_div_variations_detail.id="productoVariacionesInfo"
                                    producto_div_variations_detail.innerHTML = productoModeloID.modelo+" "+productoModeloID.color+" Talla "+productoModeloID.talla                                    
                              const producto_div_variations_price=document.createElement("span")
                                    producto_div_variations_price.innerHTML = "$"+productoModeloID.precio.toLocaleString()
                                    producto_div_variations_price.id="productoVariacionesPrice"
                              const producto_div_variations_stock=document.createElement("span")
                                    producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
                                    producto_div_variations_stock.id="productoVariacionesStock"
  
                              producto_div_variations.append(producto_div_variations_detail)
                              producto_div_variations.append(producto_div_variations_price)
                              producto_div_variations.append(producto_div_variations_stock)                    
                                          
                              const producto_form_inputCantidad = document.createElement("input")
                                    producto_form_inputCantidad.id="productoCantidad"
                                    producto_form_inputCantidad.name="productoCantidad"
                                    producto_form_inputCantidad.type="number"
                                    producto_form_inputCantidad.value=1
                                    producto_form_inputCantidad.min=1
                                    producto_form_inputCantidad.step=1
                                    producto_form_inputCantidad.max=productoModeloID.stock
                              const producto_form_inputSubmit = document.createElement("input")
                                    producto_form_inputSubmit.id="productoSubmit"
                                    producto_form_inputSubmit.name="productoSubmit"
                                    producto_form_inputSubmit.type="submit"
                                    producto_form_inputSubmit.className="btn btn-primary"
                                    producto_form_inputSubmit.value="Agregar"
                              producto_form.append(producto_form_inputCantidad)
                              producto_form.append(producto_form_inputSubmit)
                              //Evento Agregar al Carrito
                              producto_form_inputSubmit.addEventListener("click",(e) => {
                                    e.preventDefault()                        
                                    addCarrito(productoModeloID.id)
                              })
                        }                                                                             
                  }                  
            } 
          }                                          
    } else {            
          const aux = producto_form_inputCantidad.value
          producto_form_inputCantidad.value = parseInt(carroID.stock)+parseInt(carroID.cantidad)                        
          productoModeloID.stock = 0
          carroID.cantidad=parseInt(producto_form_inputCantidad.value)
          carroID.subtotal = parseInt(producto_form_inputCantidad.value)*parseInt(productoModeloID.precio)
          carroID.stock=productoModeloID.stock
          if(producto_talla && producto_color) {
            if(carroID.modelo.toLowerCase().replaceAll(" ","-")===modelo && producto_talla.value===productoModeloID.talla && producto_color.value===productoModeloID.color){
                  producto_alert.style="color:red;"
                  producto_alert.innerHTML = "No quedan suficientes productos"   
                  producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"                                                 
            }
          }
    }        
    if(carroTienda){
      writeCarrito()      
    } else if (productosCarritoX) {      
      cargarCarrito()
    }   
}

const borrarCarrito = (id) => {      
    const productoModeloID = productos.find((prod) => prod.id===id)                                 
    const carroID = carro.find((prod) => prod.idProducto===id)      
    const producto_alert=document.getElementById("productoAlert")
    const producto_div_variations_stock=document.getElementById("productoVariacionesStock")
    const producto_talla=document.getElementById("productoSelectTalla")
    const producto_color=document.getElementById("productoSelectColor")
    productoModeloID.stock = (carroID.stock+carroID.cantidad)               
    if(producto_talla && producto_color) {
      if(productoModeloID.modelo.toLowerCase().replaceAll(" ","-")===modelo && producto_talla.value===productoModeloID.talla && producto_color.value===productoModeloID.color){
            if(document.getElementById("productoSubmit")){
                  document.getElementById("productoSubmit").disabled=false   
                  producto_alert.innerHTML = ""  
                  producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
            } else {
                  const producto_div_variations = document.getElementById("productoVariaciones")
                        producto_div_variations.style=""
                        producto_div_variations.innerHTML=""
                  const producto_form=document.getElementById("productoForm")
                        producto_form.innerHTML=""
                  const producto_alert=document.getElementById("productoAlert")
                        producto_alert.innerHTML =""

                  const producto_div_variations_detail = document.createElement("span")
                        producto_div_variations_detail.id="productoVariacionesInfo"
                        producto_div_variations_detail.innerHTML = productoModeloID.modelo+" "+productoModeloID.color+" Talla "+productoModeloID.talla                                    
                  const producto_div_variations_price=document.createElement("span")
                        producto_div_variations_price.innerHTML = "$"+productoModeloID.precio.toLocaleString()
                        producto_div_variations_price.id="productoVariacionesPrice"
                  const producto_div_variations_stock=document.createElement("span")
                        producto_div_variations_stock.innerHTML = productoModeloID.stock + " disponibles"
                        producto_div_variations_stock.id="productoVariacionesStock"

                  producto_div_variations.append(producto_div_variations_detail)
                  producto_div_variations.append(producto_div_variations_price)
                  producto_div_variations.append(producto_div_variations_stock)                    
                              
                  const producto_form_inputCantidad = document.createElement("input")
                        producto_form_inputCantidad.id="productoCantidad"
                        producto_form_inputCantidad.name="productoCantidad"
                        producto_form_inputCantidad.type="number"
                        producto_form_inputCantidad.value=1
                        producto_form_inputCantidad.min=1
                        producto_form_inputCantidad.step=1
                        producto_form_inputCantidad.max=productoModeloID.stock
                  const producto_form_inputSubmit = document.createElement("input")
                        producto_form_inputSubmit.id="productoSubmit"
                        producto_form_inputSubmit.name="productoSubmit"
                        producto_form_inputSubmit.type="submit"
                        producto_form_inputSubmit.className="btn btn-primary"
                        producto_form_inputSubmit.value="Agregar"
                  producto_form.append(producto_form_inputCantidad)
                  producto_form.append(producto_form_inputSubmit)
                  //Evento Agregar al Carrito
                  producto_form_inputSubmit.addEventListener("click",(e) => {
                        e.preventDefault()                        
                        addCarrito(productoModeloID.id)
                  })
            }               
      }      
    }
    carro.splice(carro.indexOf(carroID),1) 
    if(carroTienda){
      writeCarrito()      
    } else if (productosCarritoX) {      
      cargarCarrito()
    }
    
}


      