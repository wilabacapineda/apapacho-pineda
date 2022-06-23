Para simular el carrito de compras:

1. Se agrega un menu (de iconos) para la tienda que contiene un buscador de productos y un boton para ver el carro de compras en HTML.

2. Para agregar productos al carrito se debe ir a la página del producto, accecible desde la página de Inicio o desde la página Tienda, así como también desde el buscador de productos. 

3. Debido a que aun no podemos utilizar lo visto en la clase de Storage, el carro de compras solo funciona en la página Producto, para el producto seleccionado. Al cambiar de página el carro queda vacio, por lo que se puede agregar productos al carro de compras de un solo producto escogido.

4. Para poder ver la página en github deploy pages tuve que crear una variable llamada "base_url" que hace una llamada window.location.origin y agregarle "/apapacho-pineda" si estamos en github page.

5. Para la archivo producto.js, utilizada en la página de Productos, se utilizó una linea de código sacada de internet para poder leer una variable llamada "modelo" que se pasa a través de la url. Ejemplo: http://127.0.0.1:5501/pages/producto/producto.html?modelo=poleron-jacinto

6. No es necesario utilizar el PROMPT

-- 

- Se agregan variables, Mixins, Extends y Maps a style.scss

- Se agregan los siguientes keywords: 
Apapacho,Valdivia,Diseño,Independiente,Tienda,Ropa,Infantil,Niños,Niñas,Niñes,Niño,Niña,Niñe

- Para los titulos ya se consideraba titulo diferente por pagina, pero se actualiza dando vuelta el orden para páginas del sitio. 
Antes: Apapacho | Titulo
Ahora: Titulo | Apapacho

-Se agrega descripcion:
Tienda de vestuario infantil hecho a mano para apapachar a quienes amas. Produciendo desde el Sur de Chile a baja escala, amando la naturaleza.

-Para encabezados no se realizan cambios debido a que se considera que titulos h1,h2 y h3 utilizados tienen jerarquia.

-Se utilizando ALT para imaganes