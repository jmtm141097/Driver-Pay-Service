import CarreraSchema from '../schemas/carrera.js'
import { realizarPago } from './wompi.services.js'
import conductorService from './conductor.services.js'
import calcularPrecioTotal from './helpers/calcularPrecioCarrera.helpers.js'

const finalizarCarrera = async ({ conductor, estado, destino }) => {
    const horaFin = Date.now()
    const carreraEnCurso = await buscarCarrera({ idCarrera: conductor.idCarrera, estado: 'EN CURSO' })

    if (!carreraEnCurso)
        return {
            status: 'SIN CARRERA'
        }

    switch (estado) {
        case 'CANCELADA':
            await Promise.all([
                editarCarrera({
                    _id: carreraEnCurso._id,
                    estado,
                    horaFin,
                    ubicacionFinal: destino,
                    kmRecorridos: 0
                }),
                conductorService.editarConductor({ ...conductor, ubicacionFinal: destino, estado: 'DISPONIBLE' })
            ])
            return {
                status: 'CANCELADA'
            }
        case 'TERMINADA':
            const { precioTotal, kmRecorridos } = calcularPrecioTotal({
                carrera: carreraEnCurso,
                horaFin,
                ubicacionFinal: destino
            })
            const [pagoEfectuado, _carrera, _conductor] = await Promise.all([
                realizarPago({
                    reference: carreraEnCurso.idCarrera,
                    precioTotal,
                    metodoPago: carreraEnCurso.idPasajero.metodoPago,
                    payment_source_id: parseInt(carreraEnCurso.idPasajero.idPago)
                }),
                editarCarrera({
                    _id: carreraEnCurso._id,
                    estado,
                    horaFin,
                    ubicacionFinal: destino,
                    kmRecorridos
                }),
                conductorService.editarConductor({ ...conductor, ubicacionFinal: destino, estado: 'DISPONIBLE' })
            ])
            return {
                status: 'TERMINADA',
                infoCarrera: {
                    statusPago: pagoEfectuado.status,
                    idTransaccion: pagoEfectuado.id,
                    kmRecorridos: `${kmRecorridos} KM`,
                    precioTotal
                }
            }
        default:
            return {
                status: 'FAIL'
            }
    }
}

const crearCarrera = async (infoCarrera) => {
    try {
        const carrera = new CarreraSchema(infoCarrera)
        return await carrera.save()
    } catch (error) {
        return null
    }
}

const editarCarrera = async (infoCarrera) => {
    try {
        return await CarreraSchema.findByIdAndUpdate(infoCarrera._id, infoCarrera)
    } catch (error) {
        return null
    }
}

const buscarCarrera = async (query) => {
    try {
        return await CarreraSchema.findOne(query)
            .populate({ path: 'idPasajero', select: 'identificacion nombre metodoPago idPago' })
            .populate({ path: 'idConductor', select: '-_id identificacion nombreCompleto ubicacionActual vehiculo' })
            .lean()
    } catch (error) {
        return null
    }
}

const listarCarreras = async (query) => {
    try {
        return await CarreraSchema.find(query).lean()
    } catch (error) {
        return null
    }
}

export default { crearCarrera, editarCarrera, buscarCarrera, listarCarreras, finalizarCarrera }
