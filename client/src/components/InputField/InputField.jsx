import cn from 'classnames'
import PropTypes from 'prop-types'
import styles from './InputField.module.css'

function InputField({
	icon: Icon,
	type,
	name,
	placeholder,
	value,
	onChange,
	isValid
}) {
	return (
		<label
			htmlFor={name}
			className={cn(styles['inputField'], { [styles['invalid']]: !isValid })}
		>
			<Icon className={cn(styles['icon'])} />
			<input
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</label>
	)
}

// proptypes
InputField.propTypes = {
	icon: PropTypes.elementType.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	isValid: PropTypes.bool
}

export default InputField
