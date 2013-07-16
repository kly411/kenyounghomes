Ext.define('MyApp.store.FloorplansStore', {
	extend: "Ext.data.Store",
    config: {
	    storeId: 'floorplansStoreID',
	    model: 'MyApp.model.Floorplans',

	    proxy: {
	        type: 'ajax',
//	        url : 'http://localhost/http/kyh3dot0/mobile/fp-m-sql.php',
			url : 'sql/fp-m-sql.php',
	        reader: 'json'
	    },
	    autoLoad: true
    }
});