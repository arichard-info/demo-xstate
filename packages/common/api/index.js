import { getApiStatus } from './utils';

export const login = () => {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			const apiUp = getApiStatus();
			if (apiUp) return resolve(true);
			return reject(new Error());
		}, 1000)
	);
};
