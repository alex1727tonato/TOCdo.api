import { Router } from 'restify-router'
import auth from './auth'
import usuarios from './usuarios'

const router = new Router()
router.get('/', (req, res, next) => {
  res.send({
    name: 'api-pruebas',
    version: '0.0.1',
    description: 'Aplicativo prueba',
  })
  next()
})

router.add('/auth', auth)
router.add('/usuarios', usuarios)

export default router
