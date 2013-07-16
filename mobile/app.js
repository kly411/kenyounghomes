//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'MyApp': 'app'
});
//</debug>

Ext.application({
    name: 'MyApp',
    viewport: { autoMaximize: true },

    requires: [
        'Ext.MessageBox',
        'Ext.data.Store'
    ],

    views: [
    	'Main',
	    'Home',
	    'Inventory',
	    'Pages',
	    'Title',
	    'Thumbnails',
	    'Image',
	    'ToolbarTest',
	    'Floorplans',
	    'Buildareas',
	    'BuildareaInfo',
	    'Contact',
	    'Clickable'
    ],
    
    models: ['Inventory', 'Pages', 'Thumbnails','Floorplans','Buildareas'],
    
    stores: ['InventoryStore','PagesStore','ThumbnailsStore','FloorplansStore','BuildareasStore'],
    
    controllers: ['Title','Thumbnails','Inventory','Floorplans','Main'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    
    viewHeight: '',
    viewWidth: '',
    viewAspect: '',
    addressForThumbs: '',
    plannumForThumbs: '',
    preview: '',
    buildSubdName: '',
    buildSubdDesc: '',
    mapsAnchor: '',


    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        //get window / viewport dimensions for later use
        
        var _viewHeight = Ext.Viewport.getWindowHeight();
        var _viewWidth = Ext.Viewport.getWindowWidth();
        
    	if(_viewHeight<_viewWidth) {
	    	_viewAspect = _viewWidth / _viewHeight;
    	} else {
	    	_viewAspect = _viewHeight / _viewWidth;
    	}
        
        MyApp.viewHeight = _viewHeight;
        MyApp.viewWidth = _viewWidth;
        MyApp.viewAspect = _viewAspect;
        MyApp.prevView = '';
        
        // Initialize the main view
        Ext.Viewport.add(Ext.create('MyApp.view.Main'));
        Ext.Viewport.add({
			xtype: 'listpages',
			width: '90%',
			centered: true,
			modal: true,
			hideOnMaskTap: true,
			hidden: true
		});
        Ext.Viewport.add({
			xtype: 'imageview',
			maxwidth: '90%',
			margin: '0 0 0 0',
			padding: '0 0 0 0',
			centered: true,
			modal: true,
			hideOnMaskTap: true,
			hidden: true
		});
        Ext.Viewport.add({
			xtype: 'clickable',
			margin: '0 0 0 0',
			padding: '0 0 0 0',
			centered: true,
			modal: false,
			hidden: true
		});
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
