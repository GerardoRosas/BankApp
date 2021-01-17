const express = require('express');
const router = express.Router();

//Controllers
const usuarioController = require('../controllers/usuarioController');


//EndPoint 1 
module.exports = function() {
    router.post('/create-account', 
        usuarioController.nuevoUsuario
    );

    // router.put('/account',
    //     usuarioController.agregarSaldo
    // )


    return router;
}