import { Document, Model, SchemaDefinition, Types } from 'mongoose'

interface Usuario {
  _id: Types.ObjectId
  nombre: string
  username: string
  password: string
  tipo: '1' | '2' | '3'
  email: string
}

const Usuario: SchemaDefinition<Usuario> = {
  nombre: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['1', '2', '3'], required: true },
  email: { type: String, required: true },
}

export type UsuarioDocument = Document<Types.ObjectId> & Usuario

export type UsuarioModel = Model<UsuarioDocument>

export default Usuario
