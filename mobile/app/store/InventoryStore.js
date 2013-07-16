Ext.define('MyApp.store.InventoryStore', {
	extend: "Ext.data.Store",
    config: {
	    storeId: 'inventoryStoreID',
	    model: 'MyApp.model.Inventory',

	    proxy: {
	        type: 'ajax',
//	        url : 'http://localhost/http/kyh3dot0/mobile/inv-m-sql.php',
			url : 'sql/inv-m-sql.php',
	        reader: 'json'
	    },
	    autoLoad: true
    }
});