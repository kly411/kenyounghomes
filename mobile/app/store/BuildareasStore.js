Ext.define('MyApp.store.BuildareasStore', {
	extend: "Ext.data.Store",
    config: {
	    storeId: 'buildareasStoreID',
	    model: 'MyApp.model.Buildareas',

	    proxy: {
	        type: 'ajax',
//	        url : 'http://localhost/http/kyh3dot0/mobile/subs-m-sql.php',
			url : 'sql/subs-m-sql.php',
	        reader: 'json'
	    },
	    autoLoad: true
    }
});