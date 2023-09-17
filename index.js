const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const validaciontoken = require('./validaciontoken')

app.use(express.json());


//Módulo validación Usuario
const validarUser = require('./validarusuario');

app.get('/api/validarusuarios', (req, res, next) => {
  try{
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ Mensaje: 'Token no proporcionado' });
    }
    validaciontoken.validarToken(token);

    } catch (error) {
      return res.status(401).json({ Mensaje: 'Token inválido' });
    }
  res.json({Mensaje: 'Token valido'});

});

//Validación Token
  app.post('/api/login', (req, res) => {
    const { correoElectronico, clave } = req.body;

    const token = validaciontoken.creartoken(correoElectronico, clave)
    if (!token) {
      // Usuario no encontrado o clave incorrecta
      return res.status(401).json({ Mensaje: 'Credenciales inválidas' });
    }
    res.json({ Mensaje: 'Inicio de sesión exitoso', Token: token });
   }); 

// Método GET para obtener información del perfil

app.get('/api/perfil/:DPI',  (req, res, next) => {
  const DPI = req.params.DPI;
  const usu = validaciontoken.validarToken();
  const usuario = usuarios.find((user) => user.DPI === DPI);
  if (!usuario) {
    return res.status(404).json({ Mensaje: 'Usuario no encontrado' });
  }

  res.json(usuario);
});

// Método POST para eliminar un perfil
app.post('/api/perfil/:DPI',  (req, res, next) => {
  validaciontoken.validarToken(req.headers.token)

  const DPI = req.params.DPI;
  const usuarioExistente = usuarios.find((user) => user.DPI === DPI);
  if (usuarioExistente) {
    return res.status(409).json({ Mensaje: 'DPI duplicado' });
  }

  const nuevoUsuario = req.body;
  if (!nuevoUsuario || Object.keys(nuevoUsuario).length === 0) {
    return res.status(400).json({ Mensaje: 'Cuerpo de solicitud vacío' });
  }

  // Validar campos obligatorios
  if (!nuevoUsuario.NIT || !nuevoUsuario.CorreoElectronico) {
    return res.status(400).json({ Mensaje: 'NIT y CorreoElectronico son campos obligatorios' });
  }
    // Agregar usuario a la lista 
    usuarios.push(nuevoUsuario);

    res.json({ Mensaje: 'Perfil creado con éxito' });
  });


// Método DELETE para eliminar un perfil
app.delete('/api/perfil/:DPI',  (req, res, next) => {
  validaciontoken.validarToken(req.headers.token)
  const DPI = req.params.DPI;
  const index = usuarios.findIndex((user) => user.DPI === DPI);

  if (index === -1) {
    return res.status(404).json({ Mensaje: 'Usuario no encontrado' });
  }

  usuarios.splice(index, 1);
  res.json({ Mensaje: 'Perfil eliminado con éxito' });
});

//Módulo Catálogo de Productos:
const moduloCatalogo = require('./catalogoProducto');

app.get('/api/producto', (req, res) => {
  validaciontoken.validarToken(req.headers.token);
    const catalogo = moduloCatalogo;
    if (catalogo){
      res.json(catalogo);
    }else {
      res.status(404).json({ Mensaje: 'Catalogo vacio' });
    }
});

//Módulo de Gestion de Producto:
const moduloProducto = require('./gestionProducto');

app.get('/api/producto/:id', (req, res) => {
  validaciontoken.validarToken(req.headers.token);
    const producto = moduloProducto.obtenerProducto(req.params.id);
    if (producto){
      res.json(producto);
    }else {
      res.status(404).json({ Mensaje: 'Producto no encontrado' });
    }
});

app.post('/api/producto/:id', (req, res) => {
  validaciontoken.validarToken(req.headers.token);
  const agregar = moduloProducto.agregarProducto();
  if (agregar){
    res.json(agregar);
  }else {
    res.status(404).json({ Mensaje: 'Producto no encontrado' });
  }
});

app.delete('/api/producto/:id', (req, res) => {
  validaciontoken.validarToken(req.headers.token);
  const eliminar = moduloProducto.eliminarProducto(req.params.id);
  if (eliminar){
    res.json({ message: 'Producto eliminado con éxito' });
  }else {
    res.status(404).json({ Mensaje: 'Producto no encontrado' });
  }
});

//Módulo de Carrito de compra:
const moduloCarrito = require('./carritoCompra');
app.get('/api/carrito', (req, res) =>{
  const carrito = moduloCarrito.obtenerCarrito(1);
  if (!carrito){
    res.status(404).json({ Mensaje: 'Carrito de compra no encontrado' });
  }
  console.log(carrito);
  const detalleCarrito = {
    // revisar aquí el problema del map
    items: carrito.items.map((item) => {
      const catalogo = moduloProducto.obtenerProducto(item.idProducto)
      return { 
        cantidad: item.cantidad,
        producto: catalogo,
      };
    }),
  };
  res.json(detalleCarrito);
});

app.post('/api/carrito', (req, res) =>{
  const { dpi, idProducto, nuevaCantidad } = req.body;
  const actualizarCantidad = moduloCarrito.actualizarCantidad(dpi, idProducto, nuevaCantidad);
  if (actualizarCantidad) {
    res.json({ message: 'Cantidad actualizada exitosamente'});
  } else {
    res.status(404).json({ message: 'Producto no encontrado en el carrito' }); 
  }
});

app.delete('/api/carrito', (req, res) =>{
  const { dpi, productoId } = req.body;
  const eliminarCantidad = moduloCarrito.eliminarCarrito(dpi, productoId);

  if (eliminarCantidad){
    res.json({ message: 'Producto eliminado con éxito' });
  }else {
    res.status(404).json({ Mensaje: 'Producto no encontrado' });
  }
})

//Módulo de Compra:
const moduloCompra = require('./compra');
app.post('/api/compra', (req, res) =>{
  const { idProducto, cantidad } = req.body;
  const compra = moduloCompra.procesarCompra(idProducto, cantidad);
  if (compra) {
    return `Compra exitosa.`;
  } else {
    return 'No se pudo completar la compra. Verifica la disponibilidad del producto.';
  }
})


//Iniciar el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

