
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<META name="description" content="See some of the plans we can build for you or bring us your own" /> <!--PER-->
	<?php include('headcontent.php'); ?>
	<link rel='stylesheet' href='style/colorbox-inv.css' />
	<style>
		.content-area {
			background-color: #FFF;
		}
	</style>
</head>

<body>

<p class='pageid hideme'>floorplans</p>

<?php

//Get stuff from mysql DB that doesn't exist yet
//$planNum = $_GET['num'];

//spiiting out three different plans just to see page looks.  eventually this will be a DB loop.
//$_theplans = array("1492","1547","2080");

include('sql/fp-sql.php');
require_once('globals.php');
include_once('includes/header4i.htm');
include_once('includes/dropmenu.htm');


$_elevationSet = array();

include('picasa.php');

echo "<div class='content-area'>";
echo "<div class='wrapper'>";


echo "<div class='page-floorplans'>";

// Iterate through the result set
while(list($plannumber,$baseprice,$num_bed,$num_bath) = $result->fetch_row()) {

	$baseprice = "$" . money_format('%!.0i',$baseprice);
	GetPlanImages($plannumber);

	$smarty->assign('planPrice', $baseprice);
	$smarty->assign('elevationFiles', $_elevationSet);
	$smarty->assign('planNum',$plannumber);
	$smarty->assign('planUrl',$planUrl);
	$smarty->assign('numBed',(string)$num_bed);
	$smarty->assign('numBath',(string)$num_bath);
	$smarty->display('smarty/floorplan.tpl');
	//print("<hr />");
	$_elevationSet = null;
	$planUrl = null;

	//Explicitly associating click events after each iteration so user doesn't have to wait for full page load
	echo "<script type='text/javascript'> $('.floorplan img').click(ViewLarger);$('.c-elevations img').click(ViewLarger);</script>";

}


// Recuperate the query resources
$result->free();


echo "</div>";

?>
<div class='clickable'><div id='pointer'><img src='image/mouse-pointer.png' /></div><div id='click-message'>Click on any image to view larger</div></div>

</div></div>

</body>
<script type='text/javascript'>
	ColorMe();
</script>
</html>