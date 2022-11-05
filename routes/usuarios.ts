import { Router } from 'restify-router'
import controller from '@/controllers/usuarios'

const router = new Router()

router.post('', controller.post)

export default router
