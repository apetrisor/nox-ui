<script>
	export let columns = 2;

	let columnClass = 'w-full md:w-1/2';
	$: if (columns === 3) columnClass += ' lg:w-1/3';
	$: if (columns === 4) columnClass += ' lg:w-1/4';
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-footer {
		border-top: 1px solid $gray-200;
		margin-top: 50px;
		padding: 50px 0px;
		text-align: center;
		@screen lg {
			text-align: left;
		}

		div[class^='col'] {
			margin-bottom: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
			&:last-child {
				margin-bottom: 0;
			}
			@include screen-lg {
				margin-bottom: 0;
			}
			> div {
				display: flex;
				flex-direction: column;
				align-items: center;
				@include screen-lg {
					align-items: flex-start;
				}
			}
		}
		h2 {
			font-size: 1.5rem;
		}
	}
</style>

<div class="nox-footer">
	<div class="container flex flex-wrap">
		{#if $$slots.col1}
			<div class="col1 {columnClass}">
				<slot name="col1" />
			</div>
		{/if}
		{#if columns >= 2 && $$slots.col2}
			<div class="col2 {columnClass}">
				<slot name="col2" />
			</div>
		{/if}
		{#if columns >= 3 && $$slots.col3}
			<div class="col3 {columnClass}">
				<slot name="col3" />
			</div>
		{/if}
		{#if columns >= 4 && $$slots.col4}
			<div class="col4 {columnClass}">
				<slot name="col4" />
			</div>
		{/if}
	</div>
</div>
