- Se agrega listado de productos en archivo /assets/js/stock.json
- El archivo stock.json se carga a través de Fetch y se agregan los productos al array de objetos productos.
- Se agrega página de Carro de Compras
- Se agrega eventos para filtrado de productos en tienda

Para simular el carrito de compras:

1. Menu de tienda que contiene un buscador de productos y un boton para ver el carro de compras en HTML.

2. Para agregar productos al carrito se debe ir a la página del producto, accecible desde la página de Inicio o desde la página Tienda, así como también desde el buscador de productos. 

3. Carro de compras funciona en toda la página.

4. Para poder ver la página en github deploy pages tuve que crear una variable llamada "base_url" que hace una llamada window.location.origin y agregarle "/apapacho-pineda" si estamos en github page.

5. Ya no se usa linea de codigo para obtener modelo a través de GET de URL, ahora se utiliza variable a través de SessionStorage

6. Cambio de nombres en los archivos .JS utilizados.
    - variables.js -> carrito.js

7. Se utiliza la libreria SweetAlert2 usando la incorporación de jsdelivr CDN `<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>`. Esta libreria se utiliza para hacer preguntas de confirmación para la incoporación o eliminación de productos al carro de Compras.