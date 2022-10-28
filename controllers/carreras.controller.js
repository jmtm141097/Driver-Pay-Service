import { v4 as uuidv4 } from 'uuid'

import carrerasService from '../services/carrera.services.js'
import pasajeroService from '../services/pasajero.services.js'
import conductorService from '../services/conductor.services.js'
import { realizarPago } from '../services/wompi.services.js'

import conductorMasCercano from './helpers/conductorMasCercano.helpers.js'
import calcularPrecioTotal from './helpers/calcularPrecioCarrera.helpers.js'

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

    if (conductorCercano.identificacion) {
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
        return
    }

    res.status(404).send({
        statusCode: 404,
        mensaje: 'No hay conductores disponibles'
    })
}

const finalizarCarrera = async (req, res) => {
    const { conductor, estado, ubicacionFinal } = req.body

    const horaFin = Date.now()
    const carreraEnCurso = await carrerasService.buscarCarrera({ idCarrera: conductor.idCarrera })

    switch (estado) {
        case 'CANCELADA':
            await Promise.all([
                carrerasService.editarCarrera({
                    ...carreraEnCurso,
                    estado,
                    horaFin,
                    ubicacionFinal,
                    kmRecorridos
                }),
                conductorService.editarConductor({ ...conductor, ubicacionFinal, estado: 'DISPONIBLE' })
            ])
            res.status(200).send({
                statusCode: 200,
                mensaje: 'La carrera ha sido cancelada'
            })
            return
        case 'TERMINADA':
            const { precioTotal, kmRecorridos } = calcularPrecioTotal({
                carrera: carreraEnCurso,
                horaFin,
                ubicacionFinal
            })
            const [pagoEfectuado, _carrera, _conductor] = await Promise.all([
                realizarPago({
                    reference: carreraEnCurso.idCarrera,
                    precioTotal,
                    metodoPago: carreraEnCurso.idPasajero.metodoPago,
                    payment_source_id: parseInt(carreraEnCurso.idPasajero.idPago)
                }),
                carrerasService.editarCarrera({
                    ...carreraEnCurso,
                    estado,
                    horaFin,
                    ubicacionFinal,
                    kmRecorridos
                }),
                conductorService.editarConductor({ ...conductor, ubicacionFinal, estado: 'DISPONIBLE' })
            ])
            res.status(200).send({
                statusCode: 200,
                mensaje: 'Carrera finalizada',
                infoCarrera: {
                    statusPago: pagoEfectuado.status,
                    idTransaccion: pagoEfectuado.id,
                    kmRecorridos,
                    precioTotal
                }
            })
            return
        default:
            res.status(502).send({
                statusCode: 502,
                mensaje: 'Error interno en el servidor'
            })
            break
    }
}

export default {
    solicitarConductor,
    finalizarCarrera
}
