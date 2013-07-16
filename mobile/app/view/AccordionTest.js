Ext.define('MyApp.view.AccordionTest', {
    extend: 'Ext.Container',
    requires: [
	    'Ext.dataview.List',
	    'Ext.field.Text',
	    'Ext.Toolbar',
	    'Ext.ux.layout.Accordion'
    ],
    
    xtype: 'actestview',
    
    config: {
        id: 'actestHandle',
                
		fullscreen : true,
		layout     : {
			type :  "accordion",
			toggleOnTitlebar: true,
			mode: 'SINGLE'
		},

        items      : [
            {
                title : 'SUBD NAME',
                items : {
                    xtype: 'panel',
                    html: "CONTENT"
                }
            },
            {
                title : 'SUBD NAME',
                items : {
                    xtype: 'panel',
                    html: "CONTENT"
                }
            },
            {
                title : 'SUBD NAME',
                items : {
                    xtype: 'panel',
                    html: "CONTENT"
                }
            }
        ],
        listeners: {
	        painted: function() {
		        this.layout.checkMode(this);
	        }
        }
	}
})