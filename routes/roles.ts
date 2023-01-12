import { Router } from 'restify-router'
import controller from '@/controllers/roles'
import { middlewareUsuario } from '@/libs/auth'

const router = new Router()

router.post('', middlewareUsuario, controller.post)

export default router
