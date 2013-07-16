Ext.define('MyApp.view.Inventory', {
    extend: 'Ext.dataview.List',
    requires: ['Ext.data.Store'],
    
    xtype: 'listinventory',

    config: {
    
        id: 'invlistHandle',
	    store: 'inventoryStoreID',
	    itemCls: 'iRowItem',
	    disableSelection: true,
	    hastoolbar: true,
	    pagetitle: 'Inventory',
	    hasbackbtn: false,
	    
	    itemTpl : new Ext.XTemplate(["<div id='kyh-inv-item'><div class='kyh-inv-item-head'>{address}, {subdivision}</div><div id='kyh-inv-item-detail'><div class='kyh-inv-item-detail-row'><div style='float:left;width:50%;' class='kyh-inv-item-detail-price'>{price}</div><div id='kyh-inv-item-detail-bed' style='float:right;width:50%;'>Comp Date:</div></div><div class='kyh-inv-item-detail-row'><div id='kyh-inv-item-detail-plan' style='float:left;width:50%;'>{plannum} SqFt</div><div id='kyh-inv-item-detail-bath' style='float:right;width:50%;'>{status}</div></div></div></div>"].join(''))
    }


});