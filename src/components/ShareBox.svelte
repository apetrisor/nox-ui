<script>
	import FaPinterest from 'svelte-icons/fa/FaPinterest.svelte';
	import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	export let title;
	export let extra = '';
	export let url;
	export let image;

	let facebookLink = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
	let twitterLink = encodeURI(`https://twitter.com/intent/tweet?text=${title} ${extra} ${url}`);
	let pinterestLink = encodeURI(`http://pinterest.com/pin/create/bookmarklet/?media=${image}&url=${url}&is_video=false&description=${title}`);
</script>

<style lang="sass">
	.buttons
		display: flex
		justify-content: center
	a
		width: 24px
		height: 24px
		margin: 10px;

</style>

<div>
	<div>Share with your friends</div>
	<div class="buttons">
		<a rel="nofollow" target="_blank" href={facebookLink}>
			<FaFacebookF />
		</a>
		<a rel="nofollow" target="_blank" href={twitterLink}>
			<FaTwitter />
		</a>
		<a rel="nofollow" target="_blank" href={pinterestLink}>
			<FaPinterest />
		</a>
	</div>
</div>
