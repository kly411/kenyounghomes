<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<META name="description" content="Homes that are available now as well as those soon to be completed" /> <!--PER-->
	<?php include('headcontent.php'); ?>
	<link rel='stylesheet' href='style/colorbox-inv.css' />
</head>

<body>

<p class='pageid hideme'>inventory</p>

<?php
require_once('globals.php');
include_once('includes/header4i.htm');
include_once('sql/inv-sql.php'); //PER

//LOAD - dropmenu nav bar
include_once('includes/dropmenu.htm');


echo "<div class='content-area'>";
echo "<div class='wrapper'>";

$_output = "<div class='page-inventory'>";

$_output .= "<div id='lease-advisory'>Lease-eligible properties can be found on the <a href='lease.php'>Lease Option page</a>.</div>";
$_output .= "<br />";

$_table = $_break . "<table id='inv-table'>";
$_table .= $_break . $_tab . "<thead>";
$_table .= $_break . $_tab . $_tab . "<tr id='inv-header' class='hrow corner5'>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>SUBDIVISION</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>ADDRESS</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>PRICE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>SqFt</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>COMPLETION DATE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>SQFT PRICE</th>";
$_table .= $_break . $_tab . $_tab . "</tr>";
$_table .= $_break . $_tab . "</thead>";

$_table .= $_break . $_tab . "<tbody>";

while(list($pk,$subdivision,$address,$price,$plan_number,$completion_date,$is_sold,$existing,$today) = $result->fetch_row()) {


	$_baseprice = "$" . money_format('%!.0i',$price);
	$_sqft_price = (int)$price / (int)$plan_number;
	$_sqft_price = "$" . money_format('%!.2i',$_sqft_price);

	$alt_compdate = preg_replace("/-/","",$completion_date);
	$alt_today = preg_replace("/-/","",$today);


	if($is_sold) {
		$_date = "<span class='bold-red'>SOLD</span>";
	} else if($existing) {
		$_date = "PRE-OWNED";
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
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='address'>$address</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td id='baseprice'>$_baseprice</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td>$plan_number</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td>$_date</td>";
	$_table .= $_break . $_tab . $_tab . $_tab . "<td>$_sqft_price</td>";
	//$_table .= $_break . $_tab . $_tab . $_tab . "<td><input type='checkbox' disabled='disabled' $checked /></td>";
	$_table .= $_break . $_tab . $_tab . "</tr>";

}

$_table .= $_break . $_tab . "</tbody>";
$_table .= $_break . "</table>";

$_output .= $_table . "</div>";


echo $_output;

// Recuperate the query resources
$result->free();
?>
<div class='clickable'><div id='pointer'><img src='image/mouse-pointer.png' /></div><div id='click-message'>Click on any row to view pictures</div></div>

</div> <!-- END wrapper -->
</div>
<div id='RegisterErrors'></div>
</body>
<script type='text/javascript'>
	ColorMe();
</script>
</html>
