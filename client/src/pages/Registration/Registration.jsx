import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { IoIosLock, IoMdMail } from 'react-icons/io'
import { MdTextSnippet } from 'react-icons/md'
import { RiUser3Fill } from 'react-icons/ri'
import { useUserStore } from '../../../store/userStore'
import styles from './Registration.module.css'

function Registration() {
	const registration = useUserStore(state => state.registration)
	const [dragging, setDragging] = useState(false)
	const [fileName, setFileName] = useState('Аватар')
	const [email, setEmail] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [isEmailValid, setIsEmailValid] = useState(false)
	const [isPsswordsEqual, setIsPsswordsEqual] = useState(false)
	const fileInputRef = useRef(null)

	useEffect(() => {
		if (password === password2) {
			setIsPsswordsEqual(true)
		} else {
			setIsPsswordsEqual(false)
		}
	}, [password, password2])

	const submit = async e => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('email', e.target.email.value)
		formData.append('firstname', e.target.firstname.value)
		formData.append('lastname', e.target.lastname.value)
		formData.append('password', e.target.password.value)
		formData.append('avatar', fileInputRef.current)

		for (let pair of formData.entries()) {
			console.log(pair[0] + ': ' + pair[1])
		}

		await registration(formData)
	}

	const handleDragOver = e => {
		e.preventDefault()
		setDragging(true)
	}

	const handleDragLeave = () => {
		setDragging(false)
	}

	const handleDrop = e => {
		e.preventDefault()
		setDragging(false)
		const file = e.dataTransfer.files[0]
		fileInputRef.current = file
		setFileName(file.name)
	}

	const handleFileInputChange = e => {
		const files = e.target.files
		if (files.length > 0) {
			setFileName(files[0].name)
			fileInputRef.current = files[0]
		}
	}

	const handleFileLabelClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value)
	}

	const handlePasswordChange2 = e => {
		setPassword2(e.target.value)
	}

	const validateEmail = email => {
		if (/.+@.+\.[A-Za-z]+$/.test(email)) {
			setIsEmailValid(true)
		} else {
			setIsEmailValid(false)
		}
	}

	return (
		<div className={cn(styles.registration)}>
			<div className={cn(styles['registration-container'])}></div>
			<form onSubmit={submit} className={cn(styles['form'])}>
				<h2>Регистрация</h2>
				<label
					htmlFor='email'
					className={cn({ [styles['invalid']]: !isEmailValid && email })}
				>
					<IoMdMail />
					<input
						name='email'
						type='text'
						placeholder='Электронная почта'
						value={email}
						onChange={e => {
							setEmail(e.target.value)
							validateEmail(email)
						}}
					/>
				</label>
				<div className={cn(styles['firstname-and-lastname'])}>
					<label htmlFor='firstname'>
						<MdTextSnippet />
						<input
							name='firstname'
							type='text'
							placeholder='Имя'
							value={firstname}
							onChange={e => setFirstname(e.target.value)}
						/>
					</label>
					<label htmlFor='email'>
						<MdTextSnippet />
						<input
							name='lastname'
							type='text'
							placeholder='Фамилия'
							value={lastname}
							onChange={e => setLastname(e.target.value)}
						/>
					</label>
				</div>
				<div
					className={cn(styles['file-drop-area'], {
						[styles['is-active']]: dragging
					})}
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
				<label
					htmlFor='password'
					className={cn({ [styles['invalid']]: !isPsswordsEqual && password2 })}
				>
					<IoIosLock />
					<input
						name='password'
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={handlePasswordChange}
					/>
				</label>
				<label
					htmlFor='password-repeat'
					className={cn({ [styles['invalid']]: !isPsswordsEqual && password })}
				>
					<IoIosLock />
					<input
						name='password-repeat'
						type='password'
						placeholder='Пароль ещё раз'
						value={password2}
						onChange={handlePasswordChange2}
					/>
				</label>
				<button type='submit'>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default Registration
