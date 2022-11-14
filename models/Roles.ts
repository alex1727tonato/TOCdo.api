import { Document, Model, SchemaDefinition, Types } from 'mongoose'

interface Rol {
  _id: Types.ObjectId
  nombre: string
  descripcion?: string
  modulos: Types.Array<string>
  acciones: Types.Array<string>
}

const Rol: SchemaDefinition<Rol> = {
  nombre: { type: String, required: true },
  descripcion: String,
  modulos: [String],
  acciones: [String],
}

export type RolDocument = Document<Types.ObjectId> & Rol

export type RolModel = Model<RolDocument>

export default Rol
