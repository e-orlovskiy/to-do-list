import 'dotenv/config'
import { validationResult } from 'express-validator'
import { ApiError } from '../exceptions/api-errors.js'
import { deleteFileOnError } from '../middlewares/multer-middleware.js'
import userService from '../services/user-service.js'

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				deleteFileOnError(req, res, next)
				return next(ApiError.BadRequest('Некорректные данные', errors.array()))
			}
			const { email, password, firstname, lastname } = req.body
			const avatarPath = req.file ? req.file.path : null
			const userData = await userService.registration(
				email,
				password,
				firstname,
				lastname,
				avatarPath
			)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 дней
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			deleteFileOnError(req, res, next)
			next(err)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 дней
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.status(200).json(token)
		} catch (err) {
			next(err)
		}
	}

	async activate(req, res, next) {
		const activationLink = req.params.link
		try {
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (err) {
			next(err)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 дней
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}

	async checkAuth(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.checkAuth(refreshToken)
			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}
}

export default new UserController()
