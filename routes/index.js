const express = require('express');
const router = express.Router();

//Controllers
const usuarioController = require('../controllers/usuarioController');
const movimientoController = require('../controllers/movimientoController');


//EndPoint 1 
module.exports = function() {
    router.post('/create-account', usuarioController.nuevoUsuario );

    router.put('/account', usuarioController.agregarSaldo );

    router.get('/account/:account', usuarioController.consultarCuenta);

    router.post('/account/movement', movimientoController.crearMovimiento);


    return router;
}