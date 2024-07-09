import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import { PREFIX } from '../src/config/api.config'

export const useUserStore = create(set => ({
	email: '',
	id: '',
	isActivated: false,
	errorText: null,

	login: async (email, password) => {
		try {
			const { data } = await axios.post(
				`${PREFIX}/api/login`,
				{
					email,
					password
				},
				{
					withCredentials: true
				}
			)
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

	registration: async formData => {
		try {
			await axios.post(`${PREFIX}/api/registration`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true
			})
		} catch (err) {
			if (err instanceof AxiosError) {
				set({ errorText: err.response?.data.message })
				setTimeout(() => set({ errorText: null }), 5000)
				throw new Error(err.response?.data.message)
			}
		}
	},

	checkAuth: async () => {
		try {
			const { data } = await axios.get(`${PREFIX}/api/checkAuth`, {
				withCredentials: true
			})

			set({
				email: data.user.email,
				id: data.user.id,
				isActivated: data.user.isActivated
			})

			return true
		} catch (err) {
			set({
				email: '',
				id: '',
				isActivated: ''
			})

			return false
		}
	}
}))
