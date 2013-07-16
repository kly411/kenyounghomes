Ext.define('MyApp.model.Floorplans', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'numbed', type: 'string' },
            { name: 'numbath', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'plannum', type: 'int' }
        ]
    }
});