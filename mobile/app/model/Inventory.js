Ext.define('MyApp.model.Inventory', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'address', type: 'string' },
            { name: 'subdivision', type: 'string' },
            { name: 'price', type: 'string' },
            { name: 'plannum', type: 'int' },
            { name: 'status', type: 'string' }
        ]
    }
});