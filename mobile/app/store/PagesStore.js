Ext.define('MyApp.store.PagesStore', {
	extend: "Ext.data.Store",
    config: {
	    storeId: 'pagesStoreID',
	    model: 'MyApp.model.Pages',
        data: [
	        { text: "Home", view: "home", imgfile: "kyh-m-home.png"},
	        { text: "Inventory", view: "listinventory", imgfile: "kyh-m-inventory.gif"},
	        { text: "Floorplans", view: "listfloorplans", imgfile: "kyh-m-floorplan.png"},
	        { text: "Where We Build", view: "listbuildareas", imgfile: "kyh-m-buildmap.png"},
	        { text: "Contact Us", view: "contact", imgfile: "kyh-m-contact.jpg"},
	        { text: "Desktop Site", view: "desktop", imgfile: "kyh-m-desktoplink.jpg"}
        ],
        autoload: true
    }
});