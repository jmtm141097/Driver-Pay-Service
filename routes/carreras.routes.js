import { Router } from 'express'
import carrerasController from '../controllers/carreras.controller.js'

const router = Router()

router.post('/solicitar-conductor', carrerasController.solicitarConductor)
router.post('/finalizar-carrera', carrerasController.finalizarCarrera)

export default router
