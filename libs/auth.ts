import moment from 'moment'
import { encode } from 'jwt-simple'

export function crearToken(data: any): string {
  const expiration = moment().add(6, 'days').endOf('day')
  const payload = {
    ...data,
    date: new Date().getTime(),
    endDate: expiration.toDate().getTime(),
  }
  return encode(payload, '0dc0T-Za1d-yr09er9-0tan0T-r3dnax31A-@v!')
}
