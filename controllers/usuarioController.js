const Usuario = require('../models/Usuario');
const fetch = require('node-fetch');


//Crear un endpoint que permita la creación de una cuenta
exports.nuevoUsuario = async (req, res) => {

    const {mail, name} = req.body;

    //Verificar si el usuario ya estuvo registrado
    // let usuario = await Usuario.findAll({where: { mail:mail }});
    
    // if(usuario === null){
    //     return res.status(404).json({message: 'El usuario ya se encuentra registrado'});
    // }

    // //Creamos nuevo usuario
    let usuario = new Usuario(req.body);

    //Consumiendo web service
    const url = 'https://60005b36cb21e10017af8d5b.mockapi.io/api/v1/account';
    let webService;
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            mail: mail
        })
    })
        .then(res => res.json())
        .then(data => {
            webService = data;
        })
    // const resultado = webService.find( cuenta => cuenta.account );
    const { id, account} = webService;
    
    const numero = account;
    const newStr = numero.padEnd(11, `00${id}`);
    usuario.account = newStr;
    console.log(usuario.dataValues);
    
    try {
        await usuario.save()
        res.status(200).json({usuario, message: 'Cuenta creada', statusCode: 200})
    } catch (error) {
        console.log(error);
    }
    
}


//Crear un endpoint que permita agregar saldo a una cuenta a partir del campo
//“account” (número de cuenta):

exports.agregarSaldo = async (req, res) => {

    const {account, balance} = req.body;

    //Verificar si el usuario ya estuvo registrado
    let usuario = await Usuario.findOne({where: { account: account }});
    
    if(!usuario){
        return res.status(404).json({message: 'Account not found'})
    }

    try {
        usuario.balance += balance;
        await usuario.save()
    } catch (error) {
        console.log(error);
    }
    
    res.status(200).json({ 
        account: account, 
        balance: usuario.balance, 
        message: 'Saldo Actualizado',
        statusCode: 200
    });

}

// Crear un endpoint que permita la consulta de una cuenta a partir del número de
// cuenta

exports.consultarCuenta = async (req, res) => {
    
    const { account } = req.params;
    console.log(req.params);

    const usuario = await Usuario.findOne({ where: {account: account} });

    if(!usuario){
        return res.status(404).json({message: 'No se encontro un usuario con esa cuenta'});
    }

    res.status(200).json({
        statusCode: 200,
        message: 'Informacion de cuenta',
        id: usuario.id,
        account: usuario.account,
        balance: usuario.balance,
        name: usuario.name,
        mail: usuario.mail
    })

}