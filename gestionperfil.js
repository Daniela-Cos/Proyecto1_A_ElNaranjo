const express = require('express');
const jwt = require('jsonwebtoken');

app.use(express.json());

const secretKey = 'ClaveSecreta'; 
const usuarios = []; 

function validarToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ Mensaje: 'Token no proporcionado' });
    }
  
    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      return res.status(401).json({ Mensaje: 'Token inválido' });
    }
  }
  
  const nuevoUsuario = req.body;
  if (!nuevoUsuario || Object.keys(nuevoUsuario).length === 0) {
    return res.status(400).json({ Mensaje: 'Cuerpo de solicitud vacío' });
  }



  res.json({ Mensaje: 'Perfil creado con éxito' });
  
module.exports = {validarToken, nuevoUsuario};