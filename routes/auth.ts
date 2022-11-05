import { Router } from 'restify-router'
import controller from '@/controllers/auth'

const router = new Router()

router.post('/user', controller.post)

export default router
