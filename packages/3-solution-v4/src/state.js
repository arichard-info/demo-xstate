import { assign } from 'xstate';
import * as api from 'common/api';

export const machineDefinition =
{
	id: 'login',
	context: {
		username: '',
		password: ''
	},
	initial: 'editing',
	states: {
		editing: {
			on: {
				SUBMIT: {
					target: 'submitting',
					cond: (ctx) => (ctx.username !== "" && ctx.password !== "")
				},
				EDIT_USERNAME: {
					actions: assign({ username: (_, event) => event.value })
				},
				EDIT_PASSWORD: {
					actions: assign({ password: (_, event) => event.value })
				}
			}
		},
		submitting: {
			invoke: {
				src: (ctx) => api.login({ username: ctx.username, password: ctx.password }),
				onDone: 'confirmation',
				onError: 'error'
			}
		},
		confirmation: {
			type: 'final'
		},
		error: {
			on: {
				RETRY: {
					target: 'editing',
					actions: assign(() => ({ username: '', password: '' }))
				}
			}
		}
	}
}
