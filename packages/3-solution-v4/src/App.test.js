import { expect, test, describe } from 'vitest';
import { createModel } from '@xstate/test';

import machine from './state';
const appModel = createModel(machine).withEvents({
	EDIT_USERNAME: {
		exec: async (page) => {
			await page.click('input');
		}
	},
	EDIT_PASSWORD: {
		exec: async (page) => {
			await page.click('input');
		}
	}
});

describe('Test Machine tests', () => {
	const testPlans = appModel.getSimplePathPlans();

	testPlans.forEach((plan) => {
		describe(plan.description, () => {
			plan.paths.forEach((path) => {
				test(path.description, async () => {
					expect(1 + 2).toBe(3);
				});
			});
		});
	});
});
