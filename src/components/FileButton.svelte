<script>
	export let name = '';
	let className = '';
	export {className as class};
	export let buttonClass;
	let fileInput;

	export let files;

	const onButtonClick = () => {
		if (fileInput) fileInput.click();
	};
</script>

<div class="nox-file-button {className}">
	<input type="file" bind:this={fileInput} bind:files {name} {...$$restProps} on:change />

	<button class={buttonClass} type="button" disabled={$$restProps.disabled} on:click={onButtonClick} on:keydown on:keyup on:keypress>
		<slot>Select a File</slot>
	</button>
</div>

<style lang="scss" global>
	.nox-file-button {
		input {
			display: none;
		}
	}
</style>
