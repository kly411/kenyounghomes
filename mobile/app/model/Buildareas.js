Ext.define('MyApp.model.Buildareas', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'subname', type: 'string' },
            { name: 'subdesc', type: 'string' },
            { name: 'latitude', type: 'float' },
            { name: 'longitude', type: 'float' }
        ]
    }
});