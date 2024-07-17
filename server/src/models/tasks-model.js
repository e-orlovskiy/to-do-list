import { Schema, model } from 'mongoose'

const TasksSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
	tasks: { type: [{ name: String, isDone: Boolean, date: Date }], default: [] }
})

export const TasksModel = model('Task', TasksSchema)
