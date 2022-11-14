import Empresas from '@/services/Empresas'
import { Next, Request, Response } from 'restify'
import { generateRandomString, hash } from '@/libs/utils'
import { BadRequestError, NotFoundError } from 'restify-errors'

export default {
  async post(req: Request, res: Response, next: Next) {
    try {
      const { nombre, username, email } = req.body

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
      const usuario = empresa.usuarios.create({
        nombre,
        username,
        password: hash(password),
        email,
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
