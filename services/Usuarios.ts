import { Coleciones } from '@/libs/useFul'
import Usuario, { UsuarioDocument, UsuarioModel } from '@/models/Usuarios'
import { model, Schema } from 'mongoose'
import mongooseSmartQuery from 'mongoose-smart-query'

const schema = new Schema<UsuarioDocument, UsuarioModel>(Usuario)

schema.plugin(mongooseSmartQuery, {
  defaultFields: 'codigo nombre valor',
  fieldsForDefaultQuery: 'codigo nombre valor',
  defaultSort: 'codigo',
  pageQueryName: 'page',
  limitQueryName: 'limit',
  fieldsQueryName: 'fields',
  sortQueryName: 'sort',
  queryName: 'q',
})

const Usuarios = model<UsuarioDocument, UsuarioModel>(
  Coleciones.USUARIOS,
  schema,
)

export default Usuarios
