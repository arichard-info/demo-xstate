import { stringify } from './utils.ts';

export function selectivelyStringify(value, keys, replacer) {
	const selected = {};

	for (const key of keys) {
		selected[key] = value[key];
	}

	const serialized = JSON.parse(stringify(selected, replacer));
	return stringify({
		...value,
		...serialized
	});
}

export function stringifyState(snapshot, replacer) {
	const { tags, ...snapshotToStringify } = snapshot;
	return selectivelyStringify(
		{ ...snapshotToStringify, tags: Array.from(tags) },
		['context'],
		replacer
	);
}
