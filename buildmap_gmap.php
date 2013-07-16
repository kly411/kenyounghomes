
<!--
THOUGHT - could still have separate links on menu bar for each subdivision but have the one page
just focus in and drop other markers and expand the appropriate accordion section.

-->
<div class='pageid'>buildmap</div>
<div id='mappage'>
	<div id='map_canvas'></div>

	<div id='places-stack'>

<?php
include('sql/subd-sql.php');

$result = $mysqli->query($query, MYSQLI_STORE_RESULT);

while(list($id,$name,$content) = $result->fetch_row()) {

	$_html .= "<h3><a href='#' class='accordion-header' id='$name'>$name</a></h3>";
	$_html .= "<div><p>$content</p></div>";
	echo "$_html";
	$_html = "";
}

$result->free();

?>

<input type='hidden' id='expanded' name='expanded' value='' class='hideme' />

</div></div>

<script type="text/javascript">
	initialize();
	$("#places-stack").accordion({
		active: false,
		collapsible: true
	});
</script>