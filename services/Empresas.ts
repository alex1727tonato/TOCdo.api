import { model, Schema } from 'mongoose'
import { Coleciones } from '@/libs/useFul'
import mongooseSmartQuery from 'mongoose-smart-query'
import Empresa, { EmpresaDocument, EmpresaModel } from '@/models/Empresas'

const schema = new Schema<EmpresaDocument, EmpresaModel>(Empresa)

schema.plugin(mongooseSmartQuery, {
  defaultFields: 'ruc nombre',
  fieldsForDefaultQuery: 'ruc nombre',
  defaultSort: 'ruc',
  pageQueryName: 'page',
  limitQueryName: 'limit',
  fieldsQueryName: 'fields',
  sortQueryName: 'sort',
  queryName: 'q',
})

const Empresas = model<EmpresaDocument, EmpresaModel>(
  Coleciones.EMPRESAS,
  schema,
)

export default Empresas
