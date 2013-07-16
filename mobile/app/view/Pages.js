Ext.define('MyApp.view.Pages', {
    extend: 'Ext.DataView',
    requires: ['Ext.data.Store'],
    
    xtype: 'listpages',

    config: {
    	id: 'pagesHandle',
	    store: 'pagesStoreID',
	    itemCls: 'PagesRow',
	    baseCls: 'pagesPanel',
	    autoDestroy: false,
	    hastoolbar: false,
   	    disableSelection: true,
   		centered: true,
   	    
	    	    
	    itemTpl : "<div style='text-align:left;margin-left:7%;line-height:35px;'><img style='vertical-align:middle;height:35px;' src='resources/image/{imgfile}'>&nbsp;&nbsp;&nbsp;{text}</div>",
	    
	    listeners: {
	    	itemtap: function(extCmp, index, target, record) {
	    		
	    		var _nextView = record.get('view');
	    		
	    		if(_nextView==='desktop') {
		    		window.location = "http://kenyounghomes.com?view=d";
	    		} else {
		            Ext.getCmp('pagesHandle').hide();
			        Ext.getCmp('mainHandle').animateActiveItem(_nextView,{type: 'reveal', direction: 'up'});		    	
	    		}
	    	}
	    }
    }

});