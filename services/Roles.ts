import { Coleciones } from '@/libs/useFul'
import Rol, { RolDocument, RolModel } from '@/models/Roles'
import { model, Schema } from 'mongoose'
import mongooseSmartQuery from 'mongoose-smart-query'

const schema = new Schema<RolDocument, RolModel>(Rol)

schema.plugin(mongooseSmartQuery, {
  defaultFields: 'nombre descripcion',
  fieldsForDefaultQuery: 'nombre descripcion',
  defaultSort: 'nombre',
  pageQueryName: 'page',
  limitQueryName: 'limit',
  fieldsQueryName: 'fields',
  sortQueryName: 'sort',
  queryName: 'q',
})

const Roles = model<RolDocument, RolModel>(Coleciones.ROLES, schema)

export default Roles
