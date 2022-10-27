import { v4 as uuidv4 } from 'uuid'

import carrerasService from '../services/carrera.services.js'
import pasajeroService from '../services/pasajero.services.js'
import conductorService from '../services/conductor.services.js'
import conductorMasCercano from './helpers/conductorMasCercano.helpers.js'

const solicitarConductor = async (req, res) => {
    const idCarrera = uuidv4()
    const { identificacion, ubicacionInicial, vehiculo } = req.body

    const [conductoresDisponibles, pasajero] = await Promise.all([
        conductorService.listarConductores({ estado: 'DISPONIBLE', vehiculo }),
        pasajeroService.buscarPasajero({ identificacion })
    ])

    const conductorCercano = conductorMasCercano({
        conductores: conductoresDisponibles,
        ubicacionUsuario: ubicacionInicial
    })
    conductorCercano.distanciaConductorUsuario = `${conductorCercano.distanciaConductorUsuario} KM`

    const infoConductor = conductoresDisponibles.find(
        (conductor) => conductor.identificacion === conductorCercano.identificacion
    )

    await Promise.all([
        carrerasService.crearCarrera({
            idConductor: infoConductor._id,
            idPasajero: pasajero._id,
            idCarrera,
            ubicacionInicial
        }),
        conductorService.editarConductor({
            ...infoConductor,
            estado: 'OCUPADO',
            idCarrera
        })
    ])

    res.status(200).send({
        statusCode: 200,
        mensaje: 'Conductor asignado correctamente',
        idCarrera,
        conductor: conductorCercano
    })
}

const finalizarCarrera = (req, res) => {}

export default {
    solicitarConductor,
    finalizarCarrera
}
