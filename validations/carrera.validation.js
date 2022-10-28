import { body } from 'express-validator'
import validationMiddleware from '../middlewares/validation.middleware.js'
import pasajeroService from '../services/pasajero.services.js'
import conductorService from '../services/conductor.services.js'

const valSolicitarConductor = validationMiddleware([
    body('identificacion')
        .exists()
        .withMessage('El numero de identificacion es obligatoria')
        .isNumeric()
        .withMessage('El numero de identificacion debe ser numerico')
        .isLength({ min: 6, max: 15 })
        .withMessage('El numero de identificacion debe tener entre 6 y 15 caracteres')
        .custom((identificacion) => {
            return new Promise(async (resolve, reject) => {
                const usuario = await pasajeroService.buscarPasajero({ identificacion })
                usuario ? resolve() : reject('No existe un usuario registrado con esa identificacion')
            })
        }),
    body('ubicacionInicial')
        .exists()
        .withMessage('La ubicacion es obligatoria')
        .isLatLong()
        .withMessage(`La ubicacion debe estar expresada de la siguiente manera (2.937043, -75.296442)`),
    body('vehiculo')
        .exists()
        .withMessage('El vehiculo es obligatorio')
        .isIn(['CARRO', 'MOTO', 'BICICLETA'])
        .withMessage("El vehiculo debe ser 'CARRO' - 'MOTO' - 'BICICLETA'")
])

const valTerminarCarrera = validationMiddleware([
    body('identificacion')
        .exists()
        .withMessage('El numero de identificacion es obligatoria')
        .isNumeric()
        .withMessage('El numero de identificacion debe ser numerico')
        .isLength({ min: 6, max: 15 })
        .withMessage('El numero de identificacion debe tener entre 6 y 15 caracteres')
        .custom((identificacion, { req }) => {
            return new Promise(async (resolve, reject) => {
                const conductor = await conductorService.buscarConductor({ identificacion })
                if (conductor) {
                    if (conductor?.idCarrera) {
                        req.body.conductor = conductor
                        resolve()
                    }
                    reject('El conductor no tiene una carrera asignada')
                }
                conductor ? resolve() : reject('No existe un conductor registrado con esa identificacion')
            })
        }),
    body('estado')
        .exists()
        .withMessage('El estado es obligatorio')
        .isIn(['CANCELADA', 'TERMINADA'])
        .withMessage("El estado debe ser 'CANCELADA' - 'TERMINADA'"),
    body('ubicacionFinal')
        .exists()
        .withMessage('La ubicacion final es obligatoria')
        .isLatLong()
        .withMessage(`La ubicacion final debe estar expresada de la siguiente manera (2.937043, -75.296442)`)
])

export { valSolicitarConductor, valTerminarCarrera }
