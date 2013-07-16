// JavaScript Document

//google maps stuff.  need to be global
var markerKC, markerBS, markerPP, markerTW, markerHH;
var siteA = "http://maps.google.com/mapfiles/kml/pal5/icon48.png";
var siteB = "http://maps.google.com/mapfiles/kml/pal5/icon49.png";
var siteC = "http://maps.google.com/mapfiles/kml/pal5/icon50.png";
var siteD = "http://maps.google.com/mapfiles/kml/pal5/icon51.png";
var siteE = "http://maps.google.com/mapfiles/kml/pal5/icon52.png";

function CloseThis() {
	$.colorbox.close();
}

function ViewLarger() {
//expecting a path to image
	var _filename = $(this).attr('src');

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

//report to analytics
	_gaq.push(['_trackEvent', 'Inventory', 'View', _address]);

	//Clicked any row on inventory and expecting tr.id by which to launch similar to floorplan.tpl via modal and ajax
	var _plan = $(this).attr('id');
	var _address = $(this).children('#address').text();
	var _baseprice = $(this).children('#baseprice').text();
	var _subdivision = $(this).children('#subdivision').text();

	var _fpath = "inventory-adg.php?plan=" + _plan + "&address=" + _address + "&baseprice=" + _baseprice + "&subdivision=" + _subdivision;

	_fpath = encodeURI(_fpath);

	$.get(_fpath, function(data){

		//attempting to transition this from simplemodal to colorbox
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

	var contentString = "Come See Us!!";
	var infowindow = new google.maps.InfoWindow({
	    content: contentString
	});


	var iconActive = "image/mouse-pointer.png";

	markerKC = new google.maps.Marker({
		position: new google.maps.LatLng(34.644438, -92.454572),
		map: map,
		title:"King\'s Crossing",
		icon: siteA
	});

	markerPP = new google.maps.Marker({
		position: new google.maps.LatLng(34.593611, -92.523056),
		map: map,
		title:"Prospect Park",
		icon: siteB
	});

	markerBS = new google.maps.Marker({
		position: new google.maps.LatLng(34.59, -92.549167),
		map: map,
		title:"Briarstone",
		icon: siteC
	});

	markerTW = new google.maps.Marker({
		position: new google.maps.LatLng(34.604811,-92.57027),
		map: map,
		title:"The Woodlands",
		icon: siteD
	});

	markerHH = new google.maps.Marker({
		position: new google.maps.LatLng(34.589461,-92.541873),
		map: map,
		title:"Hickory Heights",
		icon: siteE
	});

	google.maps.event.addListener(markerBS, 'click', function() {
		$('#places-stack').accordion('activate',0);
		mapSetIcon('Briarstone','str');
	});
	google.maps.event.addListener(markerHH, 'click', function() {
		$('#places-stack').accordion('activate',1);
		mapSetIcon('Hickory Heights','str');
	});
	google.maps.event.addListener(markerKC, 'click', function() {
		$('#places-stack').accordion('activate',2);
		mapSetIcon('Kings Crossing','str');
	});
	google.maps.event.addListener(markerPP, 'click', function() {
		$('#places-stack').accordion('activate',3);
		mapSetIcon('Prospect Park','str');
	});
	google.maps.event.addListener(markerTW, 'click', function() {
		//infowindow.open(map,markerKC);
		$('#places-stack').accordion('activate',4);
		mapSetIcon('The Woodlands','str');
	});
}

function mapSetIcon(_name,_vartype) {
	//find name of corresponding marker then marker.setIcon(path_var)

	if(_vartype=='obj') {
		var _subdname = $(_name).text().toLowerCase();
	} else if(_vartype=='str') {
		var _subdname = _name.toLowerCase();
	}
	//temp array will later be database handled
	var subdArray = new Array();
	subdMarkers={'kingscrossing':markerKC,'prospectpark':markerPP,'briarstone':markerBS,'thewoodlands':markerTW,'hickoryheights':markerHH};
	subdOrigMarkers={'kingscrossing':siteA,'prospectpark':siteB,'briarstone':siteC,'thewoodlands':siteD,'hickoryheights':siteE};
	_subdname = _subdname.replace(/[ ]/g,"");
	var _prevExpanded = $('#expanded').val();
	$('#expanded').val(_subdname);
	if(_prevExpanded.length>1) {
		var _origmarker = subdOrigMarkers[_prevExpanded];
		var _prevmarker = subdMarkers[_prevExpanded];
		_prevmarker.setIcon(_origmarker);
	}
	//get right marker suffix
	var _marker = subdMarkers[_subdname];
	_marker.setIcon();
}

function ApplyCorners() {
	//reapply border radius
	$('#map_canvas').addClass("corner5");
}

function loadGMap() {
	alert('load called');
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAwMuvGHFfsdLPqTjkVSMzKcJJbYx6Crww&sensor=false&callback=initialize';
	document.body.appendChild(script);
}

function tmp() {
	$('#tmp').css('display','none');
	$('#tmp').modal({
		opacity:65,
		overlayCss: {backgroundColor:"#000"}			
	});
}

function HandleXP() {
	//alert(navigator.userAgent);
	var _navUA = navigator.userAgent;
	var _XPTEST = _navUA.indexOf("NT 5.");
	if(_XPTEST>0) {
		//apply some alternate styling
		$('#inv-header').addClass('hrowXP');
	}
}

function DoSlideShow() {

	//HOMEPAGE

	//attempting to grab margin-left of logo (randomly chosen) to set left of colorbox
	var _offset = $('#menubar').offset();

	$(".group4").colorbox({rel:'group4',
		slideshow:true,
		maxWidth:"550px",
		transition:"none",
		speed:500,
		slideshowSpeed:3500,
		open:true,
		overlayClose:false,
		opacity:0,
		left:_offset.left,
		top:'125px'
	});
}

function PositionClickable() {
	//position clickable indicator
	var winW = document.body.offsetWidth;
	var winH = document.body.offsetHeight;
	//alert(winW);
	var _center = ((winW / 2) - 100) + 'px';
	//alert(_center);
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

//this may need to only be called after and when loading floorplans page
$().ready(function(e) {
	$('.c-elevations img').click(ViewLarger);
	$('.floorplan img').click(ViewLarger);
	$('.rtt').click(InventoryToDetail);

	/*
	$('#admin-login input').bind('keypress', function(e) {
		if(e.keyCode==13){
			//dismiss dialog and GO open edit
			$.modal.close();
		}
	});
	*/

	if($('.status-message')) {
		var _localMessage = $('.status-message').text();
		if(_localMessage.length > 0) {
			alert(_localMessage);
		}
	}

	if($('.pageid')) {
		if($('.pageid').text()=='inventory') {
			$('#inv-table').dataTable( {
				"bPaginate": false,
				"bLengthChange": false,
				"bFilter": false,
				"bSort": true,
				"bInfo": false,
				"bAutoWidth": false
			});
		} /* else if($('.pageid').text()=='buildmap') {
			initialize();
			$("#places-stack").accordion({
				active: false,
				collapsible: true
			});
		}*/
	}

	HandleXP();
	$("#contact-form").validate();
	var _pageid = $('.pageid').text();
	if(_pageid=='inventory') {
		PositionClickable();
		setTimeout('ShowClickable()',3000);
	} else if(_pageid=='buildmap') {
		$('.accordion-header').click(function() {
			mapSetIcon(this,'obj');
		});
	}

});