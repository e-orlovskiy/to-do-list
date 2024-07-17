import cn from 'classnames'
import { useRef, useState } from 'react'
import { IoIosLock, IoMdMail } from 'react-icons/io'
import { MdTextSnippet } from 'react-icons/md'
import { RiUser3Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../store/userStore'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import InputField from '../../components/InputField/InputField'
import styles from './Registration.module.css'

function Registration() {
	const [dragging, setDragging] = useState(false)
	const [fileName, setFileName] = useState('Аватар')
	const [email, setEmail] = useState('')
	const [avatar, setAvatar] = useState(null)
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [isEmailValid, setIsEmailValid] = useState(false)
	const [isFirstnameValid, setIsFirstnameValid] = useState(false)
	const [isLastnameValid, setIsLastnameValid] = useState(false)
	const [isAvatarValid, setIsAvatarValid] = useState(false)
	const [isPasswordValid, setIsPasswordValid] = useState(false)
	const [isPassword2Valid, setIsPassword2Valid] = useState(false)
	const fileInputRef = useRef(null)

	const registration = useUserStore(state => state.registration)
	const errorText = useUserStore(state => state.errorText)
	const navigate = useNavigate()

	const submit = async e => {
		e.preventDefault()

		if (
			!isEmailValid ||
			!isFirstnameValid ||
			!isLastnameValid ||
			!isPasswordValid ||
			!isPassword2Valid ||
			!avatar
		) {
			useUserStore.setState({ errorText: 'Заполните все поля' })
			setTimeout(() => useUserStore.setState({ errorText: null }), 5000)
			return
		}

		const formData = new FormData()
		formData.append('email', e.target.email.value)
		formData.append('firstname', e.target.firstname.value)
		formData.append('lastname', e.target.lastname.value)
		formData.append('password', e.target.password.value)
		formData.append('avatar', avatar)

		const result = await registration(formData)
		if (result) navigate('/')
	}

	const handleDragOver = e => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragLeave = () => {
		setDragging(false)
	}

	const validateFile = file => {
		const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
		const maxSize = 5 * 1024 * 1024 // 5 MB

		if (!allowedTypes.includes(file.type)) {
			useUserStore.setState({ errorText: 'Недопустимый тип файла аватарки' })
			setTimeout(() => useUserStore.setState({ errorText: null }), 3000)
			setIsAvatarValid(false)
			return false
		}
		if (file.size > maxSize) {
			useUserStore.setState({ errorText: 'Слишком большой файл аватарки' })
			setTimeout(() => useUserStore.setState({ errorText: null }), 3000)
			setIsAvatarValid(false)
			return false
		}

		useUserStore.setState({ errorText: null })
		setIsAvatarValid(true)
		return true
	}

	const handleDrop = e => {
		e.preventDefault()
		setDragging(false)
		const file = e.dataTransfer.files[0]

		if (validateFile(file)) {
			setAvatar(file)
			setFileName(file.name)
		} else {
			setAvatar(null)
			setFileName('Аватар')
		}
	}

	const handleFileInputChange = e => {
		const file = e.target.files[0]

		if (validateFile(file)) {
			setAvatar(file)
			setFileName(file.name)
		} else {
			setAvatar(null)
			setFileName('Аватар')
		}
	}

	const handleFileLabelClick = () => {
		fileInputRef.current.click()
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value)
		validatePasswords(e.target.value, password2)
	}

	const handlePassword2Change = e => {
		setPassword2(e.target.value)
		validatePasswords(password, e.target.value)
	}

	const validateEmail = email => {
		if (/.+@.+\.[A-Za-z]+$/.test(email) && email.length) {
			setIsEmailValid(true)
		} else {
			setIsEmailValid(false)
		}
	}

	const validateName = (field, name) => {
		if (name.length < 3 || name.length > 32) {
			if (field === 'firstname') setIsFirstnameValid(false)
			if (field === 'lastname') setIsLastnameValid(false)
		} else {
			if (field === 'firstname') setIsFirstnameValid(true)
			if (field === 'lastname') setIsLastnameValid(true)
		}
	}

	const validatePasswords = (password, password2) => {
		if (password.length > 3 && password.length < 16) {
			setIsPasswordValid(true)
			if (password != password2) {
				setIsPassword2Valid(false)
			} else {
				setIsPassword2Valid(true)
			}
		} else {
			setIsPasswordValid(false)
			setIsPassword2Valid(false)
		}
	}

	const handleEmailChange = e => {
		setEmail(e.target.value)
		validateEmail(e.target.value)
	}

	const handleNameChange = e => {
		if (e.target.name === 'firstname') setFirstname(e.target.value)
		if (e.target.name === 'lastname') setLastname(e.target.value)

		validateName(e.target.name, e.target.value)
	}

	return (
		<div className={cn(styles.registration)}>
			<div className={cn(styles['registration-container'])}></div>
			<form onSubmit={submit} className={cn(styles['form'])}>
				<h2>Регистрация</h2>
				<InputField
					icon={IoMdMail}
					type='text'
					name='email'
					placeholder='Электронная почта'
					value={email}
					onChange={handleEmailChange}
					isValid={isEmailValid}
				/>
				<div className={cn(styles['firstname-and-lastname'])}>
					<InputField
						icon={MdTextSnippet}
						type='text'
						name='firstname'
						placeholder='Имя'
						value={firstname}
						onChange={handleNameChange}
						isValid={isFirstnameValid}
					/>
					<InputField
						icon={MdTextSnippet}
						type='text'
						name='lastname'
						placeholder='Фамилия'
						value={lastname}
						onChange={handleNameChange}
						isValid={isLastnameValid}
					/>
				</div>
				<div
					className={cn(
						styles['file-drop-area'],
						{
							[styles['is-active']]: dragging
						},
						{ [styles['invalid']]: !isAvatarValid }
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					onClick={handleFileLabelClick}
				>
					<RiUser3Fill />
					<span className={styles['file-msg']}>{fileName}</span>
					<input
						ref={fileInputRef}
						name='avatar'
						type='file'
						className={styles['file-input']}
						onChange={handleFileInputChange}
					/>
				</div>
				<InputField
					icon={IoIosLock}
					type='password'
					name='password'
					placeholder='Пароль'
					value={password}
					onChange={handlePasswordChange}
					isValid={isPasswordValid}
				/>
				<InputField
					icon={IoIosLock}
					type='password'
					name='password2'
					placeholder='Повторите пароль'
					value={password2}
					onChange={handlePassword2Change}
					isValid={isPassword2Valid}
				/>
				{errorText && <ErrorMessage message={errorText} />}
				<button type='submit'>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default Registration
