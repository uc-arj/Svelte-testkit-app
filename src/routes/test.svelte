<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Counter from '../timer.svelte';
	import Sidebar from '../sidepanel.svelte';
	import Result from './result.svelte';
	import { count } from '../store';
	import { option } from '../store';

	export let users = [];
	let SideBar = false;
	let testend = true;
	let useroption = [];

	onMount(async function () {
		$option = useroption;
		let response = await fetch('./static/data/question.json');
		users = await response.json();
	});

	let current = 0;
	function timerout(event) {
		if (event.value == null) {
			testend = null;
		}
	}
	function attemptCount(j) {
		if (useroption[j] == null) {
			count.update((n) => n + 1);
		}
	}
	function endtest() {``
		if (confirm('Do you want to end test')) {
			testend = false;
		}
	}
	function questionList(e) {
		current = e.detail;
	}
</script>

<main class="width">
	{#if testend == true}
		<div class="question" class:top={(SideBar==true)}>
			{#each users as i, j (i)}
				{#if current == j}
					<h4>{JSON.parse(i.content_text).question}</h4>
					<div class="answer">
						{#each JSON.parse(i.content_text).answers as c, d (c)}
							<p>
								<input
									type="radio"
									bind:group={useroption[j]}
									on:click={attemptCount(j)}
									value={c.answer}
									name="option"
								/>
								{@html c.answer}
							</p>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
		<Sidebar user={users} SideOpen={SideBar} on:message={questionList} />

		<footer id="footer" class="width">
			<button class="option rightshift" on:click={endtest}>End Test</button>
			<button class="option rightshift" on:click={() => current++} disabled={current == 10}>
				Next
			</button>
			<p class="list rightshift"><b>{current + 1} out of 11</b></p>
			<button class="option rightshift" on:click={() => current--} disabled={current == 0}>
				Previous
			</button>
			<button class="option rightshift" on:click={() => (SideBar = !SideBar)}>List</button>
			<Counter on:call={timerout} />
		</footer>
	{:else}
		<Result result={users} count={$count} />
	{/if}
</main>

<style>
	.width {
		width: 100vw;
	}
	#footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width:100vw;
		height: 7vh;
		background-color: rgba(222, 204, 208, 0.653);
		border-top: 1px solid rgba(163, 159, 159, 0.671);
		border-radius: 5px;
		padding-right: 20px;
	}
	.list {
		margin: 15px 5px 10px 5px;
	}
	.question {
		z-index: 1;
		font-family: 'Segoe UI';
		font-size: medium;
		text-align: justify;
		height: 60vh;
		width: 65vw;
		top: 0px;
		/* margin-left:4vw; */
		margin-bottom: 20px;
	}
	.top{
		margin-left:4vw;
	}
	input[type='radio'],
	p {
		cursor: pointer;
	}

	.answer {
		z-index: 1;
		height: 150px;
		width: 700px;
		margin-top: 100px;
		margin-bottom: 50px;
	}
	main {
		min-height: 500px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.option {
		background-color: #ea4335;
		z-index: 1;
		color: white;
		width: 80px;
		height: 40px;
		margin-top: 5px;
		margin-left: 3px;
		margin-right: 10px;
		border-radius: 12px 12px 0px 0px;
	}
	.option:hover {
		width: 82px;
		height: 40px;
		border: 1px solid black;
	}
	.rightshift {
		float: right;
	}
	button:disabled {
		background-color: lightgrey;
		cursor: not-allowed;
	}
</style>
