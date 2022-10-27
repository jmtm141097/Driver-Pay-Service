import { Router } from 'express'
import carrerasRutas from './carreras.routes.js'

const router = Router()
router.use('/carreras', carrerasRutas)

export default router
