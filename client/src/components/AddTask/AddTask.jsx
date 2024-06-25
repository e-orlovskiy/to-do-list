import cn from 'classnames'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useTasksStore } from '../../../store/tasksStore'
import styles from './AddTask.module.css'

function AddTask() {
	const { addTaskToStore } = useTasksStore()
	const [task, setTask] = useState('')

	const addTask = () => {
		addTaskToStore(task)
		setTask('')
	}

	return (
		<div className={cn(styles.addTaskContainer)}>
			<input
				value={task}
				type='text'
				className={cn(styles.addTaskInput)}
				onChange={e => setTask(e.target.value)}
			/>
			<button onClick={addTask} className={cn(styles.addTaskBtn)}>
				<IoMdAdd />
			</button>
		</div>
	)
}

export default AddTask
