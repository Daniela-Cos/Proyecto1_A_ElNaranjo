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


app.get("/", function (req, res ){
    res.send('Hello world')

});

//Iniciar el servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

