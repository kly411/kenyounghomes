Ext.define('MyApp.view.Buildareas', {
    extend: 'Ext.dataview.List',
    requires: ['Ext.data.Store'],
    
    xtype: 'listbuildareas',

    config: {
        id: 'buildareasHandle',
	    store: 'buildareasStoreID',
	    itemCls: 'iRowItem',
	    scrollable: 'vertical',
	    disableSelection: true,
	    hastoolbar: true,
	    pagetitle: 'Where We Build',
	    hasbackbtn: false,
	    
	    itemTpl : new Ext.XTemplate(["<div id='kyh-subd-item' style='float:left;display:inline-block;'>{subname}</div><div id='ios-disclosure-indicator' style='float:right;display:inline-block'><img src='resources/image/iOS-UITableViewCellAccessoryDisclosureIndicator.png' style='height:20px;' /></div>"].join('')),
	    
	    listeners: {
		    itemtap: function(view, index, target, record) {
		    	var _subname = record.get('subname');
		    	var _subdesc = record.get('subdesc');
		    	var _subLat = record.get('latitude');
		    	var _subLong = record.get('longitude');
		    	//don't create maps anchor for 'Custom Homes' entry
		    	if(_subLat===null || _subLong===null) {
			    	_mapsAnchor = '';
		    	} else {
			    	var _mapsURL = 'http://maps.google.com/?q=' + _subLat + ',' + _subLong;
			    	var _mapsAnchor = "<a href='" + _mapsURL + "'>MAP</a>";	
		    	}

			   	//Set page title
				var _appToolBar = Ext.getCmp('temptoolbar');
				_appToolBar.setTitle(_subname);
	
			    //launch panel just like inv to thumbnails
			    MyApp.buildSubdName = _subname;
			    MyApp.buildSubdDesc = _subdesc;
			    MyApp.mapsAnchor = _mapsAnchor;
			    MyApp.prevView = 'listbuildareas';
				
			    Ext.getCmp('mainHandle').animateActiveItem('buildareainfo',{type: 'slide', direction: 'left'});   
		    }
	    }
	    
    }


});

/*
	
	<div id='kyh-subd-item'>{name}</div>
	
*/