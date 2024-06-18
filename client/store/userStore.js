import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

export const useUserStore = create(set => ({
	email: '',
	id: '',
	isActivated: false,

	login: async (email, password) => {
		try {
			const { data } = await axios.post(`${PREFIX}/api/login`, {
				email,
				password
			})
			set({
				email: data.user.email,
				id: data.user.id,
				isActivated: data.user.isActivated
			})
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	},

	registration: async (email, password) => {
		try {
			await axios.post(`${PREFIX}/api/registration`, {
				email,
				password
			})
		} catch (err) {
			if (err instanceof AxiosError) {
				throw new Error(err.response?.data.message)
			}
		}
	}
}))
