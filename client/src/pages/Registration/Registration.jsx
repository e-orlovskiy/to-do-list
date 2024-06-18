import { useUserStore } from '../../../store/userStore'

function Registration() {
	const registration = useUserStore(state => state.registration)

	const submit = async e => {
		e.preventDefault()

		const email = e.target.email.value
		const password = e.target.password.value

		await registration(email, password)
	}

	return (
		<div>
			<h2>Registration</h2>
			<form onSubmit={submit}>
				<input name='email' type='text' placeholder='Email' />
				<input name='password' type='password' placeholder='Password' />
				<button type='submit'>Registration</button>
			</form>
		</div>
	)
}

export default Registration
