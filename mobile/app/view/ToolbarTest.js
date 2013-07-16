Ext.define('MyApp.view.ToolbarTest', {
    extend: 'Ext.Panel',    
    xtype: 'tooltest',
    
    config: {
        id: 'toolHandle',


		items: [{
			xtype: 'toolbar',
			docked: 'top',
			title: 'TESTER',
		    baseCls: 'thumbsToolbar'
		}]

	}



	
})