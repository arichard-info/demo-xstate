<script>
	import '../style/app.css';
</script>

<div>
	<slot />
</div>

<style>
	:global(body) {
		@apply bg-gray-200;
		height: 100vh;
		padding-top: 100px;
	}

	div {
		width: 100%;
		max-width: 600px;
		margin: auto;
	}


</style>
