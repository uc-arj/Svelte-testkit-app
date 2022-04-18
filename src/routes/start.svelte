<!-- 
File Name      : Start.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 12/04.2022
  -->

<script>
	import Testpage from './test.svelte';
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
	<Testpage />
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
