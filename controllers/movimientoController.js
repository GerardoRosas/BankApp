const Movimiento = require('../models/Movimiento');
const Usuario = require('../models/Usuario');
const fetch = require('node-fetch');

exports.crearMovimiento = async ( req, res ) => {

    //console.log(req.body);
    const { account, amount, description } = req.body;
    
    let userSelected = await Usuario.findOne({ where: { account: account }});
    
    if(!userSelected){
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    const { balance } = userSelected;

    //Creamos movimeinto en BD
    let movimiento = new Movimiento(req.body);
    console.log(movimiento);
    
    if(balance < amount){
        return res.status(404).json({
            message: 'No cuentas con saldo suficiente',
            statusCode: 400
        })
    }else if(balance >= amount){
        userSelected.balance -= amount;
        await userSelected.save();
        await movimiento.save();
        res.status(200).json({
            statusCode: 200,
            message: "Movimiento registrado"
        })
    }

}

//Crear un endpoint que permita la actualización del tipo de movimiento

exports.actualizarMovimiento = async (req, res) => {
    
    let arreglo;
    const { movementCode } = req.body; //se manda un M002
    
    //Utilizando la URL que nos da json-server
    const url = 'http://localhost:3000/movimientos';
    await fetch(url)
        .then(res => res.json())
        .then(data => {
            arreglo = data;
        })
    
    
    const resultado = arreglo.find( movement => movement.code === movementCode);
    const { name, code } = resultado;

    //Consultamos la BD para la actualizacion
    let movimiento = await Movimiento.findOne({ where : { movementCode : code }});

    if(!movimiento){
        return res.status(404).json({
            message: "EL tipo de movimiento no existe",
            statusCode: 404
        })
    }

    try {
        movimiento.description = name;
        await movimiento.save();
        res.status(200).json({
            statusCode: 200,
            message: "Movimiento actualizado"
        })
    } catch (error) {
        console.log(error);
    }
   
}

//Crear un endpoint que permita la consulta de los movimientos de una cuenta a partir
//del número de cuenta account

exports.consultarMovimiento = async (req, res) => {
    const { account } = req.params;

    let usuario = await Usuario.findOne({ where: {account: account}});
    let movement = await Movimiento.find({ where: {account: account}});
    console.log(movement);

    if(usuario && movement){
        res.status(200).json({
            statusCode: 200,
            message: "Movimiento de cuenta",
            account,
            movements: [
                movement
            ]
        })
    }

}