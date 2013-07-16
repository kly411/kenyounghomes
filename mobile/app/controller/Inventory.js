Ext.define('MyApp.controller.Inventory', {
	extend: 'Ext.app.Controller',
	requires: 'Ext.Anim',
	config: {
	    refs: {
	        invlistHandle: '#invlistHandle'
	    },
	    control: {
	        invlistHandle: {
	            itemtap: "GoThumbnails",
	            show: "ShowClickable"
	        }
	    }
	},
	
	GoThumbnails: function (view, index, target, record) {
			    //attempt to set global var for acces by thumbnail proxy

			    var _address = record.get('address');
			    var _plannum = record.get('plannum');
			    
			   	//Make app's supplemental toolbar visible.
				var _appToolBar = Ext.getCmp('temptoolbar');
				_appToolBar.setTitle(_address);
				_appToolBar.show();

			    _address = encodeURIComponent(_address);
			    
			    MyApp.addressForThumbs = _address;
			    MyApp.plannumForThumbs = _plannum;
				
   			    Ext.getCmp('mainHandle').animateActiveItem('thumbnails',{type: 'reveal', direction: 'up'});
    },
    
    ShowClickable: function() {
    
    	var _clickIndicator = Ext.getCmp('clickableHandle');
    
	    _clickIndicator.show();

	    setTimeout(function() {
	    	Ext.Anim.run(_clickIndicator, 'fade', {
		    	out: true,
		    	after: function(el) {
			    	el.hide();
		    	},
		    	duration: 1000
	    	});
	    	//_clickIndicator.hide({type:'fade'});
	    }, 1500);

    }
	

	
});