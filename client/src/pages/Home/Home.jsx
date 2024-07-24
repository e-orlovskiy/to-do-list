import cn from 'classnames'

import AddTask from '../../components/AddTask/AddTask'
import Categories from '../../components/Categories/Categories'
import Header from '../../components/Header/Header'
import ToDoList from '../../components/ToDoList/ToDoList'
import styles from './Home.module.css'

function Home() {
	return (
		<div className={cn(styles.home)}>
			<Header />
			<div className={cn(styles['to-do-list-container'])}>
				<Categories />
				<div className={cn(styles.tasks)}>
					<AddTask />
					<ToDoList />
				</div>
			</div>
		</div>
	)
}

export default Home
