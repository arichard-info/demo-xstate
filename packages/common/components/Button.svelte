<script>
	export let variant = 'secondary';
	let className = '';
	export { className as class };
	export let stretched = false;
</script>

<button
	on:click
	class="btn btn-{variant} {className || ''}"
	class:btn-stretched={stretched}
	{...$$restProps}
>
	<slot />
</button>

<style>
	.btn {
		@apply text-lg font-bold py-3 px-8 rounded-md inline-flex items-center justify-center;
	}
	.btn-primary {
		@apply bg-blue-600 text-white;
	}
	.btn-secondary {
		@apply bg-yellow-200;
	}

	.btn-secondary:hover {
		@apply bg-yellow-300;
	}

	.btn-primary:hover {
		@apply bg-blue-700;
	}

	.btn-stretched {
		@apply w-full;
	}
</style>
