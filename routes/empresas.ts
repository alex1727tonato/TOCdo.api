import { Router } from 'restify-router'
import controller from '@/controllers/empresas'
import { middlewareUsuario } from '@/libs/auth'

const router = new Router()

router.post('', controller.post)
router.post('/usuario', middlewareUsuario, controller.postUsuario)

export default router
