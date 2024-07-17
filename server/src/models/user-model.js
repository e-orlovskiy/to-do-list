import { Schema, model } from 'mongoose'
import { TasksModel } from './tasks-model.js'

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	avatar: { type: String },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String }
})

UserSchema.post('save', async function (doc) {
	try {
		await TasksModel.create({ user: doc._id })
	} catch (error) {
		console.error('error while creating tasks for user', error)
		throw error
	}
})

export const UserModel = model('User', UserSchema)
