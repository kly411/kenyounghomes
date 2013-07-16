Ext.define('MyApp.view.Title', {
	extend: 'Ext.TitleBar',
	xtype: 'kyhtitlebar',
	config: {	
		items: [{
		    text: "",
		    iconCls: 'home',
		    iconMask: true,
		    id: 'HomeButton'
		},
		{
		    text: "",
		    iconCls: 'action',
		    iconMask: true,
		    id: 'ShowPagesButton',
		    align: 'right'
		}]
	}          
})