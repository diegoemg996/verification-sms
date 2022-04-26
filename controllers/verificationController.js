import twilio from 'twilio';
import generarToken from '../helpers/generarToken.js';
import Verification from '../models/Verification.js';

const mandarMensaje = async(req, res) => {

    const client = new twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    const {idUser} = req.body;
    const token = generarToken();

    const verification = {
        idUser,
        token
    }
    try {

        let tokenSaved = await Verification.findOneAndUpdate({idUser}, verification, {new: true});

        if(!tokenSaved){
            tokenSaved = await Verification.create(verification);
        }

        client.messages.create({
            body: `Tu token es: ${token}`,
            to: '+523315269016',
            from: '+18303315176'
        })
        .then(message => {
            return res.json({
                ok: true,
                msg: 'Mensaje enviado'
            })
        }).catch(err => {
            return res.json({
                ok: false,
                msg: 'Error al enviar el mensaje'
            })
        });

    } catch (error) {
        return res.status(400).json(error)
    }



}

const verificarToken = async(req, res) => {

    const {token} = req.body;

    try {
        const verification = await Verification.findOne({token});

        if(!verification){
            return res.json({
                ok: false,
                msg: 'Token no valido'
            })
        }

        return res.json({
            ok: true,
            msg: 'Token valido'
        })

    } catch (error) {
        return res.status(400).json(error)
    }

}

export  {mandarMensaje, verificarToken};
