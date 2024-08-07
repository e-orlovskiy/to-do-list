import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/userStore'

function Login() {
	const login = useUserStore(state => state.login)
	const emailFromStore = useUserStore(state => state.email)
	const navigate = useNavigate()

	const submit = async e => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value

		const result = await login(email, password)
		if (result) navigate('/')
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={submit}>
				<input name='email' type='text' placeholder='Email' />
				<input name='password' type='password' placeholder='Password' />
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login
