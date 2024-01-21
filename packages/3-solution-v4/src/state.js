import { createMachine, assign } from 'xstate';
import * as api from 'common/api';

import { expect } from 'vitest';

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
						expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();
						expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
						expect(screen.getByRole("button")).toBeInTheDocument();
					},
				}
			},
			submitting: {
				invoke: {
					src: "login",
					onDone: 'confirmation',
					onError: 'error'
				},
				meta: {
					test: async (screen) => {
						expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();
						expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
						expect(screen.getByRole("button")).toBeInTheDocument();
						expect(screen.getByTestId("loader")).toBeInTheDocument();
					},
				}
			},
			confirmation: {
				type: 'final',
				meta: {
					test: async (screen) => {
					  	expect(screen.getByText("Vous êtes connecté !")).toBeInTheDocument();
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
						expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
						expect(screen.getByRole("button")).toBeInTheDocument();
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
			isFormValid: (ctx) => (ctx.username !== "" && ctx.password !== "")
		},
		services: {
			login: (ctx) => api.login({ username: ctx.username, password: ctx.password })
		}
	}
);
