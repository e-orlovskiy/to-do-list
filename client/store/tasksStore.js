import { create } from 'zustand'

export const useTasksStore = create(set => ({
	tasks: [],

	addTaskToStore: task => {
		set(state => ({
			tasks: [...state.tasks, task]
		}))
	},
	// пока что удаление по названию
	deleteTaskFromStore: task => {
		set(state => ({
			tasks: state.tasks.filter(t => t !== task)
		}))
	}
}))
