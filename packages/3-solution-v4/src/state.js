import { createMachine, assign } from 'xstate';
import * as api from 'common/api';

import { expect, test, describe } from 'vitest';

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
				},
				meta: {
					test: async (screen) => {
						expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument()
						expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument()
					},
				}
			},
			submitting: {
				invoke: {
					src: api.login,
					onDone: 'confirmation',
					onError: 'error'
				},
				meta: {
					test: async (screen) => {
					  return true;
					},
				}
			},
			confirmation: {
				type: 'final',
				meta: {
					test: async (screen) => {
					  return true;
					},
				}
			},
			error: {
				on: {
					RETRY: {
						target: 'editing',
						actions: 'resetForm'
					}
				},
				meta: {
					test: async (screen) => {
					  return true;
					},
				}
			}
		}
	},
	{
		actions: {
			resetForm: assign(() => ({ username: '', password: '' }))
		},
		guards: {
			isFormValid: (ctx) => ctx.username !== "" && ctx.password !== ""
		}
	}
);
