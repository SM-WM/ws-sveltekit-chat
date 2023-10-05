<script>
	import Frame from './Frame.svelte';
</script>

<Frame>
	<div class="conversations" slot="chat-body">
		<a href="/chat">Chat</a>
		<a href="/chat">Chat</a>
		<a href="/chat">Chat</a>
		<a href="/chat">Chat</a>
	</div>
</Frame>

<style>
	.conversations {
		display: flex;
		flex-direction: column;
		padding-inline: 0.5rem;
		& a {
			padding: 1rem 0.5rem;
			margin-block: 0.25rem;
			border-radius: 10px;
			&:hover,
			&:focus {
				background-color: hsla(180, 0%, 50%, 0.15);
			}
		}
	}
</style>
