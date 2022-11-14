import { hash } from '@/libs/utils'
import { crearToken } from '@/libs/auth'
import Empresas from '@/services/Empresas'
import { Next, Request, Response } from 'restify'
import { BadRequestError, NotFoundError } from 'restify-errors'
import Administradores from '@/services/Administradores'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const { username, password, idEmpresa } = req.body
      if (!username || !password) {
        res.send(
          new BadRequestError('No se proporciono el usuario y contraseña'),
        )
        return next()
      }
      const empresa = await Empresas.findOne({ _id: idEmpresa })
      if (!empresa) {
        res.send(new NotFoundError('No se encontro la empresa'))
        next()
      }

      const usuario = empresa.usuarios.find(
        (usuario) => usuario.username === username,
      )
      const [administrador] = await Administradores.aggregate([
        {
          $match: {
            $and: [
              { username },
              {
                $or: [
                  { type: 'master' },
                  { type: 'super', businesses: empresa._id },
                ],
              },
            ],
          },
        },
      ])
      if (!usuario && !administrador) {
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
          empresa: empresa._id,
          usuario: usuario._id,
        }),
      })
      next()
    } catch (error) {
      next(error)
    }
  },
}
