import Empresas from '@/services/Empresas'
import { Next, Request, Response } from 'restify'
import { generateRandomString, hash } from '@/libs/utils'
import { BadRequestError, NotFoundError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      console.log('CREANDO EMPRESA: ')
      const { nombre, ruc } = req.body

      if (!nombre || !ruc) {
        res.send(
          new BadRequestError('No se proporciono la información necesaria'),
        )
        return next()
      }

      const empresaExistente = await Empresas.findOne({ ruc })

      if (empresaExistente) {
        res.send(
          new BadRequestError(`Ya existe una empresa con el RUC: ${ruc}`),
        )
        return next()
      }

      const empresa = await Empresas.create(req.body)

      res.json(empresa)
      next()
    } catch (error) {
      next(error)
    }
  },
  async postUsuario(req: Request, res: Response, next: Next) {
    try {
      const { nombre, username, email, rol } = req.body

      const empresa = await Empresas.findOne({ _id: req.payload.empresa })
      if (!empresa) {
        res.send(new NotFoundError('No se encontro la empresa'))
        next()
      }
      if (empresa.usuarios.find((usuario) => usuario.username === username)) {
        res.send(new BadRequestError('Ya existe el nombre de usuario'))
        next()
      }
      const password = generateRandomString()
      console.log(password)
      const usuario = empresa.usuarios.create({
        nombre,
        username,
        password: hash(password),
        email,
        rol,
      })
      empresa.usuarios.push(usuario)
      await empresa.save()
      res.send(usuario)
      next()
    } catch (error) {
      next(error)
    }
  },
}
