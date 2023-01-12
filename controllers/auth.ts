import { hash } from '@/libs/utils'
import { crearToken, getPayload } from '@/libs/auth'
import Empresas from '@/services/Empresas'
import { Next, Request, Response } from 'restify'
import Administradores from '@/services/Administradores'
import { BadRequestError, NotFoundError } from 'restify-errors'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import Roles from '@/services/Roles'

export default {
  async get(req: Request, res: Response, next: Next) {
    try {
      console.log('DATOS SESION: ')
      const payload = getPayload(req as any, 'usuario')
      const empresa = await Empresas.findOne({ _id: payload.empresa })

      if (!empresa) {
        res.send(new NotFoundError('No se encontró la empresa'))
        return next()
      }
      const ModulosDefecto = JSON.parse(
        readFileSync(resolve('assets/modulos.json'), 'utf8'),
      )
      console.log('TOKEN: ', payload)
      console.log('MODULOS DEFECTO: ', ModulosDefecto)
      const usuario =
        empresa.usuarios.find((item) => item._id.equals(payload.usuario)) ||
        (await Administradores.findOne({ _id: payload.usuario }))

      if (!usuario) {
        res.send(new NotFoundError('No se encontró el usuario logueado'))
        return next()
      }
      console.log('USUARIO: ', usuario)
      res.send('SUCCESS')

      const rolActual = await Roles.findOne({ _id: usuario.rol })

      if (!rolActual) {
        res.send(new NotFoundError('No se encontró el rol asignado al usuario'))
        return next()
      }
      console.log('ROL ACTUAL:  ', rolActual)
      next()
    } catch (error) {
      next(error)
    }
  },
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
