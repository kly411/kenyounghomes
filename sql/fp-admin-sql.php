<?php
//lets build some DB functions

$query = "SELECT floorplans.id, floorplans.plannumber, floorplans.baseprice, floorplans.num_bed, floorplans.num_bath ";
$query .= "FROM floorplans WHERE user_deleted is null ORDER by plannumber";

//echo $query;

include('mysql.creds.php');

// Send the query to MySQL 
$result = $mysqli->query($query, MYSQLI_STORE_RESULT);




//NOW attempting to tie this in to actual floorplans functionality
//-need to get all records in to DB table BUT now just three using as test


?>