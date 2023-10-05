<div class="container">
	<div class="header">
		<slot name="chat-header" />
	</div>
	<div>
		<slot name="chat-body" />
	</div>
	<div class="footer">
		<slot name="chat-footer" />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: auto 1fr auto;
		overflow: hidden;
		width: 50vw;
		min-width: 400px;
		height: 90%;
		margin-inline: auto;
		margin-block: 2rem;
		border-radius: 25px;
		background-color: hsla(180, 0%, 30%, 0.2);
	}
	.header {
		height: 8vh;
		min-height: 50px;
		padding-block: 0.5rem;
		border-bottom: 2px solid hsla(180, 0%, 50%, 0.15);
	}
	.footer {
		height: 8vh;
		min-height: 50px;
		padding-block: 1rem;
	}
</style>
