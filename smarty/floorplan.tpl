<div class='plan-detail'>{$planNum} square feet&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$numBed} bed, {$numBath} bath&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$planPrice}</div>
<div id='outside' style="background-color:#fff">
	<div class='floorplan'>
		<img src='{$planUrl}' id='{$planNum}'>
	</div>
	<div id='therest'>
		<div id='specs'>
			&nbsp;{*
			<p>{$planNum} square feet</p>
			<p>{$numBed} bed, {$numBath} bath</p>
			<p>{$planPrice}</p>
			*}
		</div>
		{foreach from=$elevationFiles item=iter}
			<div id='elevation' class='c-elevations'>
				<img src='{$iter}' alt="test" id='{$planNum}' />
			</div>
		{/foreach}
	</div>
</div>
<div class="spacer-row">&nbsp;</div>