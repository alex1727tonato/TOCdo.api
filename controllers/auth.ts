import { hash } from '@/libs/utils'
import { crearToken } from '@/libs/auth'
import Empresas from '@/services/Empresas'
import { Next, Request, Response } from 'restify'
import Administradores from '@/services/Administradores'
import { BadRequestError, NotFoundError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const { username, password, ruc } = req.body
      if (!username || !password) {
        res.send(
          new BadRequestError('No se proporciono el usuario y contraseña'),
        )
        return next()
      }
      const empresa = await Empresas.findOne({ ruc })
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
                  { tipo: 'master' },
                  { tipo: 'super', empresas: empresa._id },
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
      if (
        !(
          usuario?.password === hash(password) ||
          administrador?.password === hash(password)
        )
      ) {
        res.send(new BadRequestError('La contraseña es incorrecta.'))
        return next()
      }
      res.json({
        nombre: usuario ? usuario.nombre : administrador.nombre,
        usuario: usuario ? usuario.username : administrador.username,
        token: crearToken({
          empresa: empresa._id,
          usuario: usuario ? usuario._id : administrador._id,
        }),
      })
      next()
    } catch (error) {
      next(error)
    }
  },
}
