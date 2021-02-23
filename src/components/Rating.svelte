<script>
	export let score;
	export let structuredData;

	let structuredJSON;
	$: {
		if (structuredData) {
			structuredJSON = {
				'@context': 'https://www.schema.org',
				'@type': 'product',
				...structuredData,
			};
		}
	}
</script>

<style lang="scss" global>
	@import '../styles/variables';

	.nox-rating {
		max-width: 250px;
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		background-color: $gray-200;
		border-radius: 8px;
		padding: 15px 20px;

		.title {
			color: $gray-500;
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 0.875rem;
			text-transform: uppercase;
		}

		.score {
			color: $red-400;
			display: flex;
			align-items: center;
			font-weight: 500;
			font-size: 1.5rem;
		}

		.stars, .foreground {
			height: 22px;
			background-size: 22px;
			background-repeat: repeat-x;
		}

		.stars {
			width: 110px;
			background-image: url('data:image/svg+xml;charset=utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23CBD5E0" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>');
		}

		.foreground {
			background-image: url('data:image/svg+xml;charset=utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="%23F56565" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>');
		}
	}
</style>

{#if structuredJSON}
	{@html '<script type="application/ld+json">' + `${JSON.stringify(structuredJSON)}</script>`}
{/if}

<div class="nox-rating">
	<div class="title">
		<slot />
	</div>
	<div class="score">
		<div class="mr-2">{score}</div>
		<div class="stars">
			<div class="foreground" style="width: {(score / 5) * 100}%" />
		</div>
	</div>
</div>
