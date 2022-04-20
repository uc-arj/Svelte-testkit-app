<!-- 
File Name      : Sidepanel.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->

<script>
	import { count } from './store';
	import { createEventDispatcher } from 'svelte';
	
	export let user;
	export let side_open = false;
	// let src = '../src/image/arrow.jpg';
	const forward = createEventDispatcher();
</script>

<main>
	<div id="mySidebar" class="sidebar">
		<!-- svelte-ignore a11y-accesskey -->
		<div class="questlist" style="--display:{side_open? 'inset' : 'none'}">
			{#if side_open == true}
				<div class="question-attempt">
					<p class="count-block">Attempted Question</p>
					<p class="count-block">{$count} out of 11</p>
				</div>
				{#each user as i, j}
					<p class="question">
						<li on:click={() => forward('message', j)}><b>{JSON.parse(i.content_text).question}</b></li>
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

	}
	li {
		list-style-type: square;
		overflow: hidden;
		font-size:2vh;
		margin-bottom: 3vh;
		text-overflow: ellipsis;
	}
	.question-attempt{
		width:18vw;
	}
	.count-block{
		border:2px inset red;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size:3vh;
		text-align: center;
		margin-right: 2px;	
		margin-bottom: 4vh;
	}
	.questlist{
		border-style: var(--display);
  		border-width: 2px 2px 2px 0px;
		border-color:red;
		margin-right: 4px;
		height:83vh;
	}
	
	.sidebar {
		margin-top:20vh;
		z-index: 1;
		width:19vw;
		height: 66vh;
		position: fixed;
		left: 5px;
		white-space: nowrap;
	}

	.question {
		cursor: pointer;
		width: 17vw;
	}
	
</style>
