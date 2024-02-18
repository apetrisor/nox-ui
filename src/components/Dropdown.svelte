<script>
	import {fly} from 'svelte/transition';

	export let options = [];
	export let value;
	export let position = 'bottom left';

	let className = '';
	export {className as class};

	let open = false;

	const handleOpen = () => {
		open = true;
		const handleClick = () => {
			document.removeEventListener('click', handleClick);
			open = false;
		};
		document.addEventListener('click', handleClick);
	};

	let current = options[0];
	$: {
		options.forEach(o => {
			if (o.value === value) current = o;
		});
	}
</script>

<div class="nox-dropdown {className}">
	<button class="value" on:click|stopPropagation={handleOpen}>{current.label}</button>
	<button class="value-long" on:click|stopPropagation={handleOpen}>{current.labelLong || current.label}</button>
	{#if open}
		<ul class="items {position}" transition:fly={{y: -20, duration: 300}}>
			<li><a href={current.url}>{current.labelLong || current.label}</a></li>
			{#each options as option (option.value)}
				{#if option.value !== value}
					<li><a href={option.url}>{option.labelLong || option.label}</a></li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-dropdown {
		position: relative;

		.value {
			font-size: 1.75rem;
			@screen md {
				display: none;
			}
		}
		.value-long {
			display: none;
			@screen md {
				display: block;
			}
		}

		.items {
			position: absolute;
			background: #fff;
			white-space: nowrap;
			max-width: 100vh;
			border-radius: 6px;
			box-shadow: $shadow-2xl;
			font-size: 0.875rem;
			overflow: hidden;

			&.top {
				bottom: 0;
			}
			&.bottom {
				top: 0;
			}
			&.left {
				right: 0;
			}
			&.right {
				left: 0;
			}
			li {
				a {
					padding: 10px 15px;
					display: block;
					border-bottom: 1px solid #f0f0f0;
				}
				&:last-child a {
					border: none;
				}
			}
		}
	}
</style>
