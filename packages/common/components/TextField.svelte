<script>
	export let label = '';
	export let id = '';
	export let type = '';

	let className = '';
	export { className as class };
</script>

<div class={className}>
	<label for={id}>
		{label}
	</label>
	{#if type === 'password'}
		<input type="password" {id} on:input {...$$restProps} />
	{:else}
		<input type="text" {id} on:input {...$$restProps} />
	{/if}
</div>

<style>
	label {
		@apply block text-gray-700 font-bold mb-2 text-lg;
	}
	input {
		@apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight;
	}

	input:focus {
		@apply outline-none bg-white border-blue-700;
	}
</style>
