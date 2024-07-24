import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

export const useTasksStore = create(set => ({
	tasks: [],

	// id
	// name
	// isDone
	// date

	getTasksFromDB: async () => {
		try {
			const { data } = await axios.get(`${PREFIX}/api/tasks`, {
				withCredentials: true
			})
			set({
				tasks: [...data.tasks]
			})
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error(error.response?.data.message)
			}
		}
	},
	addTaskToDB: async ({ name, isDone, date }) => {
		try {
			const { data } = await axios.post(
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
			set(state => ({
				tasks: [...state.tasks, data.task]
			}))
			return data.task
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
