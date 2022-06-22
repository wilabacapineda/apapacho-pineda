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
    constructor(idProducto,modelo,detalle,cantidad,preciounitario,subtotal,img){
        this.idProducto=idProducto
        this.modelo = modelo
        this.detalle=detalle
        this.cantidad=cantidad
        this.preciounitario=preciounitario
        this.subtotal=subtotal
        this.img=img
    }
}

const productos = [
    new Producto(1,'Poleron','Poleron Amaranta','','S','Amaranta',2,20000,1,'ModeloAmaranta.jpg'),
    new Producto(2,'Poleron','Poleron Amaranta','','M','Amaranta',3,22000,10,'ModeloAmaranta.jpg'),
    new Producto(3,'Poleron','Poleron Amaranta','','L','Amaranta',3,23500,2,'ModeloAmaranta.jpg'),
    new Producto(4,'Poleron','Poleron Amaranta','','XL','Amaranta',2,25000,2,'ModeloAmaranta.jpg'),
    new Producto(5,'Poleron','Poleron Amapola','','S','Amapola',2,15000,2,'ModeloAmapola.jpg'),
    new Producto(6,'Poleron','Poleron Amapola','','M','Amapola',3,17500,7,'ModeloAmapola.jpg'),
    new Producto(7,'Poleron','Poleron Amapola','','L','Amapola',3,17500,2,'ModeloAmapola.jpg'),
    new Producto(8,'Poleron','Poleron Amapola','','XL','Amapola',2,20000,3,'ModeloAmapola.jpg'),
    new Producto(9,'Poleron','Poleron Jacinto','','S','Negro',2,10000,1,'ModeloJacinto.jpg'),
    new Producto(10,'Poleron','Poleron Jacinto','','M','Negro',0,12500,3,'ModeloJacinto.jpg'),
    new Producto(11,'Poleron','Poleron Jacinto','','L','Negro',3,13000,2,'ModeloJacinto.jpg'),
    new Producto(12,'Poleron','Poleron Jacinto','','XL','Negro',2,15000,1,'ModeloJacinto.jpg'),
    new Producto(13,'Poleron','Poleron Jacinto','','S','Gris',2,10000,1,'ModeloJacinto.jpg'),
    new Producto(14,'Poleron','Poleron Jacinto','','M','Gris',3,12500,5,'ModeloJacinto.jpg'),
    new Producto(15,'Poleron','Poleron Jacinto','','L','Gris',3,13000,3,'ModeloJacinto.jpg'),
    new Producto(16,'Poleron','Poleron Jacinto','','XL','Gris',2,15000,1,'ModeloJacinto.jpg'),
    new Producto(17,'Poleron','Poleron No me olvides','','S','Azul',2,17000,1,'ModeloNomeolvides.jpg'),
    new Producto(18,'Poleron','Poleron No me olvides','','M','Azul',3,19000,2,'ModeloNomeolvides.jpg'),
    new Producto(19,'Poleron','Poleron No me olvides','','L','Azul',3,19000,4,'ModeloNomeolvides.jpg'),
    new Producto(20,'Poleron','Poleron No me olvides','','XL','Azul',2,21000,5,'ModeloNomeolvides.jpg'),
    new Producto(21,'Poleron','Poleron No me olvides','','S','Morado',2,17000,2,'ModeloNomeolvides.jpg'),
    new Producto(22,'Poleron','Poleron No me olvides','','M','Morado',3,19000,4,'ModeloNomeolvides.jpg'),
    new Producto(23,'Poleron','Poleron No me olvides','','L','Morado',3,19000,3,'ModeloNomeolvides.jpg'),
    new Producto(24,'Poleron','Poleron No me olvides','','XL','Morado',2,21000,5,'ModeloNomeolvides.jpg'),
    new Producto(25,'Poleron','Poleron Violeta','','S','Violeta',2,17500,3,'ModeloVioleta.jpg'),
    new Producto(26,'Poleron','Poleron Violeta','','M','Violeta',3,20000,3,'ModeloVioleta.jpg'),
    new Producto(27,'Poleron','Poleron Violeta','','L','Violeta',3,20000,2,'ModeloVioleta.jpg'),
    new Producto(28,'Poleron','Poleron Violeta','','XL','Violeta',2,22500,1,'ModeloVioleta.jpg')
]

const carro = []

if(window.location.origin=="https://wilabacapineda.github.io") {
    const base_url = window.location.origin+"/apapacho-pineda";
} else {
    const base_url = window.location.origin;
}

