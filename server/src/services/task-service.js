import { ApiError } from '../exceptions/api-errors.js'
import { TasksModel } from '../models/tasks-model.js'
import userService from './user-service.js'

class TaskService {
	async getTasks() {}

	async createTask(req) {
		const { task, refreshToken } = req
		console.log(task, refreshToken)
		const userData = await userService.checkAuth(refreshToken)
		console.log(userData)
		if (!userData) {
			throw ApiError.UnauthorizedError()
		}
		const foundedTask = await TasksModel.findOne({ user: userData.user.id })

		if (!foundedTask) {
			throw ApiError.BadRequest('На сервере что-то не так с задачами для этого пользователя')
		}
		// ?
		const taskInDB = await TasksModel.create({ ...task, user: userData.id })

		if (!taskInDB) throw ApiError.BadRequest('Не удалось создать задачу')

		return { message: 'Задача добавлена' }
	}

	async updateTask(task) {}

	async deleteTask(task) {}
}

export default new TaskService()
