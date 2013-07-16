<?php
//lets build some DB functions

$plan_number = $_POST['plannum'];
$price = $_POST['baseprice'];
$numbed = $_POST['numbed'];
$numbath = $_POST['numbath'];
$_id = $_POST['upd-id'];

$deleteme = $_POST['deleteme'];
$addme = $_POST['addme'];

//echo "POST vars: $plan_number $price $numbed $numbath add: $addme<br>";

//STRIP non numeric characters from price
$price = preg_replace("/[^0-9]/", "", $price);

if($deleteme) {
	//bail on all other processing and just delete this records
	//echo "delete is true";

	$updQuery = "UPDATE floorplans SET user_deleted=curdate() WHERE id=$_id";

} else if($addme) {

	$updQuery = "INSERT INTO floorplans (plannumber,baseprice,num_bed,num_bath) ";
	$updQuery .= "VALUES ($plan_number,'$price',$numbed,$numbath)";

} else {

	$updQuery = "UPDATE floorplans SET plannumber=$plan_number, ";
	$updQuery .= "baseprice='$price', ";
	$updQuery .= " num_bed=$numbed, num_bath=$numbath";
	$updQuery .= " WHERE id=$_id and user_deleted is null";
}

//echo $updQuery;

include('mysql.creds.php');

// Send the query to MySQL 
$result = $mysqli->query($updQuery, MYSQLI_STORE_RESULT);

if($mysqli->error) {
	echo "ERROR: " . $mysqli->error . "<br>";
}

$mysqli->commit();
?>