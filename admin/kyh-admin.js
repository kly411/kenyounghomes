//GLOBALs
var _labels = new Array();
var _form = "";
var _contents = new Array();
var _IDs = new Array();
var _spacerrow = "<tr><td>&nbsp;</td><td>&nbsp;</td></tr>";
var _address = "";
var _upd_id = "";
var _errors = false;
var _message_success = "<div class='action-message'>UPDATE SUCCESSFUL</div>";
var _id = "";
var _content = "";
var _name = "";

function DoSubmit() {
	document.formAddEdit.submit();
}

function CloseModal() {
	$.colorbox.close();
}

function DeleteThis() {

	var _decision = confirm("Delete item " + _address + " ?");

	if(_decision==true) {
		var _deleteme = document.getElementById('deleteme');
		_deleteme.checked = true;
		DoSubmit();
	} else {
		//DO NOTHING
	}
}

function AddThis() {
	var _addme = document.getElementById('addme');
	_addme.checked = true;
}

function ShowAddEditForm(_action) {
	$.colorbox({html: _form,
		onComplete: function() {
			$('#comp-date').datepicker();
			$('.meta').css({'visibility':'hidden'});
			if(_action=='add') {
				var _addme = document.getElementById('addme');
				_addme.checked = true;
			}
			$('select#subdivision').change(function() {
				NewSubdOnTheFly(this);
			});
		},
		escKey: false,
		overlayClose: false,
		maxWidth:500,
		maxHeight:700,
		open: true,
		opacity: 0.3
	});
}

function ShowAddEditFormFP(_action) {
	$.colorbox({html: _form,
		onComplete: function() {
			$('.meta').css({'visibility':'hidden'});
			if(_action=='add') {
				var _addme = document.getElementById('addme');
				_addme.checked = true;
			}
		},
		escKey: false,
		overlayClose: false,
		maxWidth:500,
		maxHeight:700,
		open: true,
		opacity: 0.3
	});
}

function BuildSubdivisionsSelect(_curr_selection, _id) {
	var _htmlfield = "<select id='" + _id + "' name='" + _id + "'>";
	var _i = 0;
	var _selected = "";
	var _temp = "";
	var _hasSelection = "";

	_htmlfield = _htmlfield + "<option value=''> </option>";
	_htmlfield = _htmlfield + "<option value='new'>CREATE NEW</option>";

	$('.subd-set').each(function() {
		var _item = $(this).text();
		if(_item==_curr_selection) {
			_selected = " selected";
			_hasSelection = "true";
		} else {
			_selected = "";
		}
		_htmlfield = _htmlfield + "<option value='" + _item + "'" + _selected + ">" + _item + "</option>";
	});
	_htmlfield = _htmlfield + "</select>";

	//if subdivision is non-standard, present text field instead of select.  Due to order, this is higly inefficient.
	if(_hasSelection=="" && _curr_selection!="") {
		_value = _curr_selection.replace(/'/g, "&#39;");
		_htmlfield = "<input type='text' id='subdivision' name='subdivision' value='" + _value + "' />";
	}

	return _htmlfield;
}

function BuildInputElement(_id,_name,_type,_value,_adtl_args) {

	// _adtl_args is for any extra element attributes that need to be set

	//universally prepend _id with "f_" so input element has different dom id than it's containing TD/TH.
	//_id = 'f-'. _id;

	var _htmlfield = "";

	_value = _value.replace(/'/g, "&#39;");

	if(_type=='text') {
		_htmlfield = "<input type='text' id='" + _id + "' name='" + _id + "' value='" + _value + "' " + _adtl_args + " />";
	} else if(_type=='check') {
		_htmlfield = "<input id='" + _id + "' value='" + _value +  "' name='" + _id + "' type='checkbox' " + _adtl_args + " />"
	}

	return _htmlfield;
}

function BuildAnchorButton(_function,_text) {
	var _htmlfield = "<a href='javascript:" + _function + "'>" + _text + "</a>";
	return _htmlfield;
}

function MakeCell(_content,_colspan, _adtl_args) {
	if(typeof _adtl_args === 'undefined') {
		var _adtl_args = "";
	}
	var _htmlfield = "<td colspan='" + _colspan.toString() + "' " + _adtl_args + ">" + _content + "</td>";
	//alert(_htmlfield);
	return _htmlfield;
}

function GetFormMeta(_action) {

	if(_action=='add') {
		var _name = 'addme';
	} else {
		var _name = 'deleteme';
		//hidden field to store original address in case it is modified
		_form = _form + "<tr>" + MakeCell(BuildInputElement('orig-address','orig-address','text',_address," class='meta'"),2) + "</tr>";
	}

	//hidden field to trigger add/delete when appropriate.  Also serves as spacer row.
	_form = _form + "<tr>" + MakeCell(BuildInputElement(_name,_name,'check','1'," class='meta'"),2) + "</tr>";
}

function GetFormMetaFP(_action) {

	if(_action=='add') {
		var _name = 'addme';
	} else {
		var _name = 'deleteme';
	}

	_form = _form + "<tr>" + MakeCell(BuildInputElement('upd-id','upd-id','text',_upd_id," class='meta'"),2) + "</tr>";

	//hidden field to trigger add/delete when appropriate.  Also serves as spacer row.
	_form = _form + "<tr>" + MakeCell(BuildInputElement(_name,_name,'check','1'," class='meta'"),2) + "</tr>";
}

function GetFormButtons(_action) {

	if(_action=='edit') {
		var _savetext = 'SAVE CHANGES';
	} else {
		var _savetext = 'SUBMIT';
	}

	_form = _form + "<tr>" + MakeCell(BuildAnchorButton('Validate()',_savetext),1) + MakeCell(BuildAnchorButton('CloseModal()','CANCEL'),1) + "</tr>";

	_form = _form + _spacerrow;

	if(_action=='edit') {
		_form = _form + "<tr>" + MakeCell(BuildAnchorButton('DeleteThis()','DELETE THIS ENTRY'),2) + "</tr>";
	}
}

function DoEditRow(_obj) {
	//Grab row and it's column element text's and load in to modal div for edit.

	//build form
	_form = "<div class='add-edit-panel'><form id='formAddEdit' name='formAddEdit' action='index.php?pageid=inventory' method='post'><table>";
	var _label = "";
	var _ID = "";
	var _htmlrow = "";
	var _htmllabel = "";
	var _htmlfield = "";
	var _checked = "";
	var _value = "";

	//HEADER
	_form = _form + "<tr>" + MakeCell("<b>EDITING</b>",2,"align='center'") + "</tr>";

	_form = _form + _spacerrow;


	$(_obj).children().each(function() {
		_ID = $(this).attr('id');
		var _selector = '#' + _ID;
		_label = $('#inv-header').children('#' + _ID).text();
		var _text = $(this).text();
		_htmllabel = "<label for='" + _label + "'>" + _label + "</label>";

		//see if this is SOLD field, in which case we need a checkbox.  ALSO need to initialize as checked when appropriate
		if(_label=='SOLD') {
			if($(this).children('input:checked').length > 0 ) {
				_checked = " checked='checked' ";
			}
			_htmlfield = BuildInputElement(_ID,_ID,'check','1',_checked);
			_checked = "";
		} else if(_label=='SUBDIVISION') {
			_htmlfield = BuildSubdivisionsSelect(_text,_ID);
		} else if(_label=='COMPLETION DATE') {
			_htmlfield = BuildInputElement('comp-date','comp-date','text',_text,"");
		} else if(_label=='EXISTING') {
                        //alert('existing text: ' + _text);
                        if(_text=='1') {
                            _checked = " checked='checked' ";
                        }
			_htmlfield = BuildInputElement('existing','existing','check','1',_checked);
                        _checked = '';
		} else if(_label=='PRICE'||_label=='LEASE PRICE') {
			//strip non-numeric chars
			var _price = _text.replace(/[^0-9]/g,"");
			_htmlfield = BuildInputElement(_ID,_ID,'text',_price);
		} else if(_label=='SQFT PRICE') {
			//DO NOTHING
		} else {
			_htmlfield = BuildInputElement(_ID,_ID,'text',_text);
		}

		if(_label!='SQFT PRICE' && _label!='KEY') {
			_htmlrow = "<tr>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";
			_form = _form + _htmlrow;
		}
		if(_label=='KEY') {
			_htmlfield = BuildInputElement('key','key','text',_text,"");
			_htmlrow = "<tr class='hideme'>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";
			_form = _form + _htmlrow;
		}

		//IF this is address, capture it to variable for use in delete confirmation OR address update
		if(_label=='ADDRESS') {_address = _text;}

	});
/*
	//Add field for lease price
	_htmllabel = "<label for='lease-price'>LEASE PRICE</label>";
	_htmlfield = BuildInputElement('lease-price','lease-price','text','');
*/
	GetFormMeta('edit');
	GetFormButtons('edit');

	_form = _form +  "</table></form></div>";

	ShowAddEditForm('edit');
}

function DoAddRow() {
	var _i = 0;

	//build form
	_form = "<div class='add-edit-panel'><form id='formAddEdit' name='formAddEdit' action='index.php?pageid=inventory' method='post'><table>";
	var _label = "";
	var _ID = "";
	var _htmlrow = "";
	var _htmllabel = "";
	var _htmlfield = "";

	//HEADER
	_form = _form + "<tr>" + MakeCell("<b>EDITING</b>",2,"align='center'") + "</tr>";
	_form = _form + _spacerrow;

	$('#inv-header').children().each(function() {
		_label = $(this).text();
		_ID = $(this).attr("id");
		_htmllabel = "<label for='" + _label + "'>" + _label + "</label>";

		//see if this is SOLD field, in which case we need a checkbox.
		if(_label=='SOLD') {
			_htmlfield = BuildInputElement(_ID,_ID,'check','1');
		} else if(_label=='SUBDIVISION') {
			_htmlfield = BuildSubdivisionsSelect('',_ID);
		} else if(_label=='COMPLETION DATE') {
			_htmlfield = BuildInputElement('comp-date','comp-date','text','',"");
		} else if(_label=='EXISTING') {
			_htmlfield = BuildInputElement('existing','existing','check','1');
		} else if(_label=='SQFT PRICE') {
			//DO NOTHING
		} else {
			_htmlfield = BuildInputElement(_ID,_ID,'text','');
		}

		if(_label!='SQFT PRICE' && _label!='KEY') {
			_htmlrow = "<tr>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";
			_form = _form + _htmlrow;
		}
		if(_label=='KEY') {
			_htmlfield = BuildInputElement('key','key','text','');
			_htmlrow = "<tr class='hideme'>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";
			_form = _form + _htmlrow;
		}


	});

	_form = _form + _spacerrow;

	GetFormMeta('add');
	GetFormButtons('add');

	_form = _form +  "</table></form></div>";

	ShowAddEditForm('add');

}

function DoEditRowFP(_obj) {
	//Grab row and it's column element text's and load in to modal div for edit.

	//build form
	_form = "<div class='add-edit-panel'><form id='formAddEdit' name='formAddEdit' action='index.php?pageid=floorplans' method='post'><table>";
	var _label = "";
	var _ID = "";
	var _htmlrow = "";
	var _htmllabel = "";
	var _htmlfield = "";
	var _checked = "";
	var _value = "";

	//HEADER
	_form = _form + "<tr>" + MakeCell("<b>EDITING</b>",2,"align='center'") + "</tr>";

	_form = _form + _spacerrow;


	$(_obj).children().each(function() {
		_ID = $(this).attr('id');
		var _selector = '#' + _ID;
		_label = $('#fp-header').children('#' + _ID).text();
		_text = $(this).text();

		if(_ID=='baseprice') {
			var _text = _text.replace(/[^0-9]/g,"");
		}

		if(_ID != 'upd-id') {
			_htmllabel = "<label for='" + _label + "'>" + _label + "</label>";
			_htmlfield = BuildInputElement(_ID,_ID,'text',_text);
		} else {
			_upd_id = _text;
		}
		_htmlrow = "<tr>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";

		_form = _form + _htmlrow;
	});


	GetFormMetaFP('edit');
	GetFormButtons('edit');

	_form = _form +  "</table></form></div>";

	ShowAddEditFormFP('edit');
}

function DoAddRowFP() {
	var _i = 0;

	//build form
	_form = "<div class='add-edit-panel'><form id='formAddEdit' name='formAddEdit' action='index.php?pageid=floorplans' method='post'><table>";
	var _label = "";
	var _ID = "";
	var _htmlrow = "";
	var _htmllabel = "";
	var _htmlfield = "";

	//HEADER
	_form = _form + "<tr>" + MakeCell("<b>EDITING</b>",2,"align='center'") + "</tr>";
	_form = _form + _spacerrow;

	$('#fp-header').children().each(function() {
		_label = $(this).text();
		_ID = $(this).attr("id");

		//see if this is SOLD field, in which case we need a checkbox.

		if(_ID!='upd-id') {
			_htmllabel = "<label for='" + _label + "'>" + _label + "</label>";
			_htmlfield = BuildInputElement(_ID,_ID,'text','');
		}
		_htmlrow = "<tr>" + MakeCell(_htmllabel,1) + MakeCell(_htmlfield,1) + "</tr>";

		_form = _form + _htmlrow;
	});

	_form = _form + _spacerrow;

	GetFormMetaFP('add');
	GetFormButtons('add');

	_form = _form +  "</table></form></div>";

	ShowAddEditFormFP('add');

}

function Validate() {
	var $_fields_text = $('#formAddEdit').find(':text');
	var $_subdivision = $('#formAddEdit').find(':selected');
	var _err_list = "";
	var _price_ok = true;
	var _plan_ok = true;
	var _price_size_warn = false;
	var _plan_size_warn = false;

	//iterate text fields ensuring none are empty
	$_fields_text.each(function() {

		var _id = $(this).attr('id');

		//dismiss if meta
		if($(this).attr('class')=='meta') {
			//do nothing
		} else if($(this).val()=='') {
			//allow blank for text subdivision AND lease price
			var _value = $(this).attr('id');
			if(_value=='subdivision'||_value=='lease-price'||_value=='key') {
				//do nothing
			} else {
				var _name = $(this).attr('id');
				_err_list = _err_list + ', ' + _name;
				_errors = true;
			}
		} else if(_id=='baseprice') {
			var _value = $(this).val();
			//validate price format
			if(isNaN(_value)) {
				_price_ok = false;
				_errors = true;
			} else if(_value.length!=6) {
				_price_size_warn = _value;
			}
		} else if(_id=='plannum') {
			var _value = $(this).val();
			//validate price format
			if(isNaN(_value)) {
				_plan_ok = false;
				_errors = true;
			} else if(_value.length!=4) {
				//may be allowable alpha chars so strip then check again
				var _price = _value.replace(/[^0-9]/g,"");
				if(_price.length!=4) {
					_plan_size_warn = _value;
				}
			}
		}
	});

	if(_err_list.length>0) {
		_err_list = _err_list.substr(1,(_err_list.length - 1));
		var _message = "* Please input a value for these field(s): " + _err_list;
	}

	if((!(_price_ok))) {
		if(!(_message)) {var _message = "";}
		var _message = _message + "\n* Only numbers are allowed in the price field.  Any financial symbols will be handled automatically."
		_errors = true;
	}

	if((!(_plan_ok))) {
		if(!(_message)) {var _message = "";}
		var _message = _message + "\n* Only numbers are allowed in the plan field.  Any financial symbols will be handled automatically."
		_errors = true;
	}


	if(_errors==true) {
		alert(_message);
		_errors = false;
		throw _message;
	} else {
		if(_price_size_warn) {
			var _message = "The price you input is not typical.  Is " + _price_size_warn + " correct?";
			var _decision = confirm(_message);
			if(_decision==false) {
				throw _message;
			}
		}
		if(_plan_size_warn) {
			var _message = "The plan number you input is not typical.  Is " + _plan_size_warn + " correct?";
			var _decision = confirm(_message);
			if(_decision==false) {
				throw _message;
			}
		}
		DoSubmit();
	}
}

function NewSubdOnTheFly(_obj) {
	var _selected_val = $(_obj).val();
	if(_selected_val=='new' || _selected_val=='') {
		//replace select with text field
		$(_obj).parent().append("<input type='text' id='subdivision' name='subdivision' />");
		$(_obj).remove();
	}
}

function SubdPreventNext() {
	//Prevent selection or addintion of another subdivision if one is already in edit mode
	if($('.subd-button').attr('disabled')) {
		//alert('inside if');
	} else {
		//cancel operation
		var _message = "There may be unsaved changes.  Please click either SAVE or CANCEL before selecting/adding another subdivision";
		alert(_message);
		$('#dowhat').val('');
		throw _message;
	}
}

function SubdCancel() {
	_content = $('#orig-content').val();
	_name = $('#orig-name').val();
	$('#txt-content').val(_content);
	$('#subd-name').val(_name);
	$('.subd-button').attr('disabled','');
	var _addYN = $('#dowhat').val();
	if(_addYN=='add') {
		$('.subd-field').val('');
		$('.subd-field-orig').val('');
	}
	$('#dowhat').val('add');
}

function SubdAdd() {
	//blank fields including orig and put ADDING NEW label over fields
	SubdPreventNext();
	$('.subd-field').removeAttr('disabled');
	$('.subd-field').val('');
	$('.subd-field-orig').val('');
	$('#action-label').text('ADDING');
	$('#dowhat').val('add');
}

function SubdDelete() {
	var _subdname = $('#orig-name').val();
	var _decision = confirm("Delete subdivision " + _subdname + " ?");

	if(_decision==true) {
		$('#dowhat').val('delete');
		document.formAddEditSubd.submit();
	} else {
		//DO NOTHING
	}
}

function SubdivisionClick(_obj) {

	SubdPreventNext();

	_content = $(_obj).siblings('#content').val();
	_id = $(_obj).parent().attr('id');
	_name = $(_obj).text();

	$('.subd-field').removeAttr('disabled');

	$('#rowid').val(_id);
	$('#txt-content').val(_content);
	$('#subd-name').val(_name);
	$('#orig-content').val(_content);
	$('#orig-name').val(_name);
	$('#action-label').text('EDITING');
}

function PositionStatus() {
	//position clickable indicator
	var winW = document.body.offsetWidth;
	var winH = document.body.offsetHeight;
	//alert(winW);
	var _center = ((winW / 2) - 100) + 'px';
	//alert(_center);
	$('.status').css({'left':_center,'display':'block'});
	setTimeout(function() {
		$('.status').effect('bounce',{ times:3,distance:30 }, 200);
	},
	1000);


}

function ShowStatus() {
	$('.status').fadeOut(1000);
}

$().ready(function() {

	var _status = $('.result').text();
	var _pageid = $('.pageid').text();
	if(_status=='success') {
		if(_pageid=='lease') {
			$('.status').css({'top':'400px'})
		}
	
		PositionStatus();
		setTimeout('ShowStatus()',2000);	
	}

	if($('#identifier').text()=='subdivisions') {
		$('.subd-header').click(function() {
			SubdivisionClick(this);
		});
		$('#add-subd').click(function() {
			SubdAdd();
		});
		$('.subd-field').focus(function() {
			$('.subd-button').removeAttr('disabled');
		});
		$('#action').click(function() {
			document.formAddEditSubd.submit();
		});
		$('#cancel').click(function() {
			SubdCancel();
		});
		$('#subd-delete').click(function() {
			SubdDelete();
		});
	}
});