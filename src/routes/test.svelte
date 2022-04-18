<!-- 
File Name      : test.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->
<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Counter from '../timer.svelte';
	import Sidebar from '../sidepanel.svelte';
	import Resultpage from './result.svelte';
	import { count } from '../store';
	import { option } from '../store';

	export let user_data = [];
	let sidebar = false;
	let test_end = true;
	let show_end = false;
	let timeend = false;
	let user_option = [];

	onMount(async function () {
		$option = user_option;
		let response = await fetch('../src/data/question.json');
		user_data = await response.json();
	});

	let current = 0;
	function timerOut(event) {
		if (event.value == null) {
			timeend = true;
		}
	}
	function attemptCount(j) {
		if (user_option[j] == null) {
			count.update((n) => n + 1);
		}
	}
	function endTest() {
		show_end = true;
	}
	function questionList(e) {
		current = e.detail;
	}
</script>

<main class="width flex">
	{#if test_end == true}
		<div class="question" class:top={sidebar == true}>
			{#each user_data as i, j (i)}
				{#if current == j}
					<h4>{JSON.parse(i.content_text).question}</h4>
					<div class="answer">
						{#each JSON.parse(i.content_text).answers as c, d (c)}
							<label class="flex">
								<input
									class="flex"
									type="radio"
									bind:group={user_option[j]}
									on:click={attemptCount(j)}
									value={c.answer}
									name="option"
								/>
								{@html c.answer}
							</label>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
		<Sidebar user={user_data} side_open={sidebar} on:message={questionList} />

		<div style="--show:{show_end || timeend ? 'block' : 'none'}" class="modal">
			<!-- Modal content -->
			<div class="modal-content">
				{#if show_end == true}
					<span class="close" on:click={() => (show_end = !show_end)}>&times;</span>
					<p>Do you Want to End Test</p>

					<button class="cancel_btn" on:click={() => (show_end = !show_end)}> Cancel</button>
					<button class="Ok_btn" on:click={() => (test_end = false)}>OK</button>
				{:else}
					<p class="time-endcode">Timeup your test is end :Check out your Result</p>
					<button class="Ok_btn" on:click={() => (test_end = false)}>OK</button>
				{/if}
			</div>
		</div>

		<footer id="footer" class="width flex">
			<Counter on:call={timerOut} />
			<!-- svelte-ignore a11y-accesskey -->
			<button class="option right_shift" accesskey="l" on:click={() => (sidebar = !sidebar)}>List</button>
			<!-- svelte-ignore a11y-accesskey -->
			<button class="option right_shift" accesskey="p" on:click={() => current--} disabled={current == 0}>
				Previous
			</button>
			<p class="list right_shift" ><b>{current + 1} out of 11</b></p>
			<!-- svelte-ignore a11y-accesskey -->
			<button class="option right_shift" accesskey="n" on:click={() => current++} disabled={current == 10}>
				Next
			</button>
			<!-- svelte-ignore a11y-accesskey -->
			<button class="option right_shift" accesskey="e" on:click={endTest}>End Test</button>
		</footer>
	{:else}
		<Resultpage resultdata={user_data} />
	{/if}
</main>

<style>
	.modal {
		display: var(--show); /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}
	.modal-content {
		background-color: #fefefe;
		margin: 2% auto; /* 15% from the top and centered */
		padding: 20px;
		font-size: 2vw;
		font-weight: bold;
		text-align: center;
		border: 1px solid #888;
		border-radius: 25px;
		width: 25vw; /* Could be more or less, depending on screen size */
	}

	/* The Close Button */
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	.cancel_btn,
	.Ok_btn {
		background-color: gray;
		width: 100px;
		height: 30px;
		font-size: 20px;
		border: 1px solid gray;
		border-radius: 10px;
	}
	.Ok_btn {
		background-color: rgb(0, 123, 255);
	}
	.time-endcode {
		font-size: 14px;
	}

	* {
		box-sizing: border-box;
	}
	.width {
		width: 100vw;
	}
	#footer {
		position: fixed;
		left: 0vw;
		bottom: 0vh;
		width: 100vw;
		height: 10vh;
		background-color: rgba(222, 204, 208, 0.653);
		border-top: 1px solid rgba(163, 159, 159, 0.671);
		border-radius: 5px;
		justify-content: flex-end;
		flex-wrap: wrap;
		padding-right: 2vw;
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
		margin-bottom: 5vh;
	}
	.top {
		margin-left: 5vw;
	}
	.flex {
		display: flex;
	}
	input[type='radio'],
	label {
		cursor: pointer;
		padding: 4px;
		font-size: 1rem;
	}

	.answer {
		z-index: 1;
		height: 24vh;
		width: 65vw;
		margin-top: 20vh;
		margin-bottom: 10vh;
		overflow: auto;
	}
	main {
		min-height: 500px;
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
		border: 3px solid black;
	}
	button:disabled {
		background-color: lightgrey;
		cursor: not-allowed;
	}
</style>
