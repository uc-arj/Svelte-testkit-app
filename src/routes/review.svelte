<!-- 
File Name      : review.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->

<script>
	import { onMount } from 'svelte';
	import Result from './result.svelte';
	import { count } from '../store';
	import Startpage from './start.svelte';
	
	export let user_data = [];
	export let reviewq;
	let result = true;
	let start_page = true;

	onMount(async function () {
		let response = await fetch('../src/data/question.json');
		user_data = await response.json();
	});
	function restart() {
		start_page=!start_page
		count.set(0)
	}

	let current = reviewq;
</script>

<main>
	{#if result == true && start_page == true}
		<div class="question">
			{#each user_data as i, j (i)}
				{#if current == j}
					<h4>{JSON.parse(i.content_text).question}</h4>
					<div class="answer">
						{#each JSON.parse(i.content_text).answers as c, d (c)}
							{#if c.is_correct == 1}
								<label>
									<input type="radio" checked class="custom" value={c.is_correct} name="option" />
									{@html c.answer}
								</label>
							{:else}
								<p>
									<input
										type="radio"
										disabled
										value={c.is_correct}
										name="option"
									/>
									{@html c.answer}
								</p>
							{/if}
						{/each}
					</div>
					<div>
						<p class="explaination">{@html JSON.parse(i.content_text).explanation}</p>
					</div>
				{/if}
			{/each}
		</div>

		<footer id="footer">
			<button class="panel" on:click={restart}>Restart</button>
			<button class="panel" on:click={() => current++} disabled={current == 10}> Next </button>
			<p class="list"><b>{current + 1} out of 11</b></p>
			<button class="panel" on:click={() => current--} disabled={current == 0}> Previous </button>
			<button class="panel" on:click={() => (result = !result)}>Result</button>
		</footer>
	{:else if start_page == false}
		<Startpage />
	{:else if result == false}
		<Result resultdata={user_data} />
	{/if}
</main>

<style>
	* {
		box-sizing: border-box;
	}
	#footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 7vh;
		background-color: rgba(222, 204, 208, 0.653);
		border-top: 1px solid rgba(163, 159, 159, 0.671);
		border-radius: 5px;
		padding-right: 20px;
	}
	label {
		font-weight: bolder;
	}
	.list {
		font-family: 'Segoe UI';
		font-size: medium;
		margin: 15px 5px 10px 5px;
		float: right;
	}
	.question {
		font-family: 'Segoe UI';
		font-size: medium;
		text-align: justify;
		height: 25vw;
		width: 65vw;
		top: 0px;
		margin-bottom: 4vh;
	}
	.explaination {
		position: absolute;
		width: 65vw;
		margin-top: 4vh;
		font-size: 15px;
	}
	.answer {
		height: 14vh;
		width: 65vw;
		margin-top: 7vh;
		text-align:justify;
		margin-bottom: 14vh;
	}
	main {
		width: 100vw;
		min-height: 500px;
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.panel {
		background-color: #ea4335;
		color: white;
		width: 80px;
		height: 40px;
		margin-top: 5px;
		margin-left: 3px;
		margin-right: 10px;
		border-radius: 12px 12px 0px 0px;
		float: right;
	}
	.panel:hover {
		border: 3px solid black;
	}
	button:disabled {
		background-color: lightgrey;
		cursor: not-allowed;
	}

</style>
