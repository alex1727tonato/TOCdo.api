import Roles from '@/services/Roles'
import { Next, Request, Response } from 'restify'
import { BadRequestError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      if (req.body?.modulos?.length === 0) {
        res.send(new BadRequestError('Deben existir modulos'))
        next()
      }
      if (req.body?.acciones?.length === 0) {
        res.send(new BadRequestError('Deben existir acciones'))
        next()
      }
      const rol = await Roles.create(req.body)
      res.json(rol)
      next()
    } catch (error) {
      next(error)
    }
  },
}
