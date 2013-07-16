Ext.define('MyApp.model.Pages', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'text', type: 'string' },
            { name: 'view', type: 'string' },
            { name: 'imgfile', type: 'string' }
        ]
    }
});