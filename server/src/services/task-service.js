import { ApiError } from '../exceptions/api-errors.js'
import { TasksModel } from '../models/tasks-model.js'
import { TokenModel } from '../models/token-model.js'
import userService from './user-service.js'

class TaskService {
	// получение
	async getTasks(refreshToken) {
		const userData = await userService.checkAuth(refreshToken)

		if (!userData) throw ApiError.UnauthorizedError()

		const user = await TokenModel.findOne({ refreshToken })
		if (!user) throw ApiError.UnauthorizedError()

		const userId = user.user
		const userTasks = await TasksModel.findOne({ user: userId }, 'tasks -_id')
		if (!userTasks) throw ApiError.BadRequest('Задачи не найдены')

		return userTasks
	}

	// создание
	async createTask(req) {
		const { task, refreshToken } = req
		const userData = await userService.checkAuth(refreshToken)

		if (!userData) throw ApiError.UnauthorizedError()

		const foundedTask = await TasksModel.findOne({
			user: userData.user.id
		})

		if (!foundedTask) {
			throw ApiError.BadRequest(
				'На сервере что-то не так с задачами для этого пользователя'
			)
		}

		const taskInDB = await TasksModel.findByIdAndUpdate(
			foundedTask._id,
			{ $push: { tasks: task } },
			{ new: true }
		)

		if (!taskInDB || !taskInDB.tasks || taskInDB.tasks.length === 0) {
			throw ApiError.BadRequest('Не удалось создать задачу')
		}

		const taskId = taskInDB.tasks[taskInDB.tasks.length - 1]._id

		return {
			message: 'Задача успешно добавлена',

			task: {
				_id: taskId,
				...task
			}
		}
	}

	// обновление
	async updateTask(task) {}

	// удаление
	async deleteTask(task) {}
}

export default new TaskService()
