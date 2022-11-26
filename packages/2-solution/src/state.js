import { createMachine, assign } from 'xstate';
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
						cond: 'isFormValid'
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
					src: api.login,
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
			isFormValid: (ctx) => Boolean(ctx.username && ctx.password)
		}
	}
);
