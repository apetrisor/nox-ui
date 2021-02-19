<script>
	import FaPinterest from 'svelte-icons/fa/FaPinterest.svelte';
	import FaFacebookF from 'svelte-icons/fa/FaFacebookF.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	export let title;
	export let extra = '';
	export let url;
	export let image;
	export let hashtags;

	$: facebookLink = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
	$: twitterLink = encodeURI(`https://twitter.com/intent/tweet?url=${url}&text=${title} ${extra}&hashtags=${hashtags}`);
	$: pinterestLink = encodeURI(`http://pinterest.com/pin/create/bookmarklet/?media=${image}&url=${url}&is_video=false&description=${title}`);
</script>

<style lang="sass">
	.nox-share-box
		.buttons
			display: flex
			justify-content: center
		a
			width: 24px
			height: 24px
			margin: 10px
</style>

<div class="nox-share-box">
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
		<!-- <a href="https://api.whatsapp.com/send?text=urlencodedtext" target="_blank">WA</a> -->
		<!-- <a rel="nofollow" target="_blank" href="whatsapp://send?text=The text to share!" data-action="share/whatsapp/share">Share via Whatsapp</a> -->
	</div>
</div>
