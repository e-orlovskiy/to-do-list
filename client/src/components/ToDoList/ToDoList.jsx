import cn from 'classnames'
import { MdDeleteForever } from 'react-icons/md'
import styles from './ToDoList.module.css'

import { useTasksStore } from '../../../store/tasksStore'

function ToDoList() {
	const tasks = useTasksStore(state => state.tasks)
	const deleteTaskFromStore = useTasksStore(state => state.deleteTaskFromStore)

	const deleteTask = task => {
		deleteTaskFromStore(task)
	}

	return (
		<div className={cn(styles.toDoList)}>
			<ul className={cn(styles.list)}>
				{tasks.map((task, index) => (
					<li key={task + index}>
						<span>{task}</span>
						<div className={cn(styles.controls)}>
							{/* Пока что удаляем по названием, в дальнейшем исправить на id */}
							<MdDeleteForever onClick={() => deleteTask(task)} />
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ToDoList
