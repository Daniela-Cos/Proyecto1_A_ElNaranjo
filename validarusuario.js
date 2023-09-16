const express = require('express');
const Joi = require('joi');


const usuarios = [
  {
      Nombres: "Daniela Sofia",
      Apellidos: "Gonzalez",
      DPI: "1",
      FechaNacimiento: "21/02/1999",
      Clave: "Dk$cosio21.",
      ValidacionClave: "",
      DireccionEntrega: "36 avenida 4-58 Guatemala zona 9",
      NIT:  "5879841-8",
      NúmeroTelefonico: "58961751",
      CorreoElectronico: "disco@gmail.com" }
];
const validarRegistro = (req, res, next) => {
    const schema = Joi.object({
      Nombres: Joi.string().required(),
      Apellidos: Joi.string().required(),
      DPI:Joi.string().required(),
      FechaNacimiento: Joi.date().iso().required(),
      Clave: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%^&\\*])')).required(),
      ValidacionClave: Joi.string().valid(Joi.ref('Clave')).required(),
      DireccionEntrega: Joi.string().required(),
      NIT: Joi.string().required(),
      NúmeroTelefonico: Joi.string().required(),
      CorreoElectronico: Joi.string().email().required()
    });
  
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ Mensaje: 'Error de validación de datos', Detalles: error.details });
    }
  
    next();
  };

  const verificarDuplicados = (req, res, next) => {
    const { DPI, CorreoElectronico, NIT } = req.params;
    const usuarioExistente = usuarios.find((usuario) => {
      return usuario.DPI === DPI || usuario.CorreoElectronico === CorreoElectronico || usuario.NIT === NIT;
    });
  
    if (usuarioExistente) {
      return res.status(400).json({ Mensaje: 'DPI, Correo o NIT ya registrados' });
    }
  
    next();
  };

module.exports = {validarRegistro,verificarDuplicados};
