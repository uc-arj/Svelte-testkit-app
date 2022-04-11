<!-- 
File Name      : Index.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 11/04.2022
  -->

<script>
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
