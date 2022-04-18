<!-- 
File Name      : Welcome.svelte
Description    : Testkit using Svelte.
Author         : Arpan Jain
version        : 1.0
Created Date   : 24/03/2022
Updated By     : Arpan Jain
Updated Date   : 11/04/2022
Last Update    : 18/04.2022
-->




<script>
	let src = '../src/image/ucertify.png';
</script>

<main>
	
	<h1><img {src} alt="logo" /> uCertify Test Prep</h1>
</main>

<style>
	
	main {
		background-color: white;
		width: 100vw;
		min-height: 8vh;
	}
	img {
		float: left;
		margin: 0px;
		height: 6vh;
	}

	h1 {
		text-align: center;
		height: 7vh;
		color: black;
		border: solid black;
		border-width: 2px 0px 2px 0px;
		font-size: 5vh;
		margin-top: 0vh;
		margin-bottom: 0px;
		font-weight: 500;
	}
</style>
