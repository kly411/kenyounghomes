
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<META name="description" content="Lease with an option to buy" /> <!--PER-->
	<?php include('headcontent.php'); ?>
	<link rel='stylesheet' href='style/colorbox-inv.css' />
</head>

<body>

<p class='pageid hideme'>lease</p>

<?php
include('sql/lease-sql.php');
require_once('globals.php');
include_once('includes/header4i.htm');
include_once('includes/dropmenu.htm');
	
?>

<div class='content-area'>
<div class='wrapper'>

<div id='page-lease'>
	<div id='lease-content'>
		<h4>Lease With an Option to Buy</h4>
		<p>Want to purchase a home but cannot get qualified at the present time? Let us help!</p>
		<p>At Ken Young Company, we want to help you get into a new home. One way to do this is through our lease-option program. Maybe you want a brand new home to live in but you have had trouble securing financing. You can lease a new home with us for one year and have the option to buy the home after that one year period. During the one year lease period, you’ll have time to improve your credit scores. At the end of the one year, you actually have two options: buy your new home or renew your lease for another year. To be clear, this option is only available on certain completed homes. Please contact us for information on available lease properties.</p>
		<p>In order to begin a lease with Ken Young Company, we require from you a deposit for one month’s rent and your first month’s rent. There is an additional deposit required if you have pets of any kind. It is also a requirement to fill out a two page lease. Then, you can move into your new home. At the end of your lease, you may choose to be reimbursed for the deposit or you can apply the deposit to the purchase price upon closing on your home. Speaking of purchase prices – the purchase price of your home will be equal to the appraised value of the home at the end of your one year’s lease. It is really just this simple! If this appeals to you, call or email us. Let us help you make your dream a reality.</p>
	</div>
</div>

<br /><h4>Currently Available for Lease</h4>

<?php





$_output = "<div class='lease-table'>";

$_table = $_break . "<table id='inv-table'>";
$_table .= $_break . $_tab . "<thead>";
$_table .= $_break . $_tab . $_tab . "<tr id='inv-header' class='hrow corner5'>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>SUBDIVISION</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>ADDRESS</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>PRICE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>SqFt</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>COMPLETION DATE</th>";
$_table .= $_break . $_tab . $_tab . $_tab . "<th>LEASE PRICE</th>";
//$_table .= $_break . $_tab . $_tab . $_tab . "<th>SOLD</th>";
$_table .= $_break . $_tab . $_tab . "</tr>";
$_table .= $_break . $_tab . "</thead>";

$_table .= $_break . $_tab . "<tbody>";

while(list($subdivision,$address,$price,$plan_number,$completion_date,$is_sold,$existing,$today,$lease_price) = $result->fetch_row()) {

	$_baseprice = "$" . money_format('%!.0i',$price);
	$_sqft_price = (int)$price / (int)$plan_number;
	$_sqft_price = "$" . money_format('%!.2i',$_sqft_price);

	if($lease_price!='') {
		$lease_price = "$" . money_format('%!.2i',$lease_price);
	}


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
	$_table .= $_break . $_tab . $_tab . $_tab . "<td>$lease_price</td>";
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
<div class='clickable'><div id='pointer'><img src='image/mouse-pointer-down.png' /></div><div id='click-message'>Click on any row to view pictures</div></div>
</div></div>
</body>

<script type='text/javascript'>
	ColorMe();
</script>

</html>