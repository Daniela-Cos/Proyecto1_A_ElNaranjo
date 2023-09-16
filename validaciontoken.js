const jwt = require('jsonwebtoken');

const usuarios = [
    { correoElectronico: 'usuario@example.com', clave: '123456' },
  ];

function creartoken(correoElectronico,contraseña){
    const usuario = usuarios.find((user) => user.correoElectronico === correoElectronico);
    if (!usuario){
      return null;
    }

    // Generar un token JWT si la autenticación es exitosa
    const token = jwt.sign({ correoElectronico }, 'ClaveSecreta', { expiresIn: '1h' });
  
    // Enviar el token como respuesta
    return token; 
}
function validarToken(token){
    jwt.verify(token, 'ClaveSecreta'); //TRAERL DPI
}

module.exports ={creartoken, validarToken};
