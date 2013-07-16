<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Ken Young Homes</title>
	<script type="text/javascript" src="../script/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="../script/jquery-ui-1.8.22.custom/js/jquery-ui-1.8.22.custom.min.js"></script>
	<script type="text/javascript" src="../script/jquery.validate.min.js"></script>
	<script type="text/javascript" src="../script/kyh.js"></script>
	<script type="text/javascript" src="kyh-admin.js"></script>
	<script type="text/javascript" src="../script/DataTables-1.9.1/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../script/colorbox/colorbox/jquery.colorbox.js"></script>

	<link rel="stylesheet" href="../script/jquery-ui-1.8.22.custom/css/sunny/jquery-ui-1.8.22.custom.css" type="text/css" />
	<link rel="stylesheet" href="../style/dropmenu.css" type="text/css" />
	<link rel="stylesheet" href="../style/kyh.css" type="text/css" />
	<link rel="stylesheet" href="../style/colorbox.css" />
	<link rel="stylesheet" href="kyh-admin.css" />
	<link rel="stylesheet" href="../style/datatables.css" type="text/css" />
</head>

<body>

<?php

include('includes/header4i.htm');

//IF Alt page requested, load it
$_pageid = $_GET["pageid"];
if(!$_pageid) {
	$_pageid = "inventory";
}

//LOAD - dropmenu nav bar
echo "<div class='bluebar-top'></div>";
include('includes/dropmenu.htm');
echo "<div class='bluebar'></div>";
echo "<div class='content-area'>";
echo "<div class='wrapper'>";

if($_pageid) {
	$_toinclude = $_pageid . '.php';
	include($_toinclude);
}

?>


</div> <!-- END wrapper -->
</div>
<div id='RegisterErrors'></div>
</body>
</html>