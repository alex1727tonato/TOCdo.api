import { Document, Model, Schema, SchemaDefinition, Types } from 'mongoose'

export interface Submodulo extends Types.Subdocument {
  key: string
  acciones: string[]
}

export const Submodulo = new Schema<Submodulo>(
  {
    key: { type: String, required: true },
    acciones: { type: [String], required: true },
  },
  { _id: false },
)

interface Rol {
  _id: Types.ObjectId
  nombre: string
  descripcion?: string
  modulos: Types.Array<{
    modulo: string
    submodulos: Types.Array<Submodulo>
  }>
}

const Rol: SchemaDefinition<Rol> = {
  nombre: { type: String, required: true },
  descripcion: String,
  modulos: [
    new Schema(
      {
        modulo: { type: String, required: true },
        submodulos: [Submodulo],
      },
      { _id: false },
    ),
  ],
}

export type RolDocument = Document<Types.ObjectId> & Rol

export type RolModel = Model<RolDocument>

export default Rol
