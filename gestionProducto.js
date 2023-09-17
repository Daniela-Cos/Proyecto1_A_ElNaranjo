const Joi = require('joi');
const moduloCatalogo = require('./catalogoProducto');

function obtenerProducto (id) {
    const producto = moduloCatalogo.find(producto => producto.id === parseInt(id));
    if (!producto) {
      return null;  
      // Producto no encontrado
    } return producto; 
       // Producto encontrado 
  }
  
//TODO: pendiente de encontrar como unir el schema con producto
  function agregarProducto(producto) {
      const schema = Joi.object({
      id:Joi.number().required(),
      nombre: Joi.string().required(),
      marca: Joi.string().required(), 
      disponible: Joi.any().allow(Joi.string().valid('Disponible', 'No disponible')), 
      descuento: number().required(), 
      precioDescuento: number().required(),
      imagen: Joi.any().allow('imagen'), 
      descripcion: Joi.string().required(), 
      cantidad: Joi.number().required(),
      habilitado: Joi.any().allow(Joi.boolean), 
      categorias: Joi.array().items(Joi.string().valid('Categoria 1', 'Categoria 2', 
      + 'Categoria 3', 'Categoria 4', 'Categoria 5'))
    })
    
    // guardar el producto
    moduloCatalogo.push(producto);
  }
  
  function eliminarProducto(id) {
    const index = moduloCatalogo.findIndex((producto) => producto.id === parseInt(id));
    if (index !== -1) {
      moduloCatalogo.splice(index, 1);
      moduloCatalogo.habilitado = false;
      return true;  
       // Producto eliminado con éxito
    } return false; 
      // Producto no encontrado
  }

  module.exports = {
    obtenerProducto,
    agregarProducto,
    eliminarProducto
  };

  