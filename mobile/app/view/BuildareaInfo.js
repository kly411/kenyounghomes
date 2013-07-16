Ext.define('MyApp.view.BuildareaInfo', {
    extend: 'Ext.Panel',
    xtype: 'buildareainfo',

    config: {
        id: 'buildareainfoHandle',
        html: "placeholder",
        scrollable: 'vertical',
        hastoolbar: true,
        hasbackbtn: true,

        listeners: {
	        show: function() {
	        
	        	var _subName = MyApp.buildSubdName;
	        	var _subDesc = MyApp.buildSubdDesc;
	        	var _mapsAnchor = MyApp.mapsAnchor;
	        	
		        this.setHtml("<br /><div id='subdDescription' style='width:95%;margin:0 auto'>" + _subDesc + '<br />' + _mapsAnchor + '<br /></div>');
	        }
        }
    }
});