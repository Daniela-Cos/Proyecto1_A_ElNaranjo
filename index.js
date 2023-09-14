const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

app.use(express.json());



//importar modulos

const validarUser = require('./validarusuario');

app.get('/api/validarusuarios', (req, res, next) => {
  const validacion = validarUser.validarRegistro(req, res, next);
  res.json(validacion);

});



 /* app.post('/api/registro/:DPI', verificarDuplicados, validarRegistro, (req, res) => {
    const { DPI } = req.params;
    const usuario = { DPI, ...req.body };
    usuarios.push(usuario);
    res.json({ Mensaje: 'Usuario registrado con éxito' });
  });*/
  

app.get("/", function (req, res ){
    res.send('Hello world')

});

app.listen(8081);

