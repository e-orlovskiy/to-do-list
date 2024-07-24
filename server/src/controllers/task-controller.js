import taskService from '../services/task-service.js'

class TaskController {
	async getTasks(req, res, next) {
		try {
			const allTasks = await taskService.getTasks(req.cookies.refreshToken)
			return res.json(allTasks)
		} catch (err) {
			next(err)
		}
	}

	async createTask(req, res, next) {
		try {
			const result = await taskService.createTask({
				task: { ...req.body },
				refreshToken: req.cookies.refreshToken
			})
			return res.json(result)
		} catch (err) {
			next(err)
		}
	}

	async updateTask(req, res, next) {
		try {
		} catch (err) {
			next(err)
		}
	}

	async deleteTask(req, res, next) {
		try {
			// service
		} catch (err) {
			next(err)
		}
	}
}

export default new TaskController()
