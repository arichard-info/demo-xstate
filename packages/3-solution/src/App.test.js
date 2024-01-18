import { expect, test, describe } from 'vitest';
import { createTestModel } from '@xstate/test';

import machine from './state';
const model = createTestModel(machine);

describe('Test Machine tests', () => {
	test('adds 1 + 2 to equal 3', () => {
		console.log('//', model);
		expect(1 + 2).toBe(3);
	});

	test('adds 1 + 2 to equal 4', () => {
		expect(1 + 2).toBe(3);
	});
});
