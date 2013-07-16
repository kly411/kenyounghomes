
<?php

if(isset($_POST['upd-id'])) {
	//handle action before rendering page
	include('../sql/fp-do-update.php');
	$upd_id = $_POST['upd-id'];
}

include('../sql/fp-admin-sql.php');

setlocale(LC_MONETARY, 'en_US');

$_break = "\n";
$_tab = "  ";

$_output = "<div class='page-floorplans'>";

$_table = $_break . "<table id='fp-table'>";
$_table .= $_break . $_tab . "<thead>";
$_table .= $_break . $_tab . $_tab . "<tr id='fp-header' class='hrow corner5'>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='upd-id' class='hideme'>ROW ID</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='plannum'>PLAN</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='baseprice'>PRICE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='numbed'>BEDROOMS</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th id='numbath'>BATHROOMS</th>";
$_table .= $_break . $_tab . $_tab . "</tr>";

$_table .= $_break . $_tab . "</thead>";

$_table .= $_break . $_tab . "<tbody>";

while(list($id,$plan_number,$price,$numbed,$numbath) = $result->fetch_row()) {

	$_baseprice = "$" . money_format('%!.0i',$price);
	//$_sqft_price = (int)$price / (int)$plan_number;
	//$_sqft_price = "$" . money_format('%!.0i',$_sqft_price);

	//Check if this row is the last one updated.  If so, add a class for highlighting.
	$_class = "";
	if($id==$upd_id) {
		$_class = " class='lastupdated' ";
	}


	$_table .= $_break . $_tab . $_tab . "<tr " . $_class . " id='" . $plan_number . "'>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='upd-id' class='hideme'>$id</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='plannum' class='edit-ok'>$plan_number</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='baseprice' class='edit-ok'>$_baseprice</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='numbed' class='edit-ok'>$numbed</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='numbath' class='edit-ok'>$numbath</td>";
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
<input type="checkbox" />
<input type='hidden' id='upd-id' name='upd-id' value="<?php echo $updated_id; ?>" />
<script type="text/javascript">

	var _invtable = $('#fp-table').dataTable({
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bSort": true,
		"bInfo": false,
		"bAutoWidth": false
	});


	$().ready(function() {

		$('.content-area').css({'backgroundColor':'#FFF'});

		$('#fp-table tr').not('.hrow').click(function(){
			DoEditRowFP(this);
		});

		$('.add-button').click(function(){
			DoAddRowFP();
		});

		if($('#upd-id').attr('value')) {
			var _upd_id = $('#upd-id').attr('value');
			if(_upd_id!=''&&_upd_id!='undefined') {
				alert(_upd_id);
				ShowUpdateResult();
			}

			$('.lastupdated').css({'backgroundColor':'lightgreen'});
		}


	});

</script>
