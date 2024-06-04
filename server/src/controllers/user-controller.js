import 'dotenv/config'
import userService from '../services/user-service.js'

class UserController {
	async registration(req, res) {
		try {
			const { email, password } = req.body
			const userData = await userService.registration(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000, //30 дней
				httpOnly: true
			})
			return res.json(userData)
		} catch (err) {
			console.log(err)
		}
	}

	async login(req, res) {}
	async logout(req, res) {}

	async activate(req, res) {
		const activationLink = req.params.link
		try {
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (err) {
			console.log(err)
		}
	}

	async refresh(req, res) {}
	// получать что-нибудь
}

export default new UserController()
