<?php

require_once 'Zend/Loader.php';
Zend_Loader::loadClass('Zend_Gdata_Photos');
Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
Zend_Loader::loadClass('Zend_Gdata_AuthSub');


$serviceName = Zend_Gdata_Photos::AUTH_SERVICE_NAME;
$user = "kyh.general@gmail.com";
$pass = "hamilton501";
$slideHtml = "";

$client = Zend_Gdata_ClientLogin::getHttpClient($user, $pass, $serviceName);

// update the second argument to be CompanyName-ProductName-Version
$gp = new Zend_Gdata_Photos($client, "TechPractical-kyh3dot0-0.7");

// In version 1.5+, you can enable a debug logging mode to see the
// underlying HTTP requests being made, as long as you're not using
// a proxy server
// $gp->enableRequestDebugLogging('/tmp/gp_requests.log');

function ListAlbums() {
	//THIS is not in use for my purposes KLY
	global $gp;
	try {
	    $userFeed = $gp->getUserFeed("default");
	    foreach ($userFeed as $userEntry) {
	        echo $userEntry->title->text . "<br />\n";
	    }
	} catch (Zend_Gdata_App_HttpException $e) {
	    echo "Error: " . $e->getMessage() . "<br />\n";
	    if ($e->getResponse() != null) {
	        echo "Body: <br />\n" . $e->getResponse()->getBody() .
	             "<br />\n";
	    }
	    // In new versions of Zend Framework, you also have the option
	    // to print out the request that was made.  As the request
	    // includes Auth credentials, it's not advised to print out
	    // this data unless doing debugging
	    // echo "Request: <br />\n" . $e->getRequest() . "<br />\n";
	} catch (Zend_Gdata_App_Exception $e) {
	    echo "Error: " . $e->getMessage() . "<br />\n";
	}
}

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

function GetPlanImages($plan) {
	global $_elevationSet, $gp, $planUrl;

	$plan = 'P' . $plan;

	//echo "plan: $plan\n";

	try {
		// Creates a Zend_Gdata_Photos_AlbumQuery
		$query = $gp->newAlbumQuery();

		$query->setUser("default");
		$query->setAlbumName($plan);
		//$query->setTag("plan");

		$albumFeed = $gp->getAlbumFeed($query);


		//$albumId = $albumFeed->getGphotoAlbumId()->getText();
		//$photoId = $photoEntry->getGphotoId()->getText();

		$_i = 0;
		$_j = 0;
		foreach ($albumFeed as $albumEntry) {
			$photoId = $albumEntry->getGphotoId()->getText();
			//echo "photoId: " . $photoId . "<br />\n";
		    //echo $albumEntry->title->text . "<br />\n";

			if ($albumEntry->getMediaGroup()->getContent() != null) {
			  $mediaContentArray = $albumEntry->getMediaGroup()->getContent();
			  $contentUrl = $mediaContentArray[$_i]->getUrl();
				if($_j==0) {
					//for testing only assume this is the floor plan
					$planUrl = $contentUrl;
				} else {
			  		$_elevationSet[] = $contentUrl;
				}
			}
			$_j++;
		}

		//echo $planUrl . "\n";
		//echo "count: " . count($_elevationSet) . "\n";

	} catch (Zend_Gdata_App_HttpException $e) {
	    //echo "Error: " . $e->getMessage() . "<br />\n";
	    if ($e->getResponse() != null) {
	        //echo "Body: <br />\n" . $e->getResponse()->getBody() .
	             "<br />\n";
	    }
	    // In new versions of Zend Framework, you also have the option
	    // to print out the request that was made.  As the request
	    // includes Auth credentials, it's not advised to print out
	    // this data unless doing debugging
	    // echo "Request: <br />\n" . $e->getRequest() . "<br />\n";
	} catch (Zend_Gdata_App_Exception $e) {
	    //echo "Error: " . $e->getMessage() . "<br />\n";
	}
}

function RetrieveFromPicasa() {
	//this will receive an album or tag reference and do the rest of the work

}

function GetAlbumImages($tag,$name,$caller) {
	global $gp;

	//strip spaces from address
	$name = trim($name);

	try {
		// Creates a Zend_Gdata_Photos_AlbumQuery
		$query = $gp->newAlbumQuery();
		$query->setUser("default");
		$query->setAlbumName($name);
		if($tag!='') {
			$query->setTag("$tag");
		}

		$albumFeed = $gp->getAlbumFeed($query);

		//$albumId = $albumFeed->getGphotoAlbumId()->getText();
		//$photoId = $photoEntry->getGphotoId()->getText();

		$_i = 0;
		foreach ($albumFeed as $albumEntry) {
			$photoId = $albumEntry->getGphotoId()->getText();
			//echo "photoId: " . $photoId . "<br />\n";
		    //echo $albumEntry->title->text . "<br />\n";

			if ($albumEntry->getMediaGroup()->getThumbnail() != null) {
				//echo "inside if <br />\n";
				$mediaThumbnailArray = $albumEntry->getMediaGroup()->getThumbnail();
				$firstThumbnailUrl = $mediaThumbnailArray[$_i]->getUrl();
			}

			if ($albumEntry->getMediaGroup()->getContent() != null) {
			  $mediaContentArray = $albumEntry->getMediaGroup()->getContent();
			  $contentUrl = $mediaContentArray[$_i]->getUrl();
			}

			if($caller=='slideshow') {
				BuildSlideShowContent($contentUrl);
			} else {
				$_cluster = BuildLiCluster($contentUrl,$firstThumbnailUrl);
				$_html .= "\n" . $_cluster;
			}
		}

		echo $_html;

	} catch (Zend_Gdata_App_HttpException $e) {
	    //echo "Error: " . $e->getMessage() . "<br />\n";
	    if ($e->getResponse() != null) {
	        //echo "Body: <br />\n" . $e->getResponse()->getBody() .
	             "<br />\n";
	    }
	    // In new versions of Zend Framework, you also have the option
	    // to print out the request that was made.  As the request
	    // includes Auth credentials, it's not advised to print out
	    // this data unless doing debugging
	    // echo "Request: <br />\n" . $e->getRequest() . "<br />\n";
	} catch (Zend_Gdata_App_Exception $e) {
	    //echo "Error: " . $e->getMessage() . "<br />\n";
	}
}

function BuildSlideShowContent($photoURL) {
	global $slideHtml;
	$_tab = "    ";
	$_line = "$_tab$_tab$_tab$_tab<p><a class='group4' href='$photoURL'>filler</a></p>\n";
	$slideHtml .= $_line;
}

function ListPhotosByTags($tagName) {
	global $gp;
	//Independent example.  working by tags here
	// Creates a Zend_Gdata_Photos_UserQuery

	//KLY used for homepage slideshow

	$query = $gp->newUserQuery();
	$username = "default";

	$query->setUser($username);
	$query->setTag($tagName);

	// set to only return photos
	// the default kind value for a user feed is to include only albums
	$query->setKind("photo");
	//$query->setMaxResults("10");

	$userFeed = $gp->getUserFeed(null, $query);

	// because we specified 'photo' for the kind, only PhotoEntry objects
	// will be contained in the UserFeed
	$_i = 0;
	foreach ($userFeed as $photoEntry) {
		$mediaContent = $photoEntry->getMediaGroup()->getContent();
		$photoURL = $mediaContent[$_i]->getUrl();
		BuildSlideShowContent($photoURL);
	}
	GetAlbumImages('','slideshow','slideshow');
}

//ListPhotosByTags();
//GetImages('album','2989OakbrookDrive');

?>