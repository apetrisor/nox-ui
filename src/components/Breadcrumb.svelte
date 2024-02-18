<script>
	export let root = '';
	export let items = [];
	export let current;
	let className = '';
	export {className as class};
</script>

<div class="nox-breadcrumb {className}">
	{#each items as item}
		<a href={`${root}${item.url}`}>{item.title}</a>
	{/each}
	{#if current}
		<span>{current}</span>
	{/if}
</div>

<style lang="scss" global>
	.nox-breadcrumb {
		font-size: 0.875rem;
		a {
			&:after {
				content: '>';
				display: inline-block;
				padding: 0 10px;
			}
			&:last-child:after {
				display: none;
			}
		}
	}
</style>
