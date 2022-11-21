<script>
	import { setApiStatus, getApiStatus } from './../api/utils';
	let checked = getApiStatus();

	const handleChange = () => {
		checked = !checked;
		setApiStatus(checked);
	};
</script>

<label class="inline-flex items-center cursor-pointer absolute bottom-0 left-0 m-3">
	<input type="checkbox" value="" class="sr-only peer" {checked} on:change={handleChange} />
	<div class="w-11 h-6 bg-white rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"/>
	<span class="ml-3 text-sm font-medium text-gray-900">API Up</span>
</label>

