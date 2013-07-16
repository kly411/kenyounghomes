Ext.define('MyApp.view.Thumbnails', {
    extend: 'Ext.dataview.DataView',
    requires: ['Ext.data.Store'],
    
    xtype: 'thumbnails',

    config: {
        id: 'thumbsHandle',
	    store: 'thumbsStoreID',
	    itemCls: 'imgThumb',
   	    baseCls: 'imgThumbList',
   	    disableSelection: true,
   	    hastoolbar: true,
   	    hasbackbtn: true,
	    
	    itemTpl : new Ext.XTemplate(["<div style='width:100%;height:100%;padding:0;margin:0;border:0;'><img style='padding:0;margin:0;border:0;' src='{thumbPath}'></img></div>"].join(''))
    }
});