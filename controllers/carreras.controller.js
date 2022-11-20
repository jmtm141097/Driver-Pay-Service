import { v4 as uuidv4 } from 'uuid'

import carrerasService from '../services/carrera.services.js'
import conductorService from '../services/conductor.services.js'
import pasajeroServices from '../services/pasajero.services.js'

const solicitarConductor = async (req, res) => {
    const idCarrera = uuidv4()
    const { identificacion, ubicacionInicial, vehiculo } = req.body

    let queryConductor = {
        estado: 'DISPONIBLE'
    }
    if (vehiculo) queryConductor.vehiculo = vehiculo

    const [conductoresDisponibles, pasajero] = await Promise.all([
        conductorService.listarConductores(queryConductor),
        pasajeroServices.buscarPasajero({ identificacion })
    ])

    const carreraEnCurso = await carrerasService.buscarCarrera({ idPasajero: pasajero._id, estado: 'EN CURSO' })

    if (carreraEnCurso)
        return res.status(400).send({
            statusCode: 400,
            mensaje: 'Ya solicitaste un conductor, esperalo por favor',
            conductorAsignado: carreraEnCurso.idConductor
        })

    const conductorCercano = await conductorService.conductorMasCercano({
        idCarrera,
        ubicacionPasajero: ubicacionInicial,
        conductoresDisponibles,
        pasajero
    })

    if (conductorCercano)
        return res.status(200).send({
            statusCode: 200,
            mensaje: 'Conductor asignado correctamente',
            idCarrera,
            conductor: conductorCercano
        })

    res.status(404).send({
        statusCode: 404,
        mensaje: 'No hay conductores disponibles'
    })
}

const finalizarCarrera = async (req, res) => {
    const { conductor, estado, ubicacionFinal } = req.body

    const infoCarrera = await carrerasService.finalizarCarrera({ conductor, estado, destino: ubicacionFinal })

    if (infoCarrera) {
        return res.status(200).send({
            statusCode: 200,
            mensaje: 'Carrera finalizada',
            ...infoCarrera
        })
    }

    res.status(200).send({
        statusCode: 200,
        mensaje: 'La carrera ha sido cancelada'
    })
}

export default {
    solicitarConductor,
    finalizarCarrera
}
