<script>
    import Test from './test.svelte';
    	let code = true;
	function start() {
		code = false;
	}
</script>

{#if code == true}
		<div class="butn">
			<button on:click={start} class="start">Start Test</button>
		</div>
	{:else}
		<Test />
{/if}

<style>
    .butn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 500px;
	}
	.start {
		width: 80px;
		height: 40px;
		border-radius: 3px;
		background-color: red;
		color: white;
	}
</style>