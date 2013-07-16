<div id='outside' style="background-color:#fff">
	<div class='floorplan'>
		<img src='{$planFile|cat:'.jpg'}' id='{$planNum}'>
	</div>
	<div id='therest'>
		<div id='specs'>
			<p>{$planNum} square feet</p>
			<p>3 bed, 2 bath</p>
			<p>{$planPrice}</p>
		</div>
		<!-- elevations really should be dynamic -->
		<!-- should be able to use combo of hiding overflow and centering to use elevation imgs as is -->
		<!-- and should images be stored as blobs?  Is there a performance consideration to this? -->
		<!--
		<div id='elevA' class='c-elevations'>
			<img src='{$elevationFiles}ea.jpg' alt="test" id='{$planNum}ea' />
		</div>
		<div id='elevB' class='c-elevations'>
			<img src='{$elevationFiles}eb.jpg' alt="test" id='{$planNum}eb' />
		</div>
		<div id='elevC' class='c-elevations'>
			<img src='{$elevationFiles}ec.jpg' alt="test" id='{$planNum}ec' />
		</div>
		-->
		{foreach from=$elevationFiles item=iter}
			<div id='elevation' class='c-elevations'>
				<img src='{$iter|cat: ".jpg"}' alt="test" id='{$planNum}ec' />
			</div>
		{/foreach}

	</div>
</div>