<?php

//DETERMINE if running locally or online




$_path = substr($_SERVER['SCRIPT_FILENAME'],1,7);
if($_path == "Library") {
	//running local
	$docroot = '/Library/WebServer/Documents/http/';
	$siteroot = '/http/kyh3dot0/';
} else {
	$docroot = "/home/techprac/";
	$siteroot = '/kyh3dot0/';
	$sitepath = 'public_html/';
}

$_siteName = 'kyh3dot0/';

$plansPath = $siteroot . 'image/by_sqf/';
$plansBasePath = $docroot . $sitepath . $_siteName . 'image/by_sqf/';
$elevationsPath = $siteroot . 'image/by_sqf/elevations/';
$elevationsBasePath = $docroot . $sitepath . $_siteName . 'image/by_sqf/elevations/';
$galleryBasePath = $docroot . $sitepath . $_siteName . 'image/gallery';
$galleryPath = "image/gallery/";
$adgBasePath = $docroot . $sitepath . $_siteName . 'image/ADGallery/';
$adgPath = $siteroot . 'image/ADGallery/';
//adg = ADGallery

$_break = "\n";
$_tab = "  ";

require($docroot . 'Smarty-3.1.7/libs/Smarty.class.php');
$templatePath = $docroot . 'Smarty-3.1.7/PerSite/';
$smarty = new Smarty();
$smarty->setTemplateDir($templatePath . 'templates');
$smarty->setCompileDir($templatePath . 'templates_c');
$smarty->setCacheDir($templatePath . 'cache');
$smarty->setConfigDir($templatePath . 'configs');

setlocale(LC_MONETARY, 'en_US');
$_imgNone = $siteroot . "image/noimageavailable";

?>