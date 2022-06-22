const modelo = location.search.slice(1).split("&").reduce((o,i)=>(u=decodeURIComponent,[k,v]=i.split("="),o[u(k)]=v&&u(v),o),{});
const productoTiendaX = document.getElementById("productoTienda")
const productoNombre = document.getElementById("productoNombre")
const productoModelo = productos.filter((producto) => producto.modelo.toLowerCase().replaceAll(" ","-")===modelo.modelo)

function cargarProducto(){
    let i = 0;  
    [min,max]=rangoPrecios(modelo)  
    productoModelo.forEach( (producto) => {
        if(i==0){
            i++ 
            productoNombre.innerHTML=producto.modelo
            //Imagen
            const producto_img = document.createElement("img")
                  producto_img.src="./../../assets/img/"+producto.img                      
                  producto_img.alt=producto.modelo
            const producto_div_img = document.createElement("div")
                  producto_div_img.id="productoImagen"
                  producto_div_img.append(producto_img) 
            //Info
                //Rango de Precios
                const producto_div_rangoPrecios=document.createElement("div")
                      producto_div_rangoPrecios.id="productoRangoPrecios"
                      producto_div_rangoPrecios.innerHTML="<h5>$"+min+" - $"+max+"</h5>"
                //Select Talla
                const producto_select_talla_option=document.createElement("option")
                      producto_select_talla_option.innerText="Seleccione Talla"
                      producto_select_talla_option.value=""
                      producto_select_talla_option.disabled=true
                      producto_select_talla_option.selected=true
                const producto_select_talla=document.createElement("select")
                      producto_select_talla.append(producto_select_talla_option)
                      producto_select_talla.id="productoSelectTalla"
                      producto_select_talla.name="productoSelectTalla"
                      producto_select_talla.className="form-control"
                      //addEventListener Talla
                      producto_select_talla.addEventListener("change",(e) => {
                        productoModeloSelect(e,'Talla','Color')                        
                      })

                const producto_div_talla=document.createElement("div")                          
                      producto_div_talla.innerHTML="<h5>Talla:</h5>"
                      producto_div_talla.className="col-12 productoSelect"
                      producto_div_talla.append(producto_select_talla)                        
                //Select Color
                const producto_select_color_option=document.createElement("option")
                      producto_select_color_option.innerText="Seleccione Color"
                      producto_select_color_option.value=""
                      producto_select_color_option.disabled=true
                      producto_select_color_option.selected=true
                const producto_select_color=document.createElement("select")
                      producto_select_color.id="productoSelectColor"
                      producto_select_color.name="productoSelectColor"
                      producto_select_color.append(producto_select_color_option)
                      producto_select_color.className="form-control"
                      //addEventListener Color
                      producto_select_color.addEventListener("change",(e) => {
                        productoModeloSelect(e,'Color','Talla')                        
                      })

                const producto_div_color=document.createElement("div")
                      producto_div_color.innerHTML="<h5>Color:</h5>"
                      producto_div_color.className="col-12 productoSelect"
                      producto_div_color.append(producto_select_color)
                //Div de Info segun las variaciones de los Selects
                const producto_div_variations = document.createElement('div')
                      producto_div_variations.id ="productoVariaciones"
                //Form 
                const producto_form=document.createElement('form')
                      producto_form.id="productoForm"
                //Alert Info 
                const producto_alert=document.createElement('div')
                      producto_alert.id="productoAlert"                
            //

            const producto_div_info = document.createElement("div")
                  producto_div_info.id="productoInfo"
                  producto_div_info.append(producto_div_rangoPrecios)
                  producto_div_info.append(producto_div_talla)
                  producto_div_info.append(producto_div_color)
                  producto_div_info.append(producto_div_variations)
                  producto_div_info.append(producto_form)
                  producto_div_info.append(producto_alert)

            productoTiendaX.append(producto_div_img)
            productoTiendaX.append(producto_div_info)    
        }
        
        const producto_select_color = document.getElementById("productoSelectColor")                  
        if(!document.getElementById("productColor_"+producto.color)){
            const producto_select_color_option=document.createElement("option")
                  producto_select_color_option.value=producto.color
                  producto_select_color_option.id="productColor_"+producto.color
                  producto_select_color_option.innerHTML=producto.color
            producto_select_color.append(producto_select_color_option)  
        }
        
        const producto_select_talla = document.getElementById("productoSelectTalla")
        if(!document.getElementById("productTalla_"+producto.talla)){
            const producto_select_talla_option=document.createElement("option")
                  producto_select_talla_option.value=producto.talla
                  producto_select_talla_option.id="productTalla_"+producto.talla
                  producto_select_talla_option.innerHTML=producto.talla            
            producto_select_talla.append(producto_select_talla_option)
        }
    })
}
cargarProducto()

function rangoPrecios(){
    let min = 0
    let max = 0
    productoModelo.forEach( (producto) => {        
        if((producto.precio>min && min==0) || (min!=0 && producto.precio<min)){
            min = producto.precio
        }
        if(producto.precio>max){
            max = producto.precio
        }        
    })
    return [min, max]
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

function productoModeloSelect(e,f,g){
    //ejemplo f = "Talla" y g="Color"       
    
    //Filtramos por Talla o Color
    const productoModeloF = productoModelo.filter((prod) => prod.talla===e.target.value || prod.color===e.target.value)
    //Seleccionamos el Select F
    const producto_select_f = document.getElementById("productoSelect"+f)

    //Seleccionamos el Valor del Select G, contrario al del Evento F, y le vaciamos
    const producto_select_g = document.getElementById("productoSelect"+g)
    const producto_select_g_val=producto_select_g.value
    producto_select_g.innerHTML=""

    //Creamos las Opciones del Select G
    const producto_select_g_option=document.createElement("option")
          producto_select_g_option.innerText="Seleccione "+g
          producto_select_g_option.value=""
          producto_select_g_option.disabled=true
          producto_select_g_option.selected=true
    producto_select_g.append(producto_select_g_option)

    productoModeloF.forEach((prod) => {
        if(g=="Color"){
            const producto_select_g_option=document.createElement("option")
                  producto_select_g_option.innerText=prod.color
                  producto_select_g_option.value=prod.color
                  producto_select_g_option.id="productColor_"+prod.color                                  
            if(producto_select_g_val===prod.color){
                producto_select_g_option.selected=true                                  
            }
            producto_select_g.append(producto_select_g_option)
        } else if (g =="Talla"){
            const producto_select_g_option=document.createElement("option")
                  producto_select_g_option.innerText=prod.talla
                  producto_select_g_option.value=prod.talla
                  producto_select_g_option.id="productTalla_"+prod.talla
            if(producto_select_g_val===prod.talla){
                producto_select_g_option.selected=true                                  
            }
            producto_select_g.append(producto_select_g_option)
        }        
    })
    //Fin creacion de las Opciones del Select G   
    
    //Si ambos Select tienen valores recorremos el Filtrado utilizando los valores de los selects
    if(producto_select_g.value && producto_select_f.value){
        productoModeloF.forEach((prod) => {
            if((prod.talla === producto_select_f.value && prod.color===producto_select_g.value)
                || (prod.color === producto_select_f.value && prod.talla===producto_select_g.value)    
            ){

                const producto_div_variations = document.getElementById("productoVariaciones")
                      producto_div_variations.style=""
                      producto_div_variations.innerHTML=""
                const producto_form=document.getElementById('productoForm')
                      producto_form.innerHTML=""
                const producto_alert=document.getElementById('productoAlert')
                      producto_alert.innerHTML =""

                if(prod.stock>0){
                    const producto_div_variations_detail = document.createElement('span')
                          producto_div_variations_detail.id="productoVariacionesInfo"
                          if(g=="Color" && f=="Talla"){
                              producto_div_variations_detail.innerHTML = prod.modelo+" "+producto_select_g.value+" Talla "+producto_select_f.value
                          } else if (g=="Talla" && f=="Color") {
                              producto_div_variations_detail.innerHTML = prod.modelo+" "+producto_select_f.value+" Talla "+producto_select_g.value
                          }
                    const producto_div_variations_price=document.createElement('span')
                          producto_div_variations_price.innerHTML = "$"+prod.precio
                          producto_div_variations_price.id="productoVariacionesPrice"
                    const producto_div_variations_stock=document.createElement('span')
                          producto_div_variations_stock.innerHTML = prod.stock + " disponibles"
                          producto_div_variations_stock.id="productoVariacionesStock"

                    producto_div_variations.append(producto_div_variations_detail)
                    producto_div_variations.append(producto_div_variations_price)
                    producto_div_variations.append(producto_div_variations_stock)                    
                                
                    const producto_form_inputCantidad = document.createElement('input')
                          producto_form_inputCantidad.id="productoCantidad"
                          producto_form_inputCantidad.name="productoCantidad"
                          producto_form_inputCantidad.type="number"
                          producto_form_inputCantidad.value=1
                          producto_form_inputCantidad.min=1
                          producto_form_inputCantidad.step=1
                          producto_form_inputCantidad.max=prod.stock
                    const producto_form_inputSubmit = document.createElement('input')
                          producto_form_inputSubmit.id="productoSubmit"
                          producto_form_inputSubmit.name="productoSubmit"
                          producto_form_inputSubmit.type="submit"
                          producto_form_inputSubmit.className="btn btn-primary"
                          producto_form_inputSubmit.value="Agregar"
                    producto_form.append(producto_form_inputCantidad)
                    producto_form.append(producto_form_inputSubmit)
                    
                    producto_form_inputSubmit.addEventListener('click',(e) => {
                        e.preventDefault()
                        const producto_form_inputCantidad = document.getElementById("productoCantidad")                        
                        if(prod.stock>=producto_form_inputCantidad.value){
                            const subtotal = parseFloat(producto_form_inputCantidad.value)*parseFloat(prod.precio)                        
                            carro.push(new ProductoCarro(prod.id,prod.modelo+" "+producto_select_g.value+" Talla "+producto_select_f.value,parseFloat(producto_form_inputCantidad.value),prod.precio,subtotal))
                            prod.stock-=parseFloat(producto_form_inputCantidad.value)                                                    
                            if(prod.stock<=0){
                                document.getElementById("productoSubmit").disabled=true   
                                producto_alert.innerHTML = "Acabas de agregar todo el stock a tu carrito, muchas gracias!"                                                         
                                producto_alert.style="color:green;"
                            }                        
                            verCarro()
                        } else {
                            producto_alert.style="color:red;"
                            producto_alert.innerHTML = "No quedan suficientes productos"                                                    
                        }
                        
                    })   
                    
                } else {
                    producto_div_variations.style="color:red;"
                    producto_div_variations.innerHTML="Sin Stock"                                                        
                }
            }
        })
    }
}