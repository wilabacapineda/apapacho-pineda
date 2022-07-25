const productosTiendaX = document.getElementById('productosTienda')
const cargarTienda = (resultado="") => {   
    const aux = []
    if(resultado===""){
      resultado = productos      
    }     
    resultado.forEach( (producto) => {
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
    })
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

const filter_color = document.getElementsByClassName("filter_color")
const filterColorArray = []
if(filter_color.length>0){      
      for(const fc of filter_color){
            fc.addEventListener("click", (e) => {
                  e.preventDefault()
                  const existe_filtro_color = document.getElementById("color_span_"+e.currentTarget.id)
                  if (!existe_filtro_color){
                        filterColorArray.push(e.currentTarget.id)
                        const resultado = productos.filter((producto) => {
                              if(producto.stock>0){
                                    if(!filterColorArray.length){
                                          if(!filterTallaArray.length){
                                                document.getElementById("text_filtro").style.display="none"
                                                return producto                                          
                                          } else {
                                                let entro = 0
                                                filterTallaArray.forEach((p) => {
                                                      if(producto.talla == p){
                                                            entro = 1                                          
                                                      } 
                                                })
                                                if (entro == 1){
                                                      return producto
                                                }
                                          }                                          
                                    } else {
                                          if(!filterTallaArray.length){
                                                let entro = 0
                                                filterColorArray.forEach((p) => {                              
                                                      if(producto.color == p){
                                                            entro = 1                                          
                                                      }                                                                        
                                                })
                                                if (entro == 1){
                                                      return producto
                                                }
                                          } else {
                                                let entro = 0
                                                filterColorArray.forEach((p) => {                              
                                                      if(producto.color == p){
                                                            entro = 1                                          
                                                      }                                                                        
                                                })                                                
                                                if(entro == 1){
                                                      filterTallaArray.forEach((p) => {
                                                            if(producto.talla == p){
                                                                  entro = 2                                          
                                                            } 
                                                      })                                                      
                                                }
                                                if(entro==2){
                                                      return producto
                                                }
                                          }                                          
                                    }                                    
                              }                        
                        })
                        productosTiendaX.innerHTML=""
                        cargarTienda(resultado)
                        const current_color = e.currentTarget.querySelector("span.cuadrado").style.backgroundColor                  
                        const filtro_color_close = document.createElement("a")
                              filtro_color_close.href="#"
                              filtro_color_close.id=e.currentTarget.id
                              filtro_color_close.style.color=current_color
                              filtro_color_close.innerHTML=`<i class="fas fa-times" aria-hidden="true"></i>`
                              filtro_color_close.addEventListener("click", (e) => {
                                    e.preventDefault()
                                    const existe_filtro_color = document.getElementById("color_span_"+e.currentTarget.id)
                                    const index = filterColorArray.indexOf(e.currentTarget.id)
                                    if (index > -1) { 
                                          filterColorArray.splice(index, 1)
                                    }
                                    const resultado = productos.filter((producto) => {
                                          if(producto.stock>0){
                                                if(!filterColorArray.length){
                                                      if(!filterTallaArray.length){
                                                            document.getElementById("text_filtro").style.display="none"
                                                            return producto                                          
                                                      } else {
                                                            let entro = 0
                                                            filterTallaArray.forEach((p) => {
                                                                  if(producto.talla == p){
                                                                        entro = 1                                          
                                                                  } 
                                                            })
                                                            if (entro == 1){
                                                                  return producto
                                                            }
                                                      }                                          
                                                } else {
                                                      if(!filterTallaArray.length){
                                                            let entro = 0
                                                            filterColorArray.forEach((p) => {                              
                                                                  if(producto.color == p){
                                                                        entro = 1                                          
                                                                  }                                                                        
                                                            })
                                                            if (entro == 1){
                                                                  return producto
                                                            }
                                                      } else {
                                                            let entro = 0
                                                            filterColorArray.forEach((p) => {                              
                                                                  if(producto.color == p){
                                                                        entro = 1                                          
                                                                  }                                                                        
                                                            })                                                
                                                            if(entro == 1){
                                                                  filterTallaArray.forEach((p) => {
                                                                        if(producto.talla == p){
                                                                              entro = 2                                          
                                                                        } 
                                                                  })                                                      
                                                            }
                                                            if(entro==2){
                                                                  return producto
                                                            }
                                                      }                                          
                                                }                                    
                                          }                        
                                    })
                                    productosTiendaX.innerHTML=""
                                    cargarTienda(resultado)
                                    existe_filtro_color.remove()
                              })
                        const filtro_color = document.createElement("span")
                              filtro_color.className="text_filtro_span"
                              filtro_color.id="color_span_"+e.currentTarget.id
                              filtro_color.innerHTML="Color: "+e.currentTarget.id
                              filtro_color.style.borderColor = current_color
                              filtro_color.append(filtro_color_close)
                        
                        const text_filtro_close = document.getElementById("filtro_close")
                        const text_filtro = document.getElementById("text_filtro")
                              text_filtro.insertBefore(filtro_color, text_filtro_close)
                              text_filtro.style.display = "flex"                        
                  }
            })
      }
}

const filter_talla = document.getElementsByClassName("filter_talla")
const filterTallaArray = []
if(filter_talla.length>0){      
      for(const ft of filter_talla){
            ft.addEventListener("click", (e) => {
                  e.preventDefault()    
                  const existe_filtro_talla = document.getElementById("talla_span_"+e.currentTarget.id)  
                  if(!existe_filtro_talla) {
                        filterTallaArray.push(e.currentTarget.id)
                        const resultado = productos.filter((producto) => {
                              if(producto.stock>0){
                                    if(!filterColorArray.length){
                                          if(!filterTallaArray.length){
                                                document.getElementById("text_filtro").style.display="none"
                                                return producto                                          
                                          } else {
                                                let entro = 0
                                                filterTallaArray.forEach((p) => {
                                                      if(producto.talla == p){
                                                            entro = 1                                          
                                                      } 
                                                })
                                                if (entro == 1){
                                                      return producto
                                                }
                                          }                                          
                                    } else {
                                          if(!filterTallaArray.length){
                                                let entro = 0
                                                filterColorArray.forEach((p) => {                              
                                                      if(producto.color == p){
                                                            entro = 1                                          
                                                      }                                                                        
                                                })
                                                if (entro == 1){
                                                      return producto
                                                }
                                          } else {
                                                let entro = 0
                                                filterColorArray.forEach((p) => {                              
                                                      if(producto.color == p){
                                                            entro = 1                                          
                                                      }                                                                        
                                                })                                                
                                                if(entro == 1){
                                                      filterTallaArray.forEach((p) => {
                                                            if(producto.talla == p){
                                                                  entro = 2                                          
                                                            } 
                                                      })                                                      
                                                }
                                                if(entro==2){
                                                      return producto
                                                }
                                          }                                          
                                    }                                    
                              }                        
                        })
                        productosTiendaX.innerHTML=""
                        cargarTienda(resultado)                        
      
                        const filtro_talla_close = document.createElement("a")
                              filtro_talla_close.href="#"
                              filtro_talla_close.id="talla_"+e.currentTarget.id
                              filtro_talla_close.style.color="black"
                              filtro_talla_close.innerHTML=`<i class="fas fa-times" aria-hidden="true"></i>`
                              filtro_talla_close.addEventListener("click", (e) => {
                                    e.preventDefault()
                                    const talla_current = e.currentTarget.id.substring(6)                                          
                                    const existe_filtro_talla = document.getElementById("talla_span_"+talla_current)
                                    const index = filterTallaArray.indexOf(talla_current)
                                    if (index > -1) { 
                                          filterTallaArray.splice(index, 1)
                                    }
                                    const resultado = productos.filter((producto) => {
                                          if(producto.stock>0){
                                                if(!filterColorArray.length){
                                                      if(!filterTallaArray.length){
                                                            document.getElementById("text_filtro").style.display="none"
                                                            return producto                                          
                                                      } else {
                                                            let entro = 0
                                                            filterTallaArray.forEach((p) => {
                                                                  if(producto.talla == p){
                                                                        entro = 1                                          
                                                                  } 
                                                            })
                                                            if (entro == 1){
                                                                  return producto
                                                            }
                                                      }                                          
                                                } else {
                                                      if(!filterTallaArray.length){
                                                            let entro = 0
                                                            filterColorArray.forEach((p) => {                              
                                                                  if(producto.color == p){
                                                                        entro = 1                                          
                                                                  }                                                                        
                                                            })
                                                            if (entro == 1){
                                                                  return producto
                                                            }
                                                      } else {
                                                            let entro = 0
                                                            filterColorArray.forEach((p) => {                              
                                                                  if(producto.color == p){
                                                                        entro = 1                                          
                                                                  }                                                                        
                                                            })                                                
                                                            if(entro == 1){
                                                                  filterTallaArray.forEach((p) => {
                                                                        if(producto.talla == p){
                                                                              entro = 2                                          
                                                                        } 
                                                                  })                                                      
                                                            }
                                                            if(entro==2){
                                                                  return producto
                                                            }
                                                      }                                          
                                                }                                    
                                          }                        
                                    })
                                    productosTiendaX.innerHTML=""
                                    cargarTienda(resultado)
                                    existe_filtro_talla.remove()
                              })

                        const filtro_talla = document.createElement("span")
                              filtro_talla.className="text_filtro_span"
                              filtro_talla.id="talla_span_"+e.currentTarget.id
                              filtro_talla.innerHTML="Talla: "+e.currentTarget.id
                              filtro_talla.style.borderColor = "black"
                              filtro_talla.append(filtro_talla_close)
                        
                        const text_filtro_close = document.getElementById("filtro_close")
                        const text_filtro = document.getElementById("text_filtro")
                              text_filtro.insertBefore(filtro_talla, text_filtro_close)
                              text_filtro.style.display = "flex"                        
                        
                  }                                                   
            })
      }
}

const filtro_close = document.getElementById("filtro_close")
if(filtro_close){
      filtro_close.addEventListener("click", (e) => {
            e.preventDefault()
            filterTallaArray.splice(0, filterTallaArray.length)
            filterColorArray.splice(0, filterColorArray.length)
            const text_filtro_span = document.querySelectorAll(".text_filtro_span")
            text_filtro_span.forEach((p) => p.remove())            
            document.getElementById("text_filtro").style.display="none"
            productosTiendaX.innerHTML=""
            cargarTienda() 
      })
}