import taskService from '../services/task-service.js'

class TaskController {
	async getTasks(req, res, next) {
		try {
			// service
		} catch (err) {
			next(err)
		}
	}

	async createTask(req, res, next) {
		console.log(req.body, req.cookies.refreshToken)
		try {
			taskService.createTask({ task: { ...req.body }, refreshToken: req.cookies.refreshToken })
		} catch (err) {
			next(err)
		}
	}

	async updateTask(req, res, next) {
		try {
			// service
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
