import { Router } from 'restify-router'
import controller from '@/controllers/administradores'

const router = new Router()

router.post('', controller.post)

export default router
