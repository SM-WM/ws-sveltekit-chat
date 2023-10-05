<script lang="ts">
	import { idStore } from '../../services/id';
	import { sendMessage } from '../../socket';
	import { messagesStore } from '../../state/messages';
	import Icon from '@iconify/svelte';
	import Frame from '../Frame.svelte';

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

<Frame>
	<div class="chat-header" slot="chat-header">
		<a href="/" class="header-button">
			<Icon icon="lucide:arrow-left" />
		</a>
		<h2>Chat</h2>
		<a href="/chat" class="header-button">
			<Icon icon="lucide:menu" />
		</a>
	</div>

	<ul class="chat-body" slot="chat-body" bind:this={listRef}>
		{#each $messagesStore as message}
			{@const sent = message.userid === $idStore}
			<li class="message-wrapper" class:sent class:recieved={!sent}>
				<p>{message.content}</p>
			</li>
		{/each}
	</ul>

	<form class="input-container" slot="chat-footer" on:submit|preventDefault={handleSubmit}>
		<input type="text" bind:value={messageInput} />
		<button type="submit">Send</button>
	</form>
</Frame>

<style>
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;
		padding: 0 1rem;
		font-size: 1.15rem;

		& .header-button {
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

	ul.chat-body {
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
