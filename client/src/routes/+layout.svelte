<script>
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	$: currentPage = $page.url.pathname;
	$: console.log(currentPage);
	$: isHomePage = currentPage === '/';
</script>

<header>
	<h1>Chat with me <span>❤</span></h1>
</header>
<main>
	<slot />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
	:global(html, body) {
		margin: 0;
		overflow: hidden;
		font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
			Geneva, Verdana, sans-serif;
	}
	:global(a) {
		color: inherit;
		text-decoration: none;
	}
	:global(button) {
		cursor: pointer;
	}
	:global(.hidden) {
		opacity: 0;
		pointer-events: none;
		user-select: none;
	}
	header {
		height: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: hsla(180, 60%, 10%, 1);
		color: hsla(180, 80%, 98%, 1);

		& h1 {
			font-family: 'Cookie', cursive;
			font-weight: 100;
			& span {
				font-size: 1.5rem;
				vertical-align: middle;
			}
		}
	}
	main {
		height: 92vh;
		display: grid;
		background-color: hsla(0, 0%, 8%, 1);
		color: white;
	}
</style>
