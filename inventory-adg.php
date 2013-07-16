<?php
$_tab = "    ";
$_plan = $_GET['plan'] . "/";
$_plannum = $_GET['plan'];
$_address = trim($_GET['address']);
$_price = $_GET['baseprice'];
$_subdivision = $_GET['subdivision'];
?>


<div id="container">
	<div id='plan-info'>
		<a class='close-button' href='javascript:CloseThis()'>
			<img src='image/process_stop24.png' />
		</a>
		<span class='price'>
			<?php echo $_price; ?>
		</span>
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $_plannum; ?> SqFt&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $_subdivision; ?>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $_address; ?>
	</div>
    <div id="gallery" class="ad-gallery">
		<div class="ad-image-wrapper">
		</div>
		<div class="ad-controls">
		</div>
      	<div class="ad-nav">
        	<div class="ad-thumbs">
          		<ul class="ad-thumb-list">
<?php

$_tab = "    ";
$_plan = $_GET['plan'] . "/";
$_plannum = $_GET['plan'];
$_address = trim($_GET['address']);
$_price = $_GET['baseprice'];
$_subdivision = $_GET['subdivision'];

$_address = preg_replace("/[ ]/", "", $_address);
echo "address is " . $_address;

include("globals.php");

include("picasa.php");


GetAlbumImages('Plan','P' . $_plannum,'');
GetAlbumImages('',$_address,'');


?>

				</ul>
			</div>
		</div>
	</div>
</div>