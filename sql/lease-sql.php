<?php
//lets build some DB functions

$query = 'SELECT inventory.subdivision, inventory.address, inventory.price, inventory.plan_number,
			inventory.completion_date, inventory.sold, inventory.existing, DATE(NOW()) as today, inventory.lease_price
			FROM inventory WHERE lease_price is not null AND user_deleted is null ORDER by plan_number';

include('mysql.creds.php');

// Send the query to MySQL 
$result = $mysqli->query($query, MYSQLI_STORE_RESULT);
?>