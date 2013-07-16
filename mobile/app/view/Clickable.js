Ext.define('MyApp.view.Clickable', {
    extend: 'Ext.Panel',
    requires: [
        'MyApp.view.Title',
        'MyApp.view.Pages'
    ],
    
    xtype: 'clickable',
    
    config: {
        id: 'clickableHandle',
        baseCls: 'clickable',
        scrollable: false,
        hastoolbar: false,

        html: "<div><img src='resources/image/kyh-m-photos-icon.png' /></div>"

	}

})