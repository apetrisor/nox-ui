<script>
	export let breakpoint = 'md';

	// How many columns do we have?
	let count = 0;
	Object.keys($$slots).forEach(key => {
		if (key.startsWith('col')) count++;
	});

	let columnClass = `w-full ${breakpoint}:w-1/2`;
	if (count === 3) columnClass += ' lg:w-1/3';
	if (count === 4) columnClass += ' lg:w-1/4';
</script>

<style lang="scss" global>
	.nox-columns {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: -40px;

		> div[class^='col'] {
			margin-bottom: 40px;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		[slot^='col'] {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&.sm [slot^='col'] {
			@screen sm {
				align-items: flex-start;
			}
		}

		&.md [slot^='col'] {
			@screen md {
				align-items: flex-start;
			}
		}

		&.lg [slot^='col'] {
			@screen lg {
				align-items: flex-start;
			}
		}
	}
</style>

<div class="nox-columns {breakpoint}">
	{#if $$slots.col1}
		<div class="col1 {columnClass}">
			<slot name="col1" />
		</div>
	{/if}
	{#if $$slots.col2}
		<div class="col2 {columnClass}">
			<slot name="col2" />
		</div>
	{/if}
	{#if $$slots.col3}
		<div class="col3 {columnClass}">
			<slot name="col3" />
		</div>
	{/if}
	{#if $$slots.col4}
		<div class="col4 {columnClass}">
			<slot name="col4" />
		</div>
	{/if}
</div>
