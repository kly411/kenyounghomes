<?php

if(isset($_POST['propaddr'])) {
	//handle action before rendering page
	include('../sql/inv-do-update.php');
}

include('../sql/inv-sql.php');

setlocale(LC_MONETARY, 'en_US');

$_break = "\n";
$_tab = "  ";


$_output = "<div class='page-inventory'>";

$_table = $_break . "<table id='inv-table'>";
$_table .= $_break . $_tab . "<thead>";
$_table .= $_break . $_tab . $_tab . "<tr id='inv-header' class='hrow corner5'>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='subdivision'>SUBDIVISION</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='propaddr'>ADDRESS</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='baseprice'>PRICE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='plannum'>SqFt</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='comp-date'>COMPLETION DATE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='sqft-price'>SQFT PRICE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='lease-price'>LEASE PRICE</th>";
//$_table .= $_break . $_tab . $_tab . $_tab . "<th>SOLD</th>";
$_table .= $_break . $_tab . $_tab . "</tr>";
$_table .= $_break . $_tab . "</thead>";

$_table .= $_break . $_tab . "<tbody>";

while(list($subdivision,$address,$price,$plan_number,$completion_date,$sold,$existing,$today,$_lease_price) = $result->fetch_row()) {

	$_baseprice = "$" . money_format('%!.0i',$price);
	$_sqft_price = (int)$price / (int)$plan_number;
	$_sqft_price = "$" . money_format('%!.2i',$_sqft_price);

	if($_lease_price!='') {
		$_lease_price = "$" . money_format('%!.2i',$_lease_price);
	}

	$alt_compdate = preg_replace("/-/","",$completion_date);
	$alt_today = preg_replace("/-/","",$today);


	if($is_sold) {
		$_date = "<span class='bold-red'>SOLD</span>";
	} else if($existing) {
		$_date = "EXISTING";
	} else {
		if($completion_date>$today) {
			$_date = DATE("m/d/Y",strtotime($completion_date));
		} else {
			$_date = "FINISHED";
		}
	}

	if($is_sold) {
		$checked = " checked='checked' ";
	} else {
		$checked = "";
	}

	$_table .= $_break . $_tab . $_tab . "<tr class='rtt' id='" . $plan_number . "'>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='subdivision'>$subdivision</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='propaddr'>$address</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='baseprice'>$_baseprice</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='plannum'>$plan_number</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='comp-date'>$_date</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='sqft-price'>$_sqft_price</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='lease-price'>$_lease_price</td>";
	//$_table .= $_break . $_tab . $_tab . $_tab . "<td><input type='checkbox' disabled='disabled' $checked /></td>";
	$_table .= $_break . $_tab . $_tab . "</tr>";

}

$_table .= $_break . $_tab . "</tbody>";

$_table .= $_break . "</table>";

$_output .= $_table;
$_output .= "<a class='add-button' href='#'>ADD</a>";
$_output .= "</div>";

echo $_output;

// Recuperate the query resources
$result->free();

?>
<input type='hidden' id='upd-address' name='upd-address' value="<?php echo $updated_address; ?>" />
<script type="text/javascript">

	var _invtable = $('#inv-table').dataTable({
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": false,
		"bAutoWidth": false
	});

	$().ready(function() {

		$('.content-area').css({'backgroundColor':'#FFF'});

		$('#inv-table tr').not('.hrow').click(function(){
			DoEditRow(this);
		});
		$('.add-button').click(function(){
			DoAddRow();
		});
		var _upd_address = $('#upd-address').attr('value');
		if(_upd_address!='') {
			ShowUpdateResult();
		}

		$('.lastupdated').css({'backgroundColor':'lightgreen'});

	});

</script>
<?php
//build hidden set of subdivisions for grab by javascript
while(list($name) = $r_subdivisions->fetch_row()) {
	$_subd_set .= "<div class='subd-set hideme'>$name</div>";
}
echo $_subd_set;
$r_subdivisions->free();
?>

