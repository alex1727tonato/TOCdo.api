import { hash } from '@/libs/utils'
import Usuarios from '@/services/Usuarios'
import { Next, Request, Response } from 'restify'
import { BadRequestError, NotFoundError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      console.log('POST DE USUARIO')
      const { username, password } = req.body
      if (!username || !password) {
        res.send(
          new BadRequestError('No se proporciono el usuario y contraseña'),
        )
        return next()
      }
      console.log('BUSCANDO USUARIO: ', username)
      const usuario = await Usuarios.findOne({ username })
      if (!usuario) {
        res.send(new NotFoundError('No se encontro el usuario'))
        return next()
      }
      console.log('USUARIO: ', usuario)
      console.log(usuario.password)
      console.log(hash(password))
      if (!(usuario?.password === hash(password))) {
        res.send(new BadRequestError('La contraseña es incorrecta.'))
        return next()
      }
      res.json(usuario)
      next()
    } catch (error) {
      next(error)
    }
  },
}
