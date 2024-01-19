import { expect, test, describe } from 'vitest';
import { createModel } from '@xstate/test';

import { fireEvent, render, screen } from '@testing-library/svelte';

import App from './App.svelte'
import machine from './state';

const appModel = createModel(machine, {
	events: {
    	EDIT_USERNAME: function () {
			console.log("yo")
		},
    	EDIT_PASSWORD: function () {
			console.log("yo")
    	},
		SUBMIT: function() {
			console.log("sub")
		},
		RETRY: function() {
			console.log("sub")
		}
  }
})

describe('Test Machine tests', () => {
	const testPlans = appModel.getSimplePathPlans();

	// test("App Render", () => {
	// 	console.log(test)
	// })

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				test(path.description, async () => {
					render(App)
					await path.test(screen);
				});
			});
		});
	});
});
