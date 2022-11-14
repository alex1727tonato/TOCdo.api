import { Coleciones } from '@/libs/useFul'
import Administrador, {
  AdministradorDocument,
  AdministradorModel,
} from '@/models/Administradores'
import { model, Schema } from 'mongoose'
import mongooseSmartQuery from 'mongoose-smart-query'

const schema = new Schema<AdministradorDocument, AdministradorModel>(
  Administrador,
)

schema.plugin(mongooseSmartQuery, {
  defaultFields: 'nombre tipo username',
  fieldsForDefaultQuery: 'nombre tipo username',
  defaultSort: 'nombre',
  pageQueryName: 'page',
  limitQueryName: 'limit',
  fieldsQueryName: 'fields',
  sortQueryName: 'sort',
  queryName: 'q',
})

const Administradores = model<AdministradorDocument, AdministradorModel>(
  Coleciones.ADMINISTRADORES,
  schema,
)

export default Administradores
