import { Router } from 'restify-router'
import controller from '@/controllers/empresas'

const router = new Router()

router.post('usuario', controller.post)

export default router
