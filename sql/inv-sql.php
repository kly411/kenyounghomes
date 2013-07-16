<?php
//lets build some DB functions

$query = 'SELECT inventory.pk, inventory.subdivision, inventory.address, inventory.price, inventory.plan_number,
			inventory.completion_date, inventory.sold, inventory.existing, DATE(NOW()) as today, lease_price
			FROM inventory WHERE user_deleted is null ORDER by plan_number';

$q_mobile = 'SELECT inventory.address, inventory.subdivision, inventory.price, inventory.plan_number, inventory.existing,
			inventory.completion_date
			FROM inventory WHERE user_deleted is null and sold=0 ORDER by plan_number';

$q_subdivisions = 'SELECT name from subdivisions';

include('mysql.creds.php');

// Send the query to MySQL 
$result = $mysqli->query($query, MYSQLI_STORE_RESULT);
$resultmobile = $mysqli->query($q_mobile, MYSQLI_STORE_RESULT);
$r_subdivisions = $mysqli->query($q_subdivisions, MYSQLI_STORE_RESULT);
?>