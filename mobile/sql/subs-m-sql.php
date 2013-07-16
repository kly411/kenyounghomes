<?php
include('../../sql/subd-sql.php');

$result = $mysqli->query($queryMobile, MYSQLI_STORE_RESULT);

$return_arr = array();


//$_baseprice = "$" . money_format('%!.0i',$price);

setlocale(LC_MONETARY, 'en_US');

while(list($name,$content,$coord_lat,$coord_long) = $result->fetch_row()) {
    $row_array['subname'] = $name;
    $row_array['subdesc'] = $content;
    $row_array['latitude'] = $coord_lat;
    $row_array['longitude'] = $coord_long;
    
    array_push($return_arr,$row_array);
                
}

echo json_encode($return_arr);

?>