const localStorageKey = 'apiUp';

export const getApiStatus = (defaultValue = true) => {
	if (window.localStorage.getItem(localStorageKey))
		return window.localStorage.getItem(localStorageKey) === 'true';
	return defaultValue;
};

export const setApiStatus = (value) => {
	window.localStorage.setItem(localStorageKey, value);
};
