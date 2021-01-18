const Movimiento = require('../models/Movimiento');
const Usuario = require('../models/Usuario');

exports.crearMovimiento = async ( req, res ) => {

    //console.log(req.body);
    const { account, amount, description } = req.body;
    
    let userSelected = await Usuario.findOne({ where: { account: account }});
    
    if(!userSelected){
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    const { balance } = userSelected;
    
    if(balance < amount){
        return res.status(404).json({
            message: 'No cuentas con saldo suficiente',
            statusCode: 400
        })
    }else if(balance >= amount){
        userSelected.balance -= amount;
        await userSelected.save();
        res.status(200).json({
            statusCode: 200,
            message: "Movimiento registrado"
        })
    }

}