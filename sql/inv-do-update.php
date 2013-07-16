<?php
//lets build some DB functions

$key = $_POST['key'];
$subdivision = $_POST['subdivision'];
$address = $_POST['propaddr'];
$orig_address = $_POST['orig-address'];
$plan_number = $_POST['plannum'];
$price = $_POST['baseprice'];
$date = $_POST['comp-date'];
$sold = $_POST['sold'];
$existing = $_POST['existing'];
$lease_price = $_POST['lease-price'];

$deleteme = $_POST['deleteme'];
$addme = $_POST['addme'];

//retain address for highlighting updated row on page refresh
if($orig_address!=$address) {
	$updated_address = $address;
} else {
	$updated_address = $orig_address;
}

//echo "POST vars: $subdivision $address $plan_number $price $date sold: $sold add: $addme existing: $existing<br>";

if(!($sold)) {$sold = 0;}
if(!($existing)) {$existing = 0;}
if(!($lease_price)) {$lease_price = "NULL";}

//STRIP non numeric characters from price
$price = preg_replace("/[^0-9]/", "", $price);
//$subdivision = preg_replace("/'/", "\\'", $subdivision);
//$address = preg_replace("/'/", "\\'", $address);

if($deleteme) {
	//bail on all other processing and just delete this records
	//echo "delete is true";

	$updQuery = "UPDATE inventory SET user_deleted=curdate() WHERE pk=$key";

} else if($addme) {

	$updQuery = "INSERT INTO inventory (subdivision,address,plan_number,price,completion_date,existing,sold,lease_price) ";
	$updQuery .= "VALUES ('$subdivision','$address',$plan_number,'$price',str_to_date('$date','%m/%d/%Y'),$existing,$sold,$lease_price)";

} else {

	$updQuery = "UPDATE inventory SET plan_number=$plan_number, subdivision='$subdivision', address='$address',";
	$updQuery .= " price='$price',completion_date=str_to_date('$date','%m/%d/%Y'),";
	$updQuery .= " existing=$existing,sold=$sold,lease_price=$lease_price";
	$updQuery .= " WHERE pk=$key and user_deleted is null";
}

//echo $updQuery;

include('mysql.creds.php');

// Send the query to MySQL 
$result = $mysqli->query($updQuery, MYSQLI_STORE_RESULT);

if($mysqli->error) {
	//echo "ERROR: " . $mysqli->error . "<br>";
	try {
		throw new Exception('Mysqli Error.');		
	} catch (Exception $e) {
    	include "../errors/500.php";
    	exit();
    }
} else {
	$mysqli->commit();
	echo "<p class='result hideme'>success</p>";
}

?>