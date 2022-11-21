export const login = () => {
	return new Promise((resolve, reject) =>
		setTimeout(() => {
			const apiUp = getApiStatus();
			if (apiUp) return resolve(true);
			return reject(new Error());
		}, 1000)
	);
};

const localStorageKey = 'apiUp';

export const getApiStatus = (defaultValue = true) => {
	if (window.localStorage.getItem(localStorageKey))
		return window.localStorage.getItem(localStorageKey) === 'true';
	return defaultValue;
};

export const setApiStatus = (value) => {
	window.localStorage.setItem(localStorageKey, value);
};
