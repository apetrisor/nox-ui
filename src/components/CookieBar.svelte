<script>
	import {onMount} from 'svelte';

	let visible = false;

	onMount(() => {
		if (localStorage && !localStorage.getItem('acceptedCookies')) {
			visible = true;
		}
	});

	const handleAccept = () => {
		if (localStorage) localStorage.setItem('acceptedCookies', true);
		visible = false;
	};
</script>

{#if visible}
	<div class="nox-cookie-bar">
		<slot>We're using little cookies to improve your awesome surfing experience</slot>
		<span on:click={handleAccept}>
			<slot name="button">
				<button>Ok</button>
			</slot>
		</span>
	</div>
{/if}

<style lang="scss" global>
	.nox-cookie-bar {
		color: #fff;
		background: #1d1d29;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;

		> span {
			margin-left: 3rem;
		}
	}
</style>
