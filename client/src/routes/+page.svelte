<script lang="ts">
	import { idStore } from '../services/id';
	import { sendMessage } from '../socket';
	import { messagesStore } from '../state/messages';
	import Icon from '@iconify/svelte';

	let messageInput = '';

	function handleSubmit() {
		if ($idStore) sendMessage(messageInput, $idStore);
		messageInput = '';
	}

	let listRef: HTMLElement;
	$: if ($messagesStore.length > 0 && listRef) {
		scrollToBottom(listRef);
	}
	const scrollToBottom = async (node: HTMLElement) => {
		const interval = setTimeout(() => {
			node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
		}, 100);
		return () => clearInterval(interval);
	};
</script>

<header>
	<h1>Chat with me <span>❤</span></h1>
</header>

<main>
	<div class="container">
		<div class="header">
			<button>
				<Icon icon="lucide:arrow-left" />
			</button>
			<h2>Chat</h2>
			<button>
				<Icon icon="lucide:menu" />
			</button>
		</div>
		<ul class="list-wrapper" bind:this={listRef}>
			{#each $messagesStore as message}
				{@const sent = message.userid === $idStore}
				<li class="message-wrapper" class:sent class:recieved={!sent}>
					<p>{message.content}</p>
				</li>
			{/each}
		</ul>
		<form class="input-container" on:submit|preventDefault={handleSubmit}>
			<input type="text" bind:value={messageInput} />
			<button type="submit">Send</button>
		</form>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');

	h1 {
		font-family: 'Cookie', cursive;
		font-weight: 100;
		& span {
			font-size: 1.5rem;
			vertical-align: middle;
		}
	}
	header {
		height: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: hsla(180, 60%, 10%, 1);
		color: hsla(180, 80%, 98%, 1);
	}

	main {
		height: 92vh;
		display: grid;
		background-color: hsla(0, 0%, 8%, 1);
		color: white;
	}

	.container {
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow: hidden;
		width: 50vw;
		min-width: 400px;
		margin-inline: auto;
		margin-block: 2rem;
		border-radius: 25px;
		background-color: hsla(180, 0%, 30%, 0.2);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.25rem 1rem;
		font-size: 1.15rem;
		border-bottom: 2px solid hsla(180, 0%, 50%, 0.15);
		& button {
			display: grid;
			place-items: center;
			border: none;
			border-radius: 50%;
			padding: 0.5rem;
			background-color: transparent;
			font-size: 1.5rem;
			color: coral;
			&:hover,
			&:focus {
				background-color: hsla(180, 0%, 50%, 0.15);
			}
		}
	}

	.input-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 1rem;

		& input,
		button {
			padding: 15px;
			border-radius: 100px;
			color: white;
			font-size: 1rem;
		}

		& input {
			flex-grow: 1;
			border: 2px solid hsla(180, 0%, 50%, 0.15);
			background-color: transparent;

			&:focus {
				outline: none;
				border-color: hsla(180, 0%, 70%, 0.25);
			}
		}

		& button {
			background-color: deepskyblue;
			border: none;
		}
	}

	ul.list-wrapper {
		overflow-y: scroll;
		list-style: none;
		margin: 0;
		padding: 0.25rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	li.message-wrapper {
		display: flex;
		justify-content: space-between;
		max-width: 50vmin;
		width: fit-content;
		& p {
			padding: 0.5rem 1rem;
			color: white;
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
</style>
