
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<META name="description" content="Neighborhoods in which we are currently building" /> <!--PER-->
	<?php include('headcontent.php'); ?>
	<link rel='stylesheet' href='style/colorbox.css' />
</head>

<body>

<div class='pageid hideme'>buildmap</div>

<?php
include('sql/subd-sql.php');
require_once('globals.php');
include_once('includes/header4i.htm');
include_once('includes/dropmenu.htm');
?>

<div class='content-area'>
<div class='wrapper'>

<div id='mappage'>
	<div id='map_canvas'></div>
	<div id='places-stack'>


<?php

$result = $mysqli->query($query, MYSQLI_STORE_RESULT);

while(list($id,$name,$content) = $result->fetch_row()) {

	//get no-spaces and lowercase version of subd name for use as ID attribute
	$_subdID = strtolower(str_replace(" ", "", $name));

	$_html .= "<h3><a href='#' id='$_subdID'>$name</a></h3>";
	$_html .= "<div><p>$content</p></div>";
	echo "$_html";
	$_html = "";
}

$result->free();

//Repeat for just the Custom Homes entry
$result = $mysqli->query($queryCustomHomes, MYSQLI_STORE_RESULT);
while(list($id,$name,$content) = $result->fetch_row()) {
	//get no-spaces and lowercase version of subd name for use as ID attribute
	$_subdID = strtolower(str_replace(" ", "", $name));

	$_html .= "<h3><a href='#' id='$_subdID'>$name</a></h3>";
	$_html .= "<div><p>$content</p></div>";
	echo "$_html";
	$_html = "";
}
$result->free();
?>

</div></div>

<script type="text/javascript">
	initialize();
	$("#places-stack").accordion({
		active: false,
		collapsible: true
	});
</script>
	</div></div>
</body>
</html>