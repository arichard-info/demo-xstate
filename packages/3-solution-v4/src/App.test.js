import { vi, test, describe } from 'vitest';
import { createModel } from '@xstate/test';

import { fireEvent, render, screen } from '@testing-library/svelte';

import App from './App.svelte'
import machine from './state';

const appModel = createModel(machine, {
	events: {
		EDIT_USERNAME: {
			exec: function () {
				fireEvent.input(screen.getByLabelText("Nom d'utilisateur"), { target: { value: "toto" } })
			}
		},
		EDIT_PASSWORD: {
			exec: function () {
				fireEvent.input(screen.getByLabelText("Mot de passe"), { target: { value: "password" } })
			}
		},
		SUBMIT: {
			exec: function () {
				fireEvent.click(screen.getByRole("button"));
			}
		},
		RETRY: {
			exec: function () {
				fireEvent.click(screen.getByRole("button"));
			}
		}
	}
})

vi.mock("common/api");

describe('Test Machine tests', () => {
	const testPlans = appModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				test(path.description, async () => {
					const apiModule = await import('common/api');

					if(path.description.includes("error")) {
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
