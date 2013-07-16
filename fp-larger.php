<div id='img-container'>
	<a class='close-button' href='javascript:CloseThis()'>
		<img src='image/process_stop24.png' />
	</a>
<?php
require_once('globals.php');

$imageSrc = urldecode($_POST['xsrc']);

$_html .= "&nbsp;<img src='" . $imageSrc . "' />";

print($_html);
?>
</div>