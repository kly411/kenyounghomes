<?php
//lets build some DB functions


$rowid = $_POST['rowid'];
$subdname = $_POST['subd-name'];
$content = $_POST['txt-content'];
//What is the intended action
$action = $_POST['dowhat'];



//echo "<br /><br />post vars subdname: $subdname dowhat: $dowhat<br />";

$query = 'SELECT id, name, content FROM subdivisions WHERE status=1 and name != "Custom Homes" order by name';
$queryCustomHomes = 'SELECT id, name, content FROM subdivisions WHERE status=1 and name="Custom Homes"';
$queryMobile = 'SELECT name, content, coord_lat, coord_long FROM subdivisions WHERE status=1 order by sortlevel, name';


if($action=='add') {
	$updQuery = "INSERT INTO subdivisions (name, content, date_modified, status) ";
	$updQuery .= "VALUES ('$subdname','$content',DATE(NOW()),1)";
} elseif($action=='delete') {
	$updQuery = "UPDATE subdivisions SET status=0, date_modified=DATE(NOW()) WHERE id=$rowid";
} else {
	$updQuery = "UPDATE subdivisions SET name='$subdname', content='$content', date_modified=DATE(NOW()) WHERE id=$rowid";
}

include('mysql.creds.php');

//echo $updQuery;
?>