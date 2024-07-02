import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	avatar: { type: String },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String }
})

export const UserModel = model('User', UserSchema)
