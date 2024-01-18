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
		@apply text-lg font-bold py-2 px-4 rounded inline-flex items-center justify-center;
	}
	.btn-primary {
		@apply bg-blue-700 text-white;
	}
	.btn-secondary {
		@apply bg-yellow-200;
	}

	.btn-secondary:hover {
		@apply bg-yellow-300;
	}

	.btn-primary:hover {
		@apply bg-blue-900;
	}

	.btn-stretched {
		@apply w-full;
	}
</style>
