import cn from 'classnames'
import styles from './Header.module.css'

import { useUserStore } from '../../../store/userStore'

function Header() {
	const { email, id } = useUserStore()

	return (
		<div className={cn(styles.header)}>
			<p className={cn(styles.id)}>{id}</p>
			<p className={cn(styles.email)}>{email}</p>
		</div>
	)
}

export default Header
