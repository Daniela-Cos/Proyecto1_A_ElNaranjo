const moduloCarrito = require('./carrito');

function obtenerCarrito (dpi) {
    if (!moduloCarrito){
        return null;   
    } 
    const productosPorUsuario = moduloCarrito.find(carrito => carrito.dpi === dpi)
    return productosPorUsuario;
  }
  
  function actualizarCarrito(dpi) {
    const carritoExistente = obtenerCarrito(dpi);
  
    if (!carritoExistente) {
      moduloCarrito.push({ dpi, items: [] });
    }
  
    return obtenerCarrito(dpi);
  }

  function actualizarCantidad(dpi, idProducto, nuevaCantidad) {
    const carrito = obtenerCarrito(dpi);
  
    if (carrito) {
      const productoEnCarrito = carrito.items.find(items => items.idProducto === idProducto);
      if (productoEnCarrito) {
        // Validar disponibilidad del producto aquí si es necesario
        productoEnCarrito.cantidad = nuevaCantidad;
        return nuevaCantidad;
      } else {
        return null;
      }
    } 
  }


function eliminarCarrito (dpi, idProducto){
  const carrito = obtenerCarrito(dpi);

  if (carrito) {
    const productoIndex = carrito.items.findIndex(items => items.idProducto === idProducto);

    if (productoIndex !== -1) {
      const productoEliminado = carrito.items.splice(productoIndex, 1)[0];
      carrito.total -= productoEliminado.precio * productoEliminado.cantidad;
      return carrito.total;
    } else {
      return null;
    }
  }
}


module.exports ={
    obtenerCarrito,
    actualizarCantidad,
    eliminarCarrito
};