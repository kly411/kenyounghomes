Ext.define('MyApp.store.AccordionTest', {
	extend: "Ext.data.Store",
    config: {
	    storeId: 'actestStoreID',
	    model: 'MyApp.model.AccordionTest',
	    
        sorters : 'lastName',

        grouper : {
            groupFn : function(record) {
                return record.get('lastName')[0];
            }
        },
	    
        data: [
	        { firstName: "Kenny", lastName: "Young"},
   	        { firstName: "Rob", lastName: "Francis"},
        ],
        autoload: true
    }
});