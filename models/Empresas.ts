import { Coleciones } from '@/libs/useFul'
import {
  Document,
  Model,
  Schema,
  SchemaDefinition,
  SchemaTypes,
  Types,
} from 'mongoose'

interface Usuario extends Types.Subdocument {
  nombre: string
  username: string
  password: string
  email: string
  rol?: Types.ObjectId
}

const Usuario = new Schema<Usuario>({
  nombre: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  rol: { type: SchemaTypes.ObjectId, required: true, ref: Coleciones.ROLES },
})

interface Empresa {
  _id: Types.ObjectId
  nombre: string
  ruc: string
  usuarios: Types.DocumentArray<Usuario>
}

const Empresa: SchemaDefinition<Empresa> = {
  nombre: { type: String, required: true },
  ruc: { type: String, required: true },
  usuarios: [Usuario],
}

export type EmpresaDocument = Document<Types.ObjectId> & Empresa

export type EmpresaModel = Model<EmpresaDocument>

export default Empresa
