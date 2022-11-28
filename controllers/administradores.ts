import { generateRandomString, hash } from '@/libs/utils'
import Administradores from '@/services/Administradores'
import { Next, Request, Response } from 'restify'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const password = generateRandomString()
      console.log('PASSWORD', password)
      req.body.password = hash(password)
      const admin = await Administradores.create(req.body)
      res.json(admin)
      next()
    } catch (error) {
      next(error)
    }
  },
}
