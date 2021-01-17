const Usuario = require('../models/Usuario');

//Crear un endpoint que permita la creación de una cuenta

exports.nuevoUsuario = async (req, res) => {

    const {mail} = req.body;

    //Verificar si el usuario ya estuvo registrado
    let usuario = await Usuario.findOne({mail});

    if(usuario){
        return res.status(404).json({message: 'El usuario ya se encuentra registrado'});
    }

    // //Creamos nuevo usuario
    usuario = new Usuario(req.body);
    
    const numero = '59823483';
    const newStr = numero.padEnd(11, `00${usuario.id}`);
    usuario.account = newStr;
    console.log(usuario.dataValues);
    
    try {
        //await usuario.save()
        res.status(200).json({usuario, message: 'Cuenta creada', statusCode: 200})
    } catch (error) {
        console.log(error);
    }
    
}


//Crear un endpoint que permita agregar saldo a una cuenta a partir del campo
//“account” (número de cuenta):

// exports.agregarSaldo = async (req, res) => {

//     const {account, balance} = req.body;

//     //Verificar si el usuario ya estuvo registrado
//     let usuario = await Usuario.findOne({mail});

//     // if(usuario){
//     //     return res.status(404).json({msg: 'El usuario ya se encuentra registrado'});
//     // }



//     res.status(200).json({message: 'Saldo Actualizado', statusCode: 200})
// }