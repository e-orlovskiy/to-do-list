import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import errorMiddleware from './middlewares/error-middleware.js'
import router from './router/index.js'

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const app = express()

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
	res.send('Hello')
})

const start = async () => {
	try {
		await mongoose.connect(MONGO_URL)
		app.listen(PORT, () => console.log(`server started on port: ${PORT}`))
	} catch (err) {
		console.log(err)
	}
}

start()
