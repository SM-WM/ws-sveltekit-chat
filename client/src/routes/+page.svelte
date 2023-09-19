<script lang="ts">
	import { idStore } from '../services/id';
	import { sendMessage } from '../socket';
	import { messagesStore } from '../state/messages';

	let messageInput = '';

	function handleSubmit() {
		if ($idStore) sendMessage($idStore, messageInput);
		messageInput = '';
	}

	let listRef: HTMLElement | undefined;
	$: {
		if (listRef)
			listRef.scrollTo({
				behavior: 'smooth',
				top: 0
			});
	}
</script>

<header>
	<h1>Chat with me &lt;3</h1>
</header>

<main>
	<div class="list-wrapper">
		<ul>
			{#each $messagesStore as message}
				{@const sent = message.userid === $idStore}
				<li class="message-wrapper" class:sent class:recieved={!sent}>
					<p>{message.content}</p>
				</li>
			{/each}
		</ul>
	</div>
	<form class="input-container" on:submit|preventDefault={handleSubmit}>
		<input type="text" bind:value={messageInput} />
		<button type="submit">Send</button>
	</form>
</main>

<style>
	header {
		height: 10vh;
		display: grid;
		place-items: center;
		background-color: bisque;
	}

	main {
		height: 90vh;
		display: grid;
		grid-template-rows: auto 80px;
	}

	button {
		background-color: deepskyblue;
		border: none;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		color: white;
	}

	input {
		padding: 0.2rem;
		font-size: 1rem;
	}

	.list-wrapper {
		overflow-y: scroll;
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: cornsilk;
	}

	ul {
		width: 50%;
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.message-wrapper {
		display: flex;
		justify-content: space-between;
		max-width: 50vmin;
		width: fit-content;
		& p {
			padding: 0.5rem 1rem;
			color: white;
			font-size: 1.25rem;
			border-radius: 1.25rem;
			overflow-wrap: break-word;
			background-color: dimgray;
			margin: 0;
		}
		&.sent {
			margin-left: auto;
			& p {
				background-color: deepskyblue;
			}
		}
	}

	.input-container {
		width: 100vw;
		background-color: bisque;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}
</style>
