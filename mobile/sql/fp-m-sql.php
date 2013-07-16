<?php
include('../../sql/fp-sql.php');

$return_arr = array();

//$_baseprice = "$" . money_format('%!.0i',$price);

setlocale(LC_MONETARY, 'en_US');

//NOW also handling sold, existing, and completion_date
/*
if(not sold)
	if(not existing)
		handle completion date
*/
while(list($plannumber,$baseprice,$num_bed,$num_bath) = $result->fetch_row()) {
    $row_array['plannum'] = $plannumber;
    $row_array['numbed'] = $num_bed;
    $row_array['numbath'] = $num_bath;
    $row_array['price'] = "$" . money_format('%!.0i',$baseprice);

    array_push($return_arr,$row_array);
                
}

echo json_encode($return_arr);

?>