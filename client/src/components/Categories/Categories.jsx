import cn from 'classnames'
import styles from './Categories.module.css'

function Categories() {
	return (
		<div className={cn(styles.categories)}>
			<h2>Categories</h2>
			<ul>
				<li>Category 1</li>
				<li>Category 2</li>
				<li>Category 3</li>
			</ul>
		</div>
	)
}

export default Categories
