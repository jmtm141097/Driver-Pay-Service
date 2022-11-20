import { v4 as uuidv4 } from 'uuid'

import carrerasService from '../services/carrera.services.js'
import conductorService from '../services/conductor.services.js'

const solicitarConductor = async (req, res) => {
    const idCarrera = uuidv4()
    const { identificacion, ubicacionInicial, vehiculo } = req.body

    const conductorCercano = await conductorService.conductorMasCercano({
        idCarrera,
        identificacionPasajero: identificacion,
        tipoVehiculo: vehiculo,
        ubicacionPasajero: ubicacionInicial
    })

    if (conductorCercano) {
        res.status(200).send({
            statusCode: 200,
            mensaje: 'Conductor asignado correctamente',
            idCarrera,
            conductor: conductorCercano
        })
        return
    }

    res.status(404).send({
        statusCode: 404,
        mensaje: 'No hay conductores disponibles'
    })
}

const finalizarCarrera = async (req, res) => {
    const { conductor, estado, ubicacionFinal } = req.body

    const infoCarrera = await carrerasService.finalizarCarrera({ conductor, estado, destino: ubicacionFinal })

    if (infoCarrera) {
        res.status(200).send({
            statusCode: 200,
            mensaje: 'Carrera finalizada',
            ...infoCarrera
        })
        return
    }
    res.status(200).send({
        statusCode: 200,
        mensaje: 'La carrera ha sido cancelada'
    })
    return
}

export default {
    solicitarConductor,
    finalizarCarrera
}
