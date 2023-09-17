const moduloCatalogo = require('./catalogoProducto');
const moduloCarrito = require('./carritoCompra');

function descontarInventario(idProducto, cantidad) {
  const producto = moduloCarrito.obtenerCarrito(idProducto);

  if (producto) {
    if (producto.cantidad >= cantidad) {
      producto.cantidad -= cantidad;
      return true; // Se pudo descontar del inventario
    } else {
      return false; // No hay suficiente cantidad en inventario
    }
  } else {
    return false; // Producto no encontrado en el inventario
  }
}

function procesarCompra(idProducto, cantidad) {
  const inventario = descontarInventario(idProducto, cantidad);

  if (inventario) {
    return inventario;
  } else {
    return null;
  }
}


module.exports = {
procesarCompra,
}