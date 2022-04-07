<script>
	import { onMount } from 'svelte';
	import Result from './result.svelte';
	import { count } from '../store';
	import Start from './start.svelte';
	export let users = [];
	let result = true;
	let start = true;

	onMount(async function () {
		let response = await fetch('./static/data/question.json');
		users = await response.json();
	});

	let current = 0;
	let useroption = [];

	console.log(start);
</script>

<main>
	{#if result == true && start == true}
		<div class="question">
			{#each users as i, j (i)}
				{#if current == j}
					<h4>{JSON.parse(i.content_text).question}</h4>
					<div class="answer">
						{#each JSON.parse(i.content_text).answers as c, d (c)}
							{#if c.is_correct == 1}
								<label>
									<input type="radio" bind:group={useroption[j]} value={c.answer} name="option" />
									{@html c.answer}
								</label>
							{:else}
								<p>
									<input
										type="radio"
										bind:group={useroption[j]}
										disabled
										value={c.answer}
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
			<button class="option" on:click={() => (start = !start)}>Restart</button>
			<button class="option" on:click={() => current++} disabled={current == 10}> Next </button>
			<p class="list"><b>{current + 1} out of 11</b></p>
			<button class="option" on:click={() => current--} disabled={current == 0}> Previous </button>
			<button class="option" on:click={() => (result = !result)}>Result</button>
		</footer>
	{:else if start == false}
		<Start />
	{:else if result == false}
		<Result result={users} count={$count} />
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
		height: 50px;
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
		height: 100px;
		width: 1000px;
		top: 0px;
		margin-bottom: 20px;
	}
	.explaination {
		position: absolute;
		width: 1000px;
		margin-top: 20px;
		font-size: 14px;
	}
	.answer {
		height: 150px;
		width: 700px;
		margin-top: 70px;
		margin-bottom: 110px;
	}
	main {
		width: 100vw;
		min-height: 500px;
		display: flex;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}
	.option {
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
	.option:hover {
		width: 82px;
		height: 40px;
		border: 1px solid black;
	}
	button:disabled {
		background-color: lightgrey;
		cursor: not-allowed;
	}
</style>
