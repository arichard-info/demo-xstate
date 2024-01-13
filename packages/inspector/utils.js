import safeStringify from 'fast-safe-stringify';
import { createMachine } from 'xstate';

export function getLazy(value) {
	return typeof value === 'function' ? value() : value;
}

export function stringify(value, replacer) {
	try {
		return JSON.stringify(value, replacer);
	} catch (e) {
		return safeStringify(value, replacer);
	}
}

export function isReceiverEvent(event) {
	if (!event) {
		return false;
	}

	try {
		if (typeof event === 'object' && 'type' in event && event.type.startsWith('service.')) {
			return true;
		}
	} catch (e) {
		return false;
	}

	return false;
}

export function parseState(stateJSON) {
	const state = JSON.parse(stateJSON);

	return state;
}

export function parseReceiverEvent(event) {
	switch (event.type) {
		case 'service.event':
			return {
				...event,
				event: JSON.parse(event.event)
			};
		case 'service.register':
			return {
				...event,
				machine: createMachine(JSON.parse(event.machine)),
				state: parseState(event.state)
			};
		case 'service.state':
			return {
				...event,
				state: parseState(event.state)
			};
		default:
			return event;
	}
}
