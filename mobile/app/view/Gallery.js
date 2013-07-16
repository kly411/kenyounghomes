Ext.define('MyApp.view.Gallery', {
    extend: 'Ext.carousel.Carousel',
    
    direction: 'vertical',
    
    defaults: {
	    styleHtmlContent: true
    },
    
    xtype: 'gallery',
    
    config: {
        id: 'galleryHandle',
        //scrollable: true,
        //styleHtmlContent: true,
              
//        scrollable: true,

		items: [
	        {
	            html : 'Item 1',
	            style: 'background-color: #759E60'
	        },
	        {
	            html : 'Item 2',
	            style: 'background-color: #5E99CC'
	        }
		]

	}



	
})