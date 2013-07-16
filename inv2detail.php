<?php
error_reporting('E_ERROR');
include('globals.php');
//Plan id passed in on query string

$_plan = $_GET['plan'];

$mysqli = new mysqli('localhost', 'techprac_kyh', '50I3I55I84', 'techprac_kyh3dot0');

$query = 'SELECT floorplans.baseprice FROM floorplans WHERE floorplans.plannumber=' . $_plan;

// Send the query to MySQL 
$result = $mysqli->query($query, MYSQLI_STORE_RESULT);

//Should only be one record
while(list($baseprice) = $result->fetch_row()) {

	$_price = $baseprice;
}

// Recuperate the query resources
$result->free();

$_elevationSet = array();

$_planExists = $plansBasePath . $_plan . '.jpg';
$_elevExists = $elevationsBasePath . $_plan;
$planFile = $plansPath . $_plan;
$elevationFiles = $plansPath . 'elevations/' . $_plan;
$_price = "$" . money_format('%!.0i',$_price);



//verify existence of all images
if(file_exists($_planExists)) {
	$smarty->assign('planFile', $planFile);
} else {
	$smarty->assign('planFile',$_imgNone);
}

$_aSet = array('ea','eb','ec');

foreach($_aSet as $_suffix) {
	if(file_exists($_elevExists . $_suffix . '.jpg')) {
		//NOW need to update template to either receive multiple elevations or an array
		$_elevationSet[$_suffix] = $elevationFiles . $_suffix;
	} else {
		//load imgNone
		$_elevationSet[] = $_imgNone;
	}
}

$smarty->assign('planPrice', $_baseprice);
$smarty->assign('elevationFiles', $_elevationSet);
$smarty->assign('planNum',$_plan['number']);

echo "<div id='modal-fp'>";
$smarty->display('smarty/floorplan.tpl');
echo "</div>";
?>
<link rel="stylesheet" href="style/floorplans.css" type="text/css" />