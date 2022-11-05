import { generateRandomString, hash } from '@/libs/utils'
import Usuarios from '@/services/Usuarios'
import { Next, Request, Response } from 'restify'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const password = generateRandomString()
      req.body.password = hash(password)
      const usuario = await Usuarios.create(req.body)
      res.json(usuario)
      next()
    } catch (error) {
      next(error)
    }
  },
}
