import { Router } from 'express'
import { body } from 'express-validator'
import userController from '../controllers/user-controller.js'
import { upload } from '../middlewares/multer-middleware.js'

const router = Router()

router.post(
	'/registration',
	upload.single('avatar'),
	[
		body('email').isEmail(),
		body('password').isLength({ min: 3, max: 32 }),
		body('firstname').isLength({ min: 3, max: 32 }),
		body('lastname').isLength({ min: 3, max: 32 })
	],
	userController.registration
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/checkAuth', userController.checkAuth)
// router.get('/test', userController.refresh)

export default router
