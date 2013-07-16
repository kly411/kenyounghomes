Ext.define('MyApp.view.Floorplans', {
    extend: 'Ext.dataview.List',
    requires: ['Ext.data.Store'],
    
    xtype: 'listfloorplans',

    config: {
        id: 'fplistHandle',
	    store: 'floorplansStoreID',
	    itemCls: 'iRowItem',
	    disableSelection: true,
	    hastoolbar: true,
	    pagetitle: 'Floorplans',
	    hasbackbtn: false,
	    
	    itemTpl : new Ext.XTemplate(["<div id='kyh-inv-item'><div class='kyh-inv-item-head'>Floorplan {plannum}</div><div id='kyh-inv-item-detail'><div class='kyh-inv-item-detail-row'><div style='float:left;width:50%;' class='kyh-inv-item-detail-price'>{price}</div><div id='kyh-fp-detail-bed' style='float:right;width:50%;'>{numbed} beds</div></div><div class='kyh-inv-item-detail-row'><div id='kyh-inv-item-detail-plan' style='float:left;width:50%;'>{plannum} SqFt</div><div id='kyh-fp-detail-bath' style='float:right;width:50%;'>{numbath} baths</div></div></div></div>"].join(''))
    }


});