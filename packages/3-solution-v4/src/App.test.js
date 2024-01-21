import { vi, test, describe, expect } from 'vitest';
import { createModel } from '@xstate/test';
import { createMachine } from 'xstate';
import merge from "deepmerge";

import { fireEvent, render, screen } from '@testing-library/svelte';

import App from './App.svelte'
import { machineDefinition } from './state';

const tests = {
	states: {
		editing: {
			meta: {
				test: (screen) => {
					expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();
					expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
					expect(screen.getByRole("button")).toBeInTheDocument();
				},
			}
		},
		submitting: {
			meta: {
				test: (screen) => {
					expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();
					expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
					expect(screen.getByRole("button")).toBeInTheDocument();
					expect(screen.getByTestId("loader")).toBeInTheDocument();
				},
			}
		},
		confirmation: {
			meta: {
				test: (screen) => {
					expect(screen.getByText("Vous êtes connecté !")).toBeInTheDocument();
				},
			}
		},
		error: {
			meta: {
				test: (screen) => {
					expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
					expect(screen.getByRole("button")).toBeInTheDocument();
				},
			}
		}
	}
}

const events = {
	EDIT_USERNAME: {
		exec: () => {
			fireEvent.input(screen.getByLabelText("Nom d'utilisateur"), { target: { value: "toto" } })
		}
	},
	EDIT_PASSWORD: {
		exec: () => {
			fireEvent.input(screen.getByLabelText("Mot de passe"), { target: { value: "password" } })
		}
	},
	SUBMIT: {
		exec: () => {
			fireEvent.click(screen.getByRole("button"));
		}
	},
	RETRY: {
		exec: () => {
			fireEvent.click(screen.getByRole("button"));
		}
	}
}

const testMacine = createMachine(merge(machineDefinition, tests));
const testModel = createModel(testMacine, { events });
vi.mock("common/api");

describe('Login', () => {
	const testPlans = testModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				test(path.description, async () => {
					const apiModule = await import('common/api');

					if (path.description.includes("error")) {
						apiModule.login = vi.fn().mockRejectedValue(new Error("test"));
					} else {
						apiModule.login = vi.fn().mockResolvedValue("ok");
					}

					render(App)
					await path.test(screen);
				});
			});
		});
	});
});
