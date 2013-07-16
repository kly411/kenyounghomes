Ext.define('MyApp.view.Main', {
    extend: 'Ext.Panel',
    requires: [
        'MyApp.view.Title',
        'MyApp.view.Pages',
        'MyApp.view.Image'
    ],
    
    xtype: 'main',
    
    config: {
        id: 'mainHandle',
        scrollable: false,
        baseCls: 'mainCls',
        styleHtmlContent: true,
        layout: 'card',
        deferredRender: true,

		items: [
			{
				docked: 'top',
				xtype: 'kyhtitlebar',
				align: 'center',
				title: 'KenYoungHomes.com'
			},
			{
				docked: 'top',
				xtype: 'toolbar',
				align: 'center',
				title: 'TempToolBar',
				baseCls: 'thumbsToolbar',
				id: 'temptoolbar',
				hidden: true,
				items: [{
					text: "",
				    iconCls: 'arrow_left',
				    ui: 'plain',
				    cls: 'my-toolbar-back',
				    iconMask: true,
				    id: 'tempBackButton',
				    align: 'right',
				    listeners: {
					    tap: function() {
						    Ext.getCmp('temptoolbar').hide();
						    var prevView = MyApp.prevView;
						    Ext.getCmp('mainHandle').animateActiveItem(prevView,{type: 'slide', direction: 'right'});
					    }
				    }
				}]
			},
			{
				xtype: 'home',
				scrollable: true
			},
			{
				xtype: 'listinventory',
				align: 'center'
			},
			{
				xtype: 'thumbnails'
			},
			{
				xtype: 'listbuildareas'
			},
			{
				xtype: 'buildareainfo'
			},
			{
				xtype: 'listfloorplans'
			}
		]

	}



	
});