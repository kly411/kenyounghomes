Ext.define('MyApp.controller.Thumbnails', {
	extend: 'Ext.app.Controller',
	config: {
	    refs: {
	        thumbsHandle: '#thumbsHandle'
	    },
	    control: {
	        thumbsHandle: {
	            show: "InitView",
	            itemtap: "LaunchBig",
	            hide: "Closing"
	        }
	    }
	},
	
	InitView: function(){

    	//wipe any existing content
	    var store = Ext.getStore('thumbsStoreID');
		store.removeAll();
		store.sync();

		//change background of main container to black so when scrolling thumbnails, there is not visible white.
		Ext.getCmp('mainHandle').addCls('black');

	    //load the store
	    var addressForThumbs = MyApp.addressForThumbs;
	    var plannumForThumbs = MyApp.plannumForThumbs;
	    
	    var prevView = '';
	    
	    //setting marker for which view invoked this one.  This will be used to determine which view to return to via the multi purpose toolbar
	    if(addressForThumbs) {
		    prevView = 'listinventory';
	    } else {
		    prevView = 'listfloorplans';
	    }
	    
	    MyApp.prevView = prevView;

		//address may or may not be set, not if coming from floorplans.  Still going to set both params or url and let the Picasa script sort it out.	    
	    var searchURL = 'picasa.php?address=' + addressForThumbs + '&plannum=' + plannumForThumbs;
	    store.getProxy().setUrl(searchURL);
    	store.load();
    	
    	//wipe app storage vars
    	MyApp.addressForThumbs = null;
    	MyApp.plannumForThumbs = null;

	},
	
	LaunchBig: function(extCmp, index, target, record) {
		
    	//set dimensions of big image for ideal viewing

    	var _viewH = MyApp.viewHeight;
    	var _viewW = MyApp.viewWidth;
    	
    	var _imgHeight = record.get('bigHeight');
    	var _imgWidth = record.get('bigWidth');

    	if(_imgHeight>_imgWidth) {
	    	var _imgAspect = _imgWidth / _imgHeight;
	    	var _imgNewHeight = 0.9 * _viewH;
	    	var _imgNewWidth = _imgAspect * _imgNewHeight;
	    	//explicit check of new dimensions against viewport dimensions
	    	if(_imgNewWidth > _viewW) {
		    	//refigure the other way around
		    	var _imgAspect = _imgHeight / _imgWidth;
		    	var _imgNewWidth = 0.9 * _viewW;
		    	var _imgNewHeight = _imgAspect * _imgNewWidth;
	    	}
    	} else {
	    	var _imgAspect = _imgHeight / _imgWidth;
	    	var _imgNewWidth = 0.9 * _viewW;
	    	var _imgNewHeight = _imgAspect * _imgNewWidth;
	    	//explicit check of new dimensions against viewport dimensions
	    	if(_imgNewHeight > _viewH) {
		    	//refigure the other way around
		    	var _imgAspect = _imgWidth / _imgHeight;
		    	var _imgNewHeight = 0.9 * _viewH;
		    	var _imgNewWidth = _imgAspect * _imgNewHeight;
	    	}
    	}

	    var _image = Ext.getCmp('extimgHandle');
	    var _imgPanel = Ext.getCmp('imageHandle');
	    _image.setHeight(_imgNewHeight);
	    _image.setWidth(_imgNewWidth);
    	var _bigPath = record.get('bigPath');
    	
	    _image.setSrc(_bigPath);
	    //launch big view after brief delay
	    setTimeout(function() {
	    	_imgPanel.show();
	    }, 500);
	},
	
	Closing: function() {
		Ext.getCmp('mainHandle').removeCls('black');
	}
	
});