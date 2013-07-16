Ext.define('MyApp.view.Contact', {
    extend: 'Ext.Panel',
    requires: [
        'MyApp.view.Title',
        'MyApp.view.Pages'
    ],
    
    xtype: 'contact',
    
    config: {
        id: 'contactHandle',
        scrollable: false,
        //baseCls: 'mainCls',
        hastoolbar: true,
        pagetitle: 'Contact Us',
        hasbackbtn: false,

				html: "<div id='k-header' style='width:100%;background-color:#826D5C;'><div class='k-spacer' style='width:100%;height:7px;'></div><div id='k-logo' style='width:177px;height:88px;margin:0 auto'><img src='resources/image/Ken-Young-Logo.png' /><br /></div><div class='k-spacer' style='width:100%;height:7px;'></div><div id='bluebar' style='width:100%;height:2px;background-color:#4E6172;'>&nbsp;</div></div><div id='k-contain' 			style='width:95%;margin:0 auto'><br />Please give us a call at <a href='tel:+15013152595'>501-315-2595</a> or email at <a href='mailto:contact@kenyounghomes.com'>contact@kenyounghomes.com</a><br /><br />Questions or comments about this website/app?  Please let us know. <a href='mailto:webmaster@kenyounghomes.com'>webmaster@kenyounghomes.com</a><br /><br />Thanks!</div>"


	}



	
})