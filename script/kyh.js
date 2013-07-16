// JavaScript Document

//google maps stuff.  need to be global
//var markerKC, markerBS, markerPP, markerTW, markerHH;
var siteA = "http://maps.google.com/mapfiles/kml/pal5/icon48.png";
var siteB = "http://maps.google.com/mapfiles/kml/pal5/icon49.png";
var siteC = "http://maps.google.com/mapfiles/kml/pal5/icon50.png";
var siteD = "http://maps.google.com/mapfiles/kml/pal5/icon51.png";
var siteE = "http://maps.google.com/mapfiles/kml/pal5/icon52.png";
var sitePP = "image/gmap-PP.png";
var siteKC = "image/gmap-KC.png";
var siteHH = "image/gmap-HH.png";
var siteWL = "image/gmap-WL.png";

var _click_advise = "<div class='action-message'>Click any row to view photos</div>";

function PositionForIE() {

	var _pageid = $('.pageid').text();

	if(_pageid=='home') {
		var _blurbOffset = $('#blurb').offset();
		var _formerLeft = _blurbOffset.left + 'px';

		$('#blurb').css({'position':'absolute','top':'140px','left':_formerLeft});
	}
}

function CloseThis() {

	$.colorbox.close();

	var _pageid = $('.pageid').text();
	if(_pageid=='inventory') {
		window.location.href = "inventory.php?refreshed=true";
	} else if(_pageid=='lease') {
		window.location.href = "lease.php?refreshed=true";	
	}
}

function ViewLarger() {
//expecting a path to image
	var _filename = $(this).attr('src');

	if($(this).parent().hasClass('floorplan')) {
		var _plan = $(this).parent().attr('id');
	} else {
		var _plan = $(this).parent().parent().siblings('.floorplan').attr('id');
	}

//report to analytics
	_gaq.push(['_trackEvent', 'Floorplans', 'View', _plan]);

	_filename = encodeURIComponent(_filename);
	var _fpath = "fp-larger.php";
	var params = "";

	//$.post("test.php", { name: "John", time: "2pm" } );

	$.post(_fpath, {xsrc: _filename} ,function(data){
		// create a modal dialog with the data
		$.colorbox({html: data,
			escKey: true,
			overlayClose: true,
			open: true,
			opacity: 0.45,
			scrolling: false
		});
	});
}

function InventoryToDetail() {

	//Clicked any row on inventory and expecting tr.id by which to launch similar to floorplan.tpl via modal and ajax
	var _plan = $(this).attr('id');
	var _address = $(this).children('#address').text();
	var _baseprice = $(this).children('#baseprice').text();
	var _subdivision = $(this).children('#subdivision').text();

	var _fpath = "inventory-adg.php?plan=" + _plan + "&address=" + _address + "&baseprice=" + _baseprice + "&subdivision=" + _subdivision;

	_fpath = encodeURI(_fpath);

	$.get(_fpath, function(data){

		$.colorbox({html: data,
			onComplete: function() {
				var galleries = $('.ad-gallery').adGallery();
			},
			escKey: true,
			overlayClose: true,
			open: true,
			opacity: 0.45,
			scrolling: false
		});

	});

//report to analytics
	_gaq.push(['_trackEvent', 'Inventory', 'View', _address]);

}

function initialize() {
	//original center 34.620438, -92.497008
	var centerLatLng = new google.maps.LatLng(34.644507, -92.467117);

       var myOptions = {
         center: centerLatLng,
         zoom: 12,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       };

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	var markerKC = new google.maps.Marker({
		position: new google.maps.LatLng(34.644438, -92.454572),
		map: map,
		title:"King\'s Crossing",
		icon: siteKC
	});

	var markerPP = new google.maps.Marker({
		position: new google.maps.LatLng(34.593611, -92.523056),
		map: map,
		title:"Prospect Park",
		icon: sitePP
	});

	var markerTW = new google.maps.Marker({
		position: new google.maps.LatLng(34.604811,-92.57027),
		map: map,
		title:"The Woodlands",
		icon: siteWL
	});

	var markerHH = new google.maps.Marker({
		position: new google.maps.LatLng(34.589461,-92.541873),
		map: map,
		title:"Hickory Heights",
		icon: siteHH
	});

	google.maps.event.addListener(markerHH, 'click', function() {
		$('#places-stack').accordion('activate',0);
		//mapSetIcon('Hickory Heights','str');
	});
	google.maps.event.addListener(markerKC, 'click', function() {
		$('#places-stack').accordion('activate',1);
		//mapSetIcon('Kings Crossing','str');
	});
	google.maps.event.addListener(markerPP, 'click', function() {
		$('#places-stack').accordion('activate',2);
		//mapSetIcon('Prospect Park','str');
	});
	google.maps.event.addListener(markerTW, 'click', function() {
		//infowindow.open(map,markerKC);
		$('#places-stack').accordion('activate',3);
		//mapSetIcon('The Woodlands','str');
	});

}

function ApplyCorners() {
	//reapply border radius
	$('#map_canvas').addClass("corner5");
}

//Everything works fine without this function and i can't find anywhere that it is called.  Will leave commented for a while then delete.
/*
function loadGMap() {
	alert('load called');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAwMuvGHFfsdLPqTjkVSMzKcJJbYx6Crww&sensor=false&callback=initialize';
	document.body.appendChild(script);
}*/

function HandleXP() {
	//alert(navigator.userAgent);
	var _navUA = navigator.userAgent;
	var _XPTEST = _navUA.indexOf("NT 5.");
	var _IE7TEST = _navUA.indexOf("IE 7");
	if(_XPTEST>0 || _IE7TEST>0) {
		//apply some alternate styling
		$('#inv-header').addClass('hrowXP');
		PositionForIE();
	}

}

function DoSlideShow() {

	//HOMEPAGE

	//attempting to grab margin-left of logo (randomly chosen) to set left of colorbox
	var _offset = $('.dropmenu').offset();

	$(".group4").colorbox({rel:'group4',
		slideshow:true,
		maxWidth:"550px",
		transition:"none",
		speed:500,
		slideshowSpeed:3500,
		open:true,
		overlayClose:false,
		opacity:0,
		left: _offset.left,
		top:'117px',
		fixed: true
	});
}

function PositionClickable() {
	//position clickable indicator
	var winW = document.body.offsetWidth;
	var winH = document.body.offsetHeight;
	var _center = ((winW / 2) - 100) + 'px';
	$('.clickable').css({'left':_center,'display':'block'});
	setTimeout(function() {
		$('.clickable').effect('bounce',{ times:3,distance:30 }, 200);
		//$('.clickable').effect('pulsate',{ times:3 }, 4000);
		//$('.clickable').effect('shake',{ times:3 }, 300);
	},
	1000);


}

function ShowClickable() {
	$('.clickable').fadeOut(3000);
}

function ColorMe() {
	var _pageid = $('.pageid').text();
	if(_pageid=='about'||_pageid=='home'||_pageid=='buildmap') {
		$('.content-area').css({'backgroundColor':'#B99C6B'});
	} else {
		$('.content-area').css({'backgroundColor':'#FFF'});
	}
}

//this may need to only be called after and when loading floorplans page
$().ready(function(e) {

	//is this admin?
	var _isAdmin = window.location.href.indexOf("admin");
	//alert(_isAdmin);
	if(_isAdmin==-1) {
		$('.rtt').click(InventoryToDetail);
	}

	if($('.status-message')) {
		var _localMessage = $('.status-message').text();
		if(_localMessage.length > 0) {
			alert(_localMessage);
		}
	}

	if($('.pageid')) {
		if($('.pageid').text()=='inventory'||$('.pageid').text()=='lease') {
			$('#inv-table').dataTable( {
				"bDestroy": true,
				"bPaginate": false,
				"bLengthChange": false,
				"bFilter": false,
				"bSort": true,
				"bInfo": false,
				"bAutoWidth": false
			});
		}
	}

	HandleXP();

	$("#contact-form").validate();
	var _pageid = $('.pageid').text();
	if(_pageid=='inventory'||_pageid=='floorplans'||_pageid=='lease') {
		var _refreshed = $.url().param('refreshed');
		if(!(_refreshed=='true')) {
			if(_pageid=='lease') {
				$('.clickable').css({'top':'400px'})
			}
	
			PositionClickable();
			setTimeout('ShowClickable()',3000);
		}
	}

	$(window).resize(function() {
		var _offset = $('#logobar').offset();
		$('#colorbox').offset({ top: 125, left: _offset.left });
	});

});