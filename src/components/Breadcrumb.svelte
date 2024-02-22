<script>
	export let root = '';
	export let items = [];
	let className = '';
	export {className as class};
</script>

<div class="nox-breadcrumb {className}">
	{#each items as {url, title}, i (title)}
		{#if i === items.length - 1}
			<span>{title}</span>
		{:else}
			<a href="{root}{url}">{title}</a>
		{/if}
	{/each}
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
