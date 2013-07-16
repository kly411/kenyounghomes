Ext.define('MyApp.controller.Floorplans', {
	extend: 'Ext.app.Controller',
	config: {
	    refs: {
	        fplistHandle: '#fplistHandle'
	    },
	    control: {
	        fplistHandle: {
	            itemtap: "GoThumbnails"
	        }
	    }
	},
	
	GoThumbnails: function (view, index, target, record) {
			    //attempt to set global var for acces by thumbnail proxy

			    //var _address = record.get('address');
			    var _plannum = record.get('plannum');
			    
			   	//Make app's supplemental toolbar visible.
				var _appToolBar = Ext.getCmp('temptoolbar');
				_appToolBar.setTitle('Plan: ' + _plannum);
				_appToolBar.show();

				MyApp.plannumForThumbs = _plannum;
				
   			    Ext.getCmp('mainHandle').animateActiveItem('thumbnails',{type: 'reveal', direction: 'up'});
    }
	

	
});