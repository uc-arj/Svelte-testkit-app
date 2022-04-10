<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const pass = createEventDispatcher();

	export let CountDown = 80000;
	let Countend;
	let endtime;
	function timerout() {
		alert('your test end');
		pass('call', { endtime });
	}

	$: Count = Math.round(CountDown / 1000);
	$: H = Math.floor(Count / 3600);
	$: M = Math.floor((Count - H * 3600) / 60);
	$: S = Count - H * 3600 - M * 60;
	$: if (Count === 0) {
		clearInterval(Countend);
	}
	onMount(() => {
		Countend = setInterval(() => {
			if (M == 0 && S == 0 && Count == 0) {
				endtime = null;
			} else {
				Count -= 1;
			}
		}, 100000);
	});
</script>

{#if M === 0 && S === 0 && Count == 0}
	{timerout()}
	<span><b>{'0' + M}:{'0' + S}</b></span>
{:else}
	<span><b>{M < 10 ? '0' + M : M}:{S < 10 ? '0' + S : S}</b></span>
{/if}

<style>
	span {
		font-family: 'Segoe UI';
		font-size: 20px;
		margin: 15px 5px 0px 5px;
		float: right;
		font-family: 'Courier New', Courier, monospace;
	}
</style>
