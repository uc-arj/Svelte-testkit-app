<script>
	export let user;
	export let SideOpen = false;
	import { count } from './store';
	import { createEventDispatcher } from 'svelte';

	let src = '../src/image/arrow.jpg';
	const forward = createEventDispatcher();
</script>

			<main>
				<div id="mySidebar" class="sidebar">
					<button class:openbtn={SideOpen} id="openbtn" on:click={() => (SideOpen = !SideOpen)}
						><img {src} alt="arrow" width="10px" height="10px" /> Sidebar</button
					>
					<div class="questlist">
						{#if SideOpen == true}
							<div>
								<p>Attempted Question</p>
								<p>{$count} out of 11</p>
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
	main{
		display:flex;
		justify-content:end;
		align-items:flex-end;
		float: left;
	}
	li {
		list-style-type: square;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.sidebar {
		z-index: 1;
		margin-top: 50px;
		height: 100vh;
		position: fixed;
		padding: 20px 5px 5px 0px;
		top: 30px;
		left: 5px;
		white-space: nowrap;
		transition: ease-in-out;
	}

	.question {
		cursor: pointer;
		width: 250px;
	}
	.openbtn {
		z-index: 1;
		position: fixed;
		-webkit-transform: rotate(-90deg);
		transform: rotate(-90deg);
		cursor: pointer;
		left: 226px;
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
