<script>
	export let href = '#';
	export let external = false;
	export let scroll = false;

	let className = '';
	export {className as class};

	const doScroll = e => {
		e.preventDefault();
		document.querySelector(scroll).scrollIntoView({behavior: 'smooth'});
	};

	$: target = external ? '_blank' : null;
	$: rel = external ? 'nofollow noopener noreferrer' : null;
	$: click = scroll ? doScroll : null;
</script>

<a on:click={click} {href} {target} {rel} class={className}><slot /></a>
