<!-- 
File Name      : resultdata.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->

<script>
	import Reviewpage from './review.svelte';
	import Startpage from './start.svelte';
	import { option, count } from '../store';

	import { onMount } from 'svelte';

	export let resultdata;
	let review_page;
	let start_page;
	onMount(() => {
		review_page = true;
		start_page = true;
	});
	let total = 11;
	let attempt_count = $count;
	let skipped = total - attempt_count;
	let correct_ans = [];
	let answer_id = [];
	let correct_count = 0;
	let incorrect_count = 0;
	let userselect_ans = [];
	let cor_ans = [];
	let score;
	let review_q;

	for (let i = 0; i < resultdata.length; i++) {
		let answer_index = 0;
		let actual_index = 0;
			if ($option[i]) {
				for (let j = 0; j < 4; j++) {
					if (JSON.parse(resultdata[i].content_text).answers[j].answer == $option[i]) {
						answer_index = j;
					} // end of if
				} // end of for
			} else {
				answer_index = null; //end of j loop
			}
			for (let k = 0; k < 4; k++) {
				if (JSON.parse(resultdata[i].content_text).answers[k].is_correct == 1) {
					correct_ans = [...correct_ans,JSON.parse(resultdata[i].content_text).answers[k].is_correct];
					actual_index = k;
					answer_id = [...answer_id, JSON.parse(resultdata[i].content_text).answers[k].id];
				}
			} // end of k loop

			userselect_ans[i] = answer_index; // user answer index
			cor_ans[i] = actual_index; // actual answwer index
	} //end of i loop

		for (let i = 0; i < resultdata.length; i++) {
			if (userselect_ans[i] == cor_ans[i]) {
				correct_count++;
			} else if (userselect_ans[i] != null) {
				incorrect_count++;
			}
		} // end of for loop

	function restart() {
		start_page = !start_page;
		count.set(0);
	} // end of restart function
	function review(j) {
		review_page=!review_page
		review_q=j
		console.log(j)
	}

	// correct incorrect count
	score = Math.round((correct_count / total) * 100);
</script>

<main>
	{#if review_page == true && start_page == true}
		<div class="result_card flex-box">
			<div class="score-div flex">
				<h3>Score</h3>
				<p>{score}%</p>
			</div>
			<div class="skip-div flex">
				<h3>Skipped Question</h3>
				<p>{skipped}</p>
			</div>
			<div class="correct-div flex">
				<h3>Correct Question</h3>
				<p class="correct-count">{correct_count}</p>
			</div>
			<div class="incorrect-div flex">
				<h3>Incorrect Question</h3>
				<p class="incorrect-count">{incorrect_count}</p>
			</div>

			<div class="attempted-div flex">
				<h3>Attempted Question</h3>
				<p>{attempt_count}</p>
			</div>
		</div>

		<div class="block flex-box">
			{#each resultdata as i, j}
				<div class="flex-box mb1">
					<div class="squares flex">{j + 1}</div>
					<div class="question-list">
						<!-- <a href={`reviews/${j+1}`}> -->
						<li class="question" on:click="{()=>review(j)}">{JSON.parse(i.content_text).question}</li>
					</div>
					{#each JSON.parse(i.content_text).answers as c, d}
						<div class="option flex-box">
							<div
								class="answer-bullets flex {`${c.is_correct == 1 ? 'true' : ''}`}"
								class:match={cor_ans[j] == userselect_ans[j] && userselect_ans[j] == d}
								class:mismatch={cor_ans[j] != userselect_ans[j] && userselect_ans[j] == d}
							>
								{String.fromCharCode(65 + d)}
							</div>
						</div>
					{/each}
					<!-- writing UNaTTEMPTED and ATTEMPTED -->
					{#if userselect_ans[j] == null}
						<div class="unattempt">UNATTEMPTED</div>
					{:else}
						<div class="attempt">ATTEMPTED</div>
					{/if}
				</div>
			{/each}
		</div>
		<footer class="footer">
			<button class="foot_option" on:click={restart}>RETAKE</button>
		</footer>
	{:else if start_page == false}
		<Startpage />
	{:else if review_page == false}
		<Reviewpage reviewq={review_q}/>
	{/if}
</main>

<style>
	main {
		width: 100vw;
		min-height: 500px;
	}
	.score-div,
	.skip-div,
	.correct-div,
	.incorrect-div,
	.attempted-div {
		width: 15vw;
		height: 14vh;
		border: 1px inset;
		margin: 5px;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		flex-direction: column;
	}
	h3,
	p {
		font-size: 3vh;
		margin: 0px;
		margin-bottom: 5px;
	}
	p {
		margin: 0px;
		color: rgba(20, 62, 216, 0.703);
	}

	.attempt,
	.unattempt {
		line-height: 4vh;
		width: 5vw;
		height: 2vh;
		font-weight: bold;
		font-size: 2vh;
		text-align: left;
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: auto;
		margin-top: 2vh;
		background-color: rgba(222, 204, 208, 0.653);
		border-top: 1px solid rgba(163, 159, 159, 0.671);
		border-radius: 12px;
		padding-right: 20px;
	}
	.flex{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.answer-bullets {
		text-align: center;
		border-radius: 3vw;
		color: #aea8a8;
		background: #fff;
		border: 1px solid #aea8a8;
		font-size: 3vh;
		font-weight: 700;
		width: 3vw;
		height: 5vh;
	}
	.true {
		background-color: blue;
		color: white;
	}
	.match {
		background: green;
		color: white;
	}
	.mismatch {
		background-color: red;
		color: black;
	}
	.correct-count,
	.attempt {
		color: rgb(49, 207, 49);
	}
	.incorrect-count,
	.unattempt {
		color: #ea4335;
	}

	.result_card {
		justify-content: center;
		flex-direction: row;
		height: 17vh;
	}

	.flex-box {
		display: flex;
	}
	.mb1 {
		margin-bottom: 1vh;
	}

	.foot_option {
		background-color: #ea4335;
		color: white;
		width: 5vw;
		height: 6vh;
		font-size: 1vw;
		padding: 0px;
		margin-top: 1vh;
		margin-left: 1vw;
		margin-right: 15px;
		border-radius: 12px 12px 0px 0px;
		float: right;
	}
	.foot_option:hover {
		border: 3px solid black;
	}

	.squares {
		height: 5vh;
		width: 2vw;
		text-align: center;
		border-radius: 20px;
		color: #eee;
		margin-right: 1vw;
		background: #616970;
		font-size: 16px;
	}
	li {
		font-size: 3vh;
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		width: 30vw;
		cursor: pointer;
		white-space: nowrap;
		list-style-type: none;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-bottom: 10px;
	}

	.block {
		position: relative;
		align-items: center;

		flex-direction: column;
	}

	.option {
		margin-left: 30px;
		width: 4vw;
		flex-direction: row;
	}
</style>
