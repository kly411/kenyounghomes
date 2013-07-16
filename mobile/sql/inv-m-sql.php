<?php
include('../../sql/inv-sql.php');

$return_arr = array();

//$_baseprice = "$" . money_format('%!.0i',$price);

setlocale(LC_MONETARY, 'en_US');

//NOW also handling sold, existing, and completion_date
/*
if(not sold)
	if(not existing)
		handle completion date
*/
while(list($address,$subdivision,$price,$plan_number,$existing,$completion_date) = $resultmobile->fetch_row()) {
    $row_array['address'] = $address;
    $row_array['subdivision'] = $subdivision;
    $row_array['price'] = "$" . money_format('%!.0i',$price);
    $row_array['plannum'] = $plan_number;
    
    //do status for return to mobile

    if($existing==0) {
	    //at this point, we use completion date
	    $row_array['status'] = $completion_date;
    } else {
	    $row_array['status'] = "PRE-OWNED";
    }

    array_push($return_arr,$row_array);
                
}

echo json_encode($return_arr);

?>