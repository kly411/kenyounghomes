Ext.define('MyApp.model.Thumbnails', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'thumbPath', type: 'string' },
            { name: 'bigPath', type: 'string' },
            { name: 'bigWidth', type: 'int' },
            { name: 'bigHeight', type: 'int' }
        ]
    }
});