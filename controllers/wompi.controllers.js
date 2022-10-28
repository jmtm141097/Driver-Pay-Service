import { consultarPago } from '../services/wompi.services.js'

export const consultarTransaccion = async (req, res) => {
    if (req.params.id) {
        res.send(await consultarPago(req.params.id))
        return
    }
    res.status(502).send({
        statusCode: 502,
        mensaje: 'No estas enviando un ID'
    })
}
