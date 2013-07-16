

<?php
include('../sql/subd-sql.php');
if(isset($_POST['rowid'])) {
	//process update
	// Send the query to MySQL

	$resultUpd = $mysqli->query($updQuery, MYSQLI_STORE_RESULT);

	if($mysqli->error) {
		$_status_message = "ERROR: " . $mysqli->error . "<br>";
	} else {
		$mysqli->commit();
		$_status_message = "Update successful";
	}

	//keep getting error on this.  thinnk maybde the commit takes care of it and destroys the object.  need to verify.
	//$resultUpd->free();

	echo "
	<script type='text/javascript'>\n

	alert(\"$_status_message\");
	</script>
	";
}
?>
<p id='identifier' class='hideme'>subdivisions</p>
<script type="text/javascript" src="kyh-admin.js"></script>
<div id='subdivisions-admin' class='down35'>
	<div id='subd-list'>
		<div id='spacer-row'>&nbsp;</div>
		<div id='subds-container'>
		<?php
		$result = $mysqli->query($query, MYSQLI_STORE_RESULT);

		while(list($id,$name,$content) = $result->fetch_row()) {

			$_html .= "<div id='$id'>";
			$_html .= "<p class='subd-header'>$name</p>";
			$_html .= "<input type='hidden' value='$content' id='content' name='content' class='hideme'/>";
			$_html .= "</div>";

			echo "$_html";
			$_html = "";
		}

		$_html = "<div><a href='#' id='add-subd'><p class='subd-header'>ADD NEW</p></a></div>";
		echo $_html;

		?>
		</div>
	</div>
	<div id='subd-content'>
		<div id='action-label'>&nbsp;</div>
		<div id='action-form'>
		<form id='formAddEditSubd' name='formAddEditSubd' action='index.php?pageid=content' method='post'>
			<input type='text' id='subd-name' name='subd-name' value='' class='subd-field' disabled />
			<textarea id='txt-content' name='txt-content' cols='60' rows='10' class='subd-field' disabled></textarea>
			<div id='subd-action-buttons'>
				<input type='button' id='action' name='action' value='SAVE' disabled class='subd-button'/>
				<input type='button' id='cancel' name='cancel' value='CANCEL' disabled class='subd-button'/>
				<a href='#' id='subd-delete'><p>DELETE THIS SUBDIVISION</p></a>
			</div>
			<input type='hidden' id='rowid' name='rowid' value='' />
			<input type='hidden' id='dowhat' name='dowhat' class='hideme' value='' />

		</form>
		</div>
		<input type='hidden' id='orig-content' name='orig-content' class='hideme subd-field-orig' value='' />
		<input type='hidden' id='orig-name' name='orig-name' class='hideme subd-field-orig' value='' />
	</div>

</div>

<?php
$result->free();
?>