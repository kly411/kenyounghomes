

<?php

include('picasa.php');

ListPhotosByTags("slideshow");
?>

<div id='identifier' class='hideme'>home</div>
<div class='pageid hideme'>home</div>

<div id='page-gallery'>

	<div id='gallery-cb'>
		<?php echo $slideHtml; ?>
	</div>
	
	<div id='home-right'>
		<div id='blurb' class='formal'>
			With an immediate staff boasting a collective 50+ years in residential construction experience, it's
			safe to assume that we've learned what does and doesn't work. Further, by paying attention to our many
			customers, we've amassed quite a perspective on what you, the consumer, consider quality to be.
			Experience, customer feedback, industry research, and integrity guide us daily to deliver quality homes
			at affordable prices.
		</div>
		<div class='hspace1'>&nbsp;</div>
		<div id='fblike'>
			<iframe allowtransparency="true" src="https://www.facebook.com/plugins/like.php?href=http://www.facebook.com/pages/Ken-Young-Company/461196707258440"
					scrolling="no" frameborder="0"
					style="border:none; width:350px; height:80px">
			</iframe>
		</div>
		<div class='hspace1'>&nbsp;</div>
		<div id='tpraclogo'>Site/App by <a href='http://www.techpractical.com' target='_blank'>TechPractical.com</a></div>
	</div>
	
</div>
<script>
	DoSlideShow();
</script>
