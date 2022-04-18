<!-- 
File Name      : Sidepanel.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 12/04.2022
-->

<script>
	export let user;
	export let side_open = false;
	import { count } from './store';
	import { createEventDispatcher } from 'svelte';

	let src = '../src/image/arrow.jpg';
	const forward = createEventDispatcher();
</script>

<main>
	<div id="mySidebar" class="sidebar">
		<button class:openbtn={(side_open==true)} id="openbtn" on:click={() => (side_open = !side_open)}
			><img {src} alt="arrow" width="10px" height="10px" /> Sidebar</button>
		<div class="questlist">
			{#if side_open == true}
				<div class="question-attempt">
					<p class="count-block">Attempted Question</p>
					<p class="count-block">{$count} out of 11</p>
				</div>
				{#each user as i, j}
					<p class="question">
						<li on:click={() => forward('message', j)}>{JSON.parse(i.content_text).question}</li>
					</p>
				{/each}<br />
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: end;
		align-items: flex-end;
		float: left;
	}
	li {
		list-style-type: square;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.question-attempt{
		width:13vw;
	}
	.count-block{
		border:2px inset red;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size:3vh;
		text-align: center;
	}
	
	.sidebar {
		z-index: 1;
		margin-top: 50px;
		width:17vw;
		height: 70vh;
		position: fixed;
		padding: 20px 5px 5px 0px;
		top: 30px;
		left: 5px;
		white-space: nowrap;
		transition: ease-in-out;
	}

	.question {
		cursor: pointer;
		width: 13vw;
		font-weight:bold;
		border:dashed red;
		border-width:3px 3px 3px 0px;
	}
	.openbtn {
		z-index: 1;
		position: fixed;
		-webkit-transform: rotate(-90deg);
		transform: rotate(-90deg);
		cursor: pointer;
		left: 13vw;
	}
	#openbtn {
		z-index: 1;
		background-color: #ea4335;
		color: white;
		padding: 10px 15px;
		border-radius: 12px;
		border: none;
		margin: 200px 0px 0px 2px;
	}
</style>
