<?php

/*If in admin mode, when click on inventory row, open this as modal allowing for edit.
need to also add ADD means.  Pictures will be handled separately.
*/

//THIS SHOULD BE A SMARTY TEMPLATE

//Use same field content validation as on contact page

?>

<div id='inventory-edit'>
	<form method='post' action=''>
		<p>
			<label for='sel-subdivisions' class='label-inv'>subdivision</label>
			<select id='sel-subdivisions'>
				<option value='Briarstone'>Briarstone</option>
				<option value='Hickory Heights'>Hickory Heights</option>
				<option value='Kings Crossing'>King's Crossing</option>
				<option value='Prospect Park'>Prospect Park</option>
				<option value='The Woodlands'>The Woodlands</option>
			</select>
		</p>
		<p>
			<label for='txt-address' class='label-inv'>address</label>
			<input type='text' id='txt-address'>
		</p>
		<p>
			<label for='txt-price' class='label-inv'>price</label>
			<input type='text' id='txt-price'>
		</p>
		<p>
			<label for='txt-plan' class='label-inv'>plan</label>
			<input type='text' id='txt-plan'>
		</p>
		<p>
			<label for='txt-compdate' class='label-inv'></label>
			<input type='text' id='txt-compdate'>
		</p>
		<p>
			<label for='chk-issold' class='label-inv'>sold</label>
			<input type='checkbox' id='chk-issold'>

		</p>
		<input type='submit' value='SAVE CHANGES'>
	</form>
</div>