Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
	    refs: {
	        mainHandle: '#mainHandle'
	    },
	    control: {
	        mainHandle: {
	            activeitemchange: "HideToolbar"
	        }
	    }
	},
	
	HideToolbar: function (obj, view) {
		var _hastoolbar = view.config.hastoolbar;
		var _hasbackbtn = view.config.hasbackbtn;
		var _pagetitle = view.config.pagetitle;
		var _backBtn = Ext.getCmp('tempBackButton');
		var _toolBar = Ext.getCmp('temptoolbar');
		
		if(!(_hastoolbar)) {
			_toolBar.hide();
		} else {
			if(_pagetitle != null) {
				_toolBar.setTitle(_pagetitle);
			}
			
			_toolBar.show();
		}
		if(!(_hasbackbtn)) {
			_backBtn.hide();
		} else {
			_backBtn.show();
		}
    }
	

	
});