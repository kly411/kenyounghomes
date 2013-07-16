Ext.define('MyApp.view.Image', {
    extend: 'Ext.Panel',
    requires: 'Ext.Img',
    
    xtype: 'imageview',

    config: {
    	id: 'imageHandle',
    	hastoolbar: false,
	    
	    items: [
	    {
		    xtype: 'button',
		    id: 'imgClose',
		    //iconMask: true,
		    //iconCls: 'delete',
		    html: "<span>X</span>",
		    ui: 'plain',
		    style: 'position:absolute;left:0;top:0;z-index:1020;',
		    width: '30px',
		    listeners: {
			    tap: function() {
				    Ext.getCmp('imageHandle').hide();
			    }
		    }
		    
	    },
	    {
		    xtype: 'image',
		    id: 'extimgHandle',
		    src: 'http://kenyounghomes.com/image/logos-etc/Ken-Young-Logo.png'
		    
	    }]
    }
    

});