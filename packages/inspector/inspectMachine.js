import { assign, createMachine } from 'xstate';

import { stringifyState } from './serialize.js';
import { stringify } from './utils.js';

export function createInspectMachine(devTools, options) {
	const serviceMap = new Map();

	// Listen for services being registered and index them
	// by their sessionId for quicker lookup
	const sub = devTools.onRegister((service) => {
		serviceMap.set(service.sessionId, service);
	});

	return createMachine({
		initial: 'pendingConnection',
		context: {
			client: undefined
		},
		states: {
			pendingConnection: {},
			connected: {
				on: {
					'service.state': {
						actions: ({ context, event }) => context.client.send(event)
					},
					'service.event': {
						actions: ({ context, event }) => context.client.send(event)
					},
					'service.register': {
						actions: ({ context, event }) => context.client.send(event)
					},
					'service.stop': {
						actions: ({ context, event }) => context.client.send(event)
					},
					'xstate.event': {
						actions: ({ event: e }) => {
							const { event } = e;
							const parsedEvent = JSON.parse(event);
							// TODO: figure out a different mechanism
							const service = serviceMap.get(parsedEvent.origin?.id);
							service?.send(parsedEvent);
						}
					},
					unload: {
						actions: ({ context }) => {
							context.client.send({ type: 'xstate.disconnect' });
						}
					},
					disconnect: 'disconnected'
				}
			},
			disconnected: {
				entry: () => {
					sub.unsubscribe();
				},
				type: 'final'
			}
		},
		on: {
			'xstate.inspecting': {
				target: '.connected',
				actions: [
					assign({
						client: ({ event }) => event.client
					}),
					({ context }) => {
						devTools.services.forEach((service) => {
							context.client?.send({
								type: 'service.register',
								machine: stringify(service.logic, options?.serialize),
								state: stringifyState(service.getSnapshot(), options?.serialize),
								sessionId: service.sessionId
							});
						});
					}
				]
			}
		}
	});
}
