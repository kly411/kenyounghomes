Ext.define('MyApp.view.Home', {
    extend: 'Ext.Panel',
    requires: [
        'MyApp.view.Title',
        'MyApp.view.Pages'
    ],
    
    xtype: 'home',
    
    config: {
        id: 'homeHandle',
        baseCls: 'mainCls',
        scrollable: false,
        hastoolbar: false,

				html: "<div id='k-header' style='width:100%;background-color:#826D5C;'><div class='k-spacer' style='width:100%;height:7px;'></div><div id='k-logo' style='width:177px;height:88px;margin:0 auto'><img src='resources/image/Ken-Young-Logo.png' /><br /></div><div class='k-spacer' style='width:100%;height:7px;'></div><div id='bluebar' style='width:100%;height:2px;background-color:#4E6172;'>&nbsp;</div></div><div id='k-contain' style='width:95%;margin:0 auto'><br />With an immediate staff boasting a collective 50+ years in residential construction experience, it's	safe to assume 			that we've learned what does and doesn't work. Further, by paying attention to our many 	customers, we've amassed quite a perspective on what you, 			the consumer, consider quality to be.<br /><br /><div id='tpraclogo' style='text-align:center;'>Site/App by <a href='http://www.techpractical.com' target='_new'>TechPractical.com</a></div></div>"

	}



	
})