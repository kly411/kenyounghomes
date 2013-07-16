Ext.define('MyApp.store.ThumbnailsStore', {
	extend: "Ext.data.Store",
	requires: "Ext.MessageBox",
    config: {
	    storeId: 'thumbsStoreID',
	    model: 'MyApp.model.Thumbnails',

	    proxy: {
	        type: 'ajax',
			url : 'picasa.php?address=' + localStorage.getItem('addressForThumbs') + '&plannum=' + localStorage.getItem('plannumForThumbs'),
	        reader: 'json',
	        listeners: {
		        exception: function(request, response, operation) {
			        //alert(response.responseText);
			        var _addressForThumbs = decodeURIComponent(localStorage.getItem('addressForThumbs'));
			        //alert('No images found for address: ' + _addressForThumbs + '');
			        var _msg = 'No images found for this property or plan';
			        Ext.Msg.alert('', _msg, Ext.emptyFn);
				    Ext.getCmp('temptoolbar').hide();
				    var _prevView = localStorage.getItem('prevView');
				    Ext.getCmp('mainHandle').animateActiveItem(_prevView,{type: 'reveal', direction: 'up'});
		        }
	        }
	    },
	    autoLoad: false
    }
});