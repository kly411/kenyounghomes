Ext.define('MyApp.controller.Title', {
	extend: 'Ext.app.Controller',
	config: {
	    refs: {
	        ShowPagesButton: '#ShowPagesButton',
	        HomeButton: '#HomeButton'
	    },
	    control: {
	        ShowPagesButton: {
	            tap: "ShowPages"
	        },
	        HomeButton: {
		        tap: "GoHome"
	        }
	    }
	},
	
	ShowPages: function(){
//	    console.log("Wazzup!?");
		//Below is only to show panel that was instantiated on app launch.  See app.js
		Ext.getCmp('pagesHandle').show();
	},
	GoHome: function(){
		Ext.getCmp('mainHandle').animateActiveItem('home',{type: 'reveal', direction: 'up'});
	}
});