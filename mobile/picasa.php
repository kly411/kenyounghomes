<?php

require_once 'Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');


$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;
$user = "kyh.general@gmail.com";
$pass = "hamilton501";
$slideHtml = "";
//for json consumption by sencha app
$return_arr = array();


$client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $serviceName);

// update the second argument to be CompanyName-ProductName-Version
$gp = new Zend_Gdata_Photos($client, "TechPractical-kyh3dot0-0.7");

//echo "after outside vars<br />";

// In version 1.5+, you can enable a debug logging mode to see the
// underlying HTTP requests being made, as long as you're not using
// a proxy server
// $gp->enableRequestDebugLogging('/tmp/gp_requests.log');



function BuildImageElement($_photoUrl) {
	echo "<img src='$_photoUrl' /><br />\n";
}

function BuildLiCluster($contentUrl,$firstThumbnailUrl) {
	$_cluster = "\n<li>";
	$_cluster .= "\n  <a href='$contentUrl'>";
	$_cluster .= "\n    <img src='$firstThumbnailUrl'>";
	$_cluster .= "\n  </a>";
	$_cluster .= "\n</li>";
	return $_cluster;
}

function GetAlbumImages($tag,$name,$caller) {
	global $gp,$return_arr,$plannum;
//echo "inside function<br />";
	//strip spaces from address
	$name = trim($name);

	try {
		// Creates a Zend_Gdata_Photos_AlbumQuery
		$query = $gp->newAlbumQuery();
		$query->setUser("default");
		$query->setAlbumName($name);
		$query->setThumbsize("104c");
		if($tag!='') {
			$query->setTag("$tag");
		}

		$albumFeed = $gp->getAlbumFeed($query);

		$_i = 0;
		foreach ($albumFeed as $albumEntry) {

			$photoId = $albumEntry->getGphotoId()->getText();

			if ($albumEntry->getMediaGroup()->getThumbnail() != null) {
				//echo "inside if <br />\n";
				$mediaThumbnailArray = $albumEntry->getMediaGroup()->getThumbnail();
				$firstThumbnailUrl = $mediaThumbnailArray[$_i]->getUrl();
			}

			if ($albumEntry->getMediaGroup()->getContent() != null) {
			  $mediaContentArray = $albumEntry->getMediaGroup()->getContent();
			  $contentUrl = $mediaContentArray[$_i]->getUrl();
			  $imgWidth = $mediaContentArray[$_i]->getWidth();
			  $imgHeight = $mediaContentArray[$_i]->getHeight();
			}

			$row_array['thumbPath'] = $firstThumbnailUrl;
			$row_array['bigPath'] = $contentUrl;
			$row_array['bigWidth'] = $imgWidth;
			$row_array['bigHeight'] = $imgHeight;
			array_push($return_arr, $row_array);
		}

	} catch (Zend_Gdata_App_HttpException $e) {
		
	    //echo "Error: " . $e->getMessage() . "<br />\n";
	    throw new Exception("No album found.");
	    
	    if ($e->getResponse() != null) {
	        //echo "Body: <br />\n" . $e->getResponse()->getBody() . "<br />\n";
	    }
	    // In new versions of Zend Framework, you also have the option
	    // to print out the request that was made.  As the request
	    // includes Auth credentials, it's not advised to print out
	    // this data unless doing debugging
	    // echo "Request: <br />\n" . $e->getRequest() . "<br />\n";
	} catch (Zend_Gdata_App_Exception $e) {
	    //echo "Error: " . $e->getMessage() . "<br />\n";
   		//error may be that no album exists.  if so, try for plannum
	}
}

//this page/script may be called either by the floorplans or the inventory view of the kyh mobile site.  Which can be deduced by the presence or absence of an address value in the url

$_address = urldecode($_GET['address']);
$_address = str_replace(" ", "", $_address);
$plannum = "P" . urldecode($_GET['plannum']);

if(strlen($_address)>0) {
	try {
		GetAlbumImages('',$_address,'');
	} catch(Exception $e) {
		try {
			GetAlbumImages('',$plannum,'');
		} catch(Exception $f) {
			throw new Exception("No album found for address or plan number.");	
		}
	}
} else if(strlen($plannum)>1)  {
	GetAlbumImages('',$plannum,'');	
}



//sort array by descending image width
foreach ($return_arr as $key => $row) {
    $bigWidth[$key]  = $row['bigWidth'];
    $bigHeight[$key] = $row['bigHeight'];
}

array_multisort($bigWidth, SORT_DESC, $bigHeight, SORT_DESC, $return_arr);

echo json_encode($return_arr);
//ListPhotosByTags();
//GetImages('album','2989OakbrookDrive');

?>