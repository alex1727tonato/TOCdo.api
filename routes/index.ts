import auth from './auth'
import roles from './roles'
import empresas from './empresas'
import admin from './administradores'
import { Router } from 'restify-router'

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
router.add('/rol', roles)
router.add('/admin', admin)
router.add('/empresas', empresas)

export default router
