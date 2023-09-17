const jwt = require('jsonwebtoken');

const usuarios = [
    { correoElectronico: 'usuario@example.com', clave: '123456' },
  ];

function creartoken(correoElectronico,contraseña, DPI){
    const usuario = usuarios.find((user) => user.correoElectronico === correoElectronico);
    if (!usuario){
      return null;
    }

    // Generar un token JWT si la autenticación es exitosa
    const token = jwt.sign({ correoElectronico, DPI }, 'ClaveSecreta', { expiresIn: '1h' });
  
    // Enviar el token como respuesta
    return token; 
}
function validarToken(token, DPI){
    jwt.verify(token, DPI, 'ClaveSecreta' ); //TRAERL DPI
}

module.exports ={creartoken, validarToken};
