<?php
//lets build some DB functions

include('mysql.creds.php');

$query = 'SELECT floorplans.plannumber, floorplans.baseprice, floorplans.num_bed, floorplans.num_bath FROM floorplans WHERE user_deleted is null ORDER by plannumber';
// Send the query to MySQL 
$result = $mysqli->query($query, MYSQLI_STORE_RESULT);

// Recuperate the query resources
//$result->free();


//NOW attempting to tie this in to actual floorplans functionality
//-need to get all records in to DB table BUT now just three using as test


?>