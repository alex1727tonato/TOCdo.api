import { Document, Model, SchemaDefinition, SchemaTypes, Types } from 'mongoose'

interface Administrador {
  _id: Types.ObjectId
  nombre: string
  username: string
  password: string
  tipo: 'master' | 'super'
  email: string
  empresas: Types.Array<Types.ObjectId>
  rol?: Types.ObjectId
}

const Administrador: SchemaDefinition<Administrador> = {
  nombre: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['master', 'super'], required: true },
  email: { type: String, required: true },
  empresas: [{ type: SchemaTypes.ObjectId, required: true }],
  rol: { type: SchemaTypes.ObjectId },
}

export type AdministradorDocument = Document<Types.ObjectId> & Administrador

export type AdministradorModel = Model<AdministradorDocument>

export default Administrador
