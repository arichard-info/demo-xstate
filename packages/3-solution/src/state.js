import { createMachine, assign, fromPromise } from 'xstate';
import * as api from 'common/api';

export default createMachine(
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
						guard: 'isFormValid'
					},
					EDIT_USERNAME: {
						actions: assign({ username: ({ event }) => event.value })
					},
					EDIT_PASSWORD: {
						actions: assign({ password: ({ event }) => event.value })
					}
				}
			},
			submitting: {
				invoke: {
					src: 'apiLogin',
					input: ({ context }) => context,
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
						actions: 'resetForm'
					}
				}
			}
		}
	},
	{
		actions: {
			resetForm: assign(() => ({ username: '', password: '' }))
		},
		guards: {
			isFormValid: ({ context }) => Boolean(context.username && context.password)
		},
		actors: {
			apiLogin: fromPromise(async ({ input }) =>
				api.login({ username: input.username, password: input.password })
			)
		}
	}
);
