import { Router } from 'express'
import carrerasController from '../controllers/carreras.controller.js'
import { valSolicitarConductor, valTerminarCarrera } from '../validations/carrera.validation.js'
import { consultarTransaccion } from '../controllers/wompi.controllers.js'

const router = Router()

router.post('/solicitar-conductor', valSolicitarConductor, carrerasController.solicitarConductor)
router.post('/finalizar-carrera', valTerminarCarrera, carrerasController.finalizarCarrera)
router.get('/consultar-transaccion/:id', consultarTransaccion)

export default router
