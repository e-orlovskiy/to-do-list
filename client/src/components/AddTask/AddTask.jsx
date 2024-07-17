import cn from 'classnames'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useTasksStore } from '../../../store/tasksStore'
import styles from './AddTask.module.css'

function AddTask() {
	const { addTaskToDB } = useTasksStore()
	const [taskName, setTaskName] = useState('')
	const [task, setTask] = useState({})

	const addTaskHandler = () => {
		setTask({
			name: taskName,
			isDone: false,
			date: new Date()
		})
		addTaskToDB(task)
	}

	return (
		<div className={cn(styles.addTaskContainer)}>
			<input
				value={taskName}
				type='text'
				className={cn(styles.addTaskInput)}
				onChange={e => setTaskName(e.target.value)}
			/>
			<button onClick={addTaskHandler} className={cn(styles.addTaskBtn)}>
				<IoMdAdd />
			</button>
		</div>
	)
}

export default AddTask
