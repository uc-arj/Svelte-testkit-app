<script>
	import Review from './review.svelte';
	import Start from './start.svelte';
	import { option } from '../store';
	import { onMount } from 'svelte';

	export let count;
	export let result;
	let review;
	let start;
	onMount(() => {
		review = true;
		start = true;
	});
	let total = 11;
	let attemptCount = count;
	let skipped = total - count;
	let correct = [];
	let answerid = [];
	let correctcount = 0;
	let incorrectcount = 0;
	let userselect_ans = [];
	let cor_ans = [];

	for (let i = 0; i < result.length; i++) {
		let answer_index = 0;
		let actual_index = 0;
		if ($option[i])
			for (let j = 0; j < 4; j++) {
				if (JSON.parse(result[i].content_text).answers[j].answer == $option[i]) {
					answer_index = j;
				}
			}
		else {
			answer_index = null;
		} //end of j loop
		for (let k = 0; k < 4; k++) {
			if (JSON.parse(result[i].content_text).answers[k].is_correct == 1) {
				correct = [...correct, JSON.parse(result[i].content_text).answers[k].is_correct];
				actual_index = k;
				answerid = [...answerid, JSON.parse(result[i].content_text).answers[k].id];
			}
		}

		userselect_ans[i] = answer_index;
		cor_ans[i] = actual_index;
	} //end of i loop

	for (let i = 0; i < result.length; i++) {
		if (userselect_ans[i] == cor_ans[i]) {
			correctcount++;
		} else if (userselect_ans[i] != null) {
			incorrectcount++;
		}
	}
	let score = Math.round((correctcount / total) * 100);
</script>

<main>
	{#if review == true && start == true}
		<div class="ResultCard flex-box">
			<div class="Score">
				<h3>Score</h3>
				<p>{score}%</p>
			</div>
			<div class="Skip">
				<h3>Skipped Question</h3>
				<p>{skipped}</p>
			</div>
			<div class="Correct">
				<h3>Correct Question</h3>
				<p class="correct">{correctcount}</p>
			</div>
			<div class="Incorrect">
				<h3>Incorrect Question</h3>
				<p class="incorrect">{incorrectcount}</p>
			</div>

			<div class="Attempted">
				<h3>Attempted Question</h3>
				<p>{attemptCount}</p>
			</div>
		</div>

		<div class="block">
			{#each result as i, j}
				<div class="flex-box">
					<div class="squares">{j + 1}</div>
					<div class="Questionlist">
						<li class="Question">{JSON.parse(i.content_text).question}</li>
					</div>
					{#each JSON.parse(i.content_text).answers as c, d}
						<div class="option flex-box">
							<div
								class="answer_bullets {`${c.is_correct == 1?"true":""}`}"
								class:match={cor_ans[j] == userselect_ans[j] && userselect_ans[j] == d}
								class:mismatch={cor_ans[j] != userselect_ans[j] && userselect_ans[j] == d}
							>	{String.fromCharCode(65 + d)}
							</div> 
						</div>
					{/each}
					<!-- writing UNATTEMPTED and ATTEMPTED -->
					{#if userselect_ans[j] == null}
						<div class="unattempt">UNATTEMPTED</div>
					{:else}
						<div class="attempt">ATTEMPTED</div>
					{/if}
				</div>
			{/each}
		</div>

		<footer class="footer">
			<button class="Review" on:click={() => (review = !review)}> REVIEW</button>

			<button class="Review" on:click={() => (start = !start)}>RETAKE</button>
		</footer>
	{:else if start == false}
		<Start />
	{:else if review == false}
		<Review />
	{/if}
</main>

<style>
	main {
		width: 100vw;
		min-height: 500px;
	}
	.Score,
	.Skip,
	.Correct,
	.Incorrect,
	.Attempted {
		width: 250px;
		height: 100px;
		border: 1px inset;
		margin: 5px;
		display: flex;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	p {
		font-size: 20px;
		margin: 0px;
		color: rgba(20, 62, 216, 0.703);
	}
	.correct,
	.attempt {
		color: rgb(49, 207, 49);
	}
	.incorrect,
	.unattempt {
		color: #ea4335;
	}
	.attempt,
	.unattempt {
		width: 160px;
		text-align: left;
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 50px;
		background-color: rgba(222, 204, 208, 0.653);
		border-top: 1px solid rgba(163, 159, 159, 0.671);
		border-radius: 12px;
		margin: auto;
		padding-right: 20px;
	}

	.answer_bullets {
		line-height: 24px;
		padding: 3px 3px;
		margin: 3px 2px 3px 8px;
		text-align: center;
		border-radius: 40px;
		color: #aea8a8;
		background: #fff;
		border: 1px solid #aea8a8;
		font-size: 17px;
		font-weight: 700;
		width: 22px;
		height: 22px;
	}

	.true,.match {
		background: green;
		color: black;
	}
	.mismatch {
		background-color: red;
		color: black;
	}
	
	.ResultCard {
		justify-content: center;
		flex-direction: row;
		height: 150px;
	}

	.flex-box {
		display: flex;
	}

	.Review {
		background-color: #ea4335;
		color: white;
		width: 80px;
		height: 40px;
		margin-top: 5px;
		margin-left: 3px;
		margin-right: 15px;
		border-radius: 12px 12px 0px 0px;
		float: right;
	}
	.Review:hover {
		width: 82px;
		height: 40px;
		border: 1px solid black;
	}
	.Questionlist {
		width: 440px;
	}
	.squares {
		height: 26px;
		width: 26px;
		line-height: 20px;
		padding: 3px 3px;
		text-align: center;
		border-radius: 20px;
		color: #eee;
		margin-right: 20px;
		background: #616970;
		font-size: 16px;
	}
	li {
		font-size: 20px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		width: 400px;
		cursor: pointer;
		white-space: nowrap;
		list-style-type: none;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.block {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.option {
		margin-left: 30px;
		width: 50px;
		flex-direction: row;
	}
</style>
