<script>
	// import Start from "../start.svelte"
	import Wel from '../routes/welcome.svelte';
	import Test from '../routes/test.svelte';
	let code = true;
	function start() {
		code = false;
	}
</script>

<Wel />
<main>
	{#if code == true}
		<div class="butn">
			<button on:click={start} class="start">Start Test</button>
		</div>
	{:else}
		<Test />
	{/if}

    
</main>
<!-- <Wel/> -->

<style>
	main {
		width: 100vw;
		min-height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
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
