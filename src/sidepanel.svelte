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
		<!-- <button class:openbtn={(side_open==true)} accesskey="s" id="openbtn" on:click={() => (side_open = !side_open)}
			><img {src} alt="arrow" width="10px" height="10px" /> Sidebar</button> -->
		<div class="questlist" style="--display:{side_open? 'inset' : 'none'}">
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
		margin-right: 2px;
	}
	.questlist{
		border-style: var(--display);
  		border-width: 2px 2px 2px 0px;
		border-color:red;
		margin-right: 4px;
	}
	
	.sidebar {
		z-index: 1;
		width:14vw;
		height: 64vh;
		position: fixed;
		padding: 20px 5px 5px 0px;
		left: 5px;
		white-space: nowrap;
		transition: 0.2s ease-in-out;
	}

	.question {
		cursor: pointer;
		width: 13vw;
		font-weight:bold;
	}
	
</style>
