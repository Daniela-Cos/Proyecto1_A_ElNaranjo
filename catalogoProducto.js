/*Por el momento se utilizará un arreglo para almacenar datos a modo de ejemplo, 
mas adelante se debe conectar la DB*/

const productos = [    
        {id: 1,
            nombre: "Producto-1", marca: "marca-1", disponible: true, descuento: 80, precioDescuento: 25,
            imagen: "imagen_1", descripcion: "El producto es el primero", habilitado: true, categorias: ["categoria 2", "categoria 3"]
        },
        {id: 2,
            nombre: "Producto-2", marca: "marca-2", disponible: false, descuento: 80, precioDescuento: 25,
            imagen: "imagen_2", descripcion: "El producto es el segundo", habilitado: true, categorias: ["categoria 4"]
        },
        {id: 3,
            nombre: "Producto-3", marca: "marca-2", disponible: true, descuento: 80, precioDescuento: 25,
            imagen: "imagen_3", descripcion: "El producto es el tercero", habilitado: true, categorias: ["categoria 2", "categoria 3"]
        }
    ];

module.exports = productos;
