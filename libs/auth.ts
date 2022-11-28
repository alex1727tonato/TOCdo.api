import moment from 'moment'
import { decode, encode } from 'jwt-simple'
import { BadRequestError, RequestExpiredError } from 'restify-errors'

function getSecret(type: string): string {
  switch (type) {
    case 'admin':
      return '@dMIN'
    case 'usuario':
      return '0dc0T-Za1d-yr09er9-0tan0T-r3dnax31A-@v!'
  }
}

function getToken(req: any, type: string): string {
  const cookie = type === 'usuario' ? 'katggadr' : 'anbduceimn'
  const token =
    req.header('Authorization') ||
    (req.cookies ? req.cookies[cookie] : undefined)
  if (!token) {
    throw new BadRequestError('No se proporcionó el token')
  }
  return token
}

export function getPayload(req: Request, type: string): any {
  let payload: any
  const token = getToken(req, type)
  try {
    payload = decode(token, getSecret(type))
  } catch (e) {
    throw new BadRequestError('Error al decodificar el token')
  }
  if (payload.endDate) {
    const minutes = moment(payload.endDate).diff(new Date())
    if (minutes < 0) {
      throw new RequestExpiredError('El token ha expirado')
    }
    payload.endDate = new Date(payload.endDate).toISOString()
  }
  return payload
}

export function crearToken(data: any): string {
  const expiration = moment().add(6, 'days').endOf('day')
  const payload = {
    ...data,
    date: new Date().getTime(),
    endDate: expiration.toDate().getTime(),
  }
  return encode(payload, '0dc0T-Za1d-yr09er9-0tan0T-r3dnax31A-@v!')
}

export async function middlewareUsuario(req: any, res: any, next: any) {
  try {
    if (req.path().includes('/get-options')) {
      return next()
    }
    const payload = getPayload(req, 'usuario')
    req.payload = payload
    next()
  } catch (err) {
    next(err)
  }
}
