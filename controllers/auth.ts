import { crearToken } from '@/libs/auth'
import { hash } from '@/libs/utils'
import Usuarios from '@/services/Usuarios'
import { Next, Request, Response } from 'restify'
import { BadRequestError, NotFoundError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const { username, password } = req.body
      if (!username || !password) {
        res.send(
          new BadRequestError('No se proporciono el usuario y contraseña'),
        )
        return next()
      }
      const usuario = await Usuarios.findOne({ username })
      if (!usuario) {
        res.send(new NotFoundError('No se encontro el usuario'))
        return next()
      }
      if (!(usuario?.password === hash(password))) {
        res.send(new BadRequestError('La contraseña es incorrecta.'))
        return next()
      }
      res.json({
        nombre: usuario.nombre,
        usuario: usuario.username,
        token: crearToken({
          usuario: usuario._id,
          tipo: usuario.tipo,
        }),
      })
      next()
    } catch (error) {
      next(error)
    }
  },
}
