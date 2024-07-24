import cn from 'classnames'
import { MdDeleteForever } from 'react-icons/md'
import styles from './ToDoList.module.css'

import { useEffect } from 'react'
import { useTasksStore } from '../../../store/tasksStore'

function ToDoList() {
	const getTasksFromDB = useTasksStore(state => state.getTasksFromDB)
	const tasks = useTasksStore(state => state.tasks)

	useEffect(() => {
		getTasksFromDB()
	}, [getTasksFromDB])

	return (
		<div className={cn(styles.toDoList)}>
			<ul className={cn(styles.list)}>
				{tasks.map(task => (
					<li key={task._id}>
						<span>{task.name}</span>
						<div className={cn(styles.controls)}>
							<MdDeleteForever onClick={() => {}} />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ToDoList
