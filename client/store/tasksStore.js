import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

// uuid для id задач

export const useTasksStore = create(set => ({
	tasks: [],

	addTaskToDB: async ({ name, isDone, date }) => {
		console.log(name, isDone, date)
		try {
			const { res } = await axios.post(
				`${PREFIX}/api/tasks`,
				{
					name,
					isDone,
					date
				},
				{
					withCredentials: true
				}
			)
			set({
				tasks: [...set.tasks, { name, isDone, date }]
			})
			return res
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	},
	// пока что удаление по названию
	deleteTaskFromStore: task => {
		set(state => ({
			tasks: state.tasks.filter(t => t !== task)
		}))
	}
}))
