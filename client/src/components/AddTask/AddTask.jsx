import cn from 'classnames'
import { useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useTasksStore } from '../../../store/tasksStore'
import styles from './AddTask.module.css'

function AddTask() {
	const { addTaskToDB } = useTasksStore()
	const [taskName, setTaskName] = useState('')

	const changeTaskHandler = e => {
		setTaskName(e.target.value)
	}

	const addTaskHandler = async () => {
		if (!taskName.trim()) return
		const res = await addTaskToDB({ name: taskName, isDone: false, date: new Date() })
		console.log(res)
		// if (task) {
		// 	console.log('task added')
		// 	useTasksStore.setState({ tasks: [...useTasksStore.getState().tasks, task] })
		// }
		setTaskName('')
	}

	return (
		<div className={cn(styles.addTaskContainer)}>
			<input
				value={taskName}
				type='text'
				onChange={changeTaskHandler}
				className={cn(styles.addTaskInput)}
			/>
			<button onClick={addTaskHandler} className={cn(styles.addTaskBtn)}>
				<IoMdAdd />
			</button>
		</div>
	)
}

export default AddTask
