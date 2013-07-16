
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<META name="description" content="We would love to hear from you! phone: 501-315-2595 email: contact@kenyounghomes.com" /> <!--PER-->
	<?php include('headcontent.php'); ?>
	<link rel='stylesheet' href='style/colorbox-inv.css' />
</head>

<body>

<p class='pageid hideme'>contact</p>

<?php
require_once('globals.php');
include_once('includes/header4i.htm');
include_once('includes/dropmenu.htm');
?>

<div class='content-area'>
<div class='wrapper'>


<div id='page-contact'>

	<div id='left-bar'>
		<div id='rates-container'>
			<div style="line-height:10px;font-weight:normal;font-size:9px;font-family:Tahoma;padding:0;margin:0;border:0;text-align:right;background:transparent;color:#EEEEEE;width:150px;text-align:center;" class="mlcalcRatesWidgetHolder" id="mlcalcRatesWidgetHolderAR">
				<script type="text/javascript">
					document.write(unescape("%3Cscript src='" + (document.location.protocol == 'https:' ? 'https://ssl.mlcalc.com' : 'http://cdn.mlcalc.com') + "/mortgage-rates/arkansas/widget-narrow.js' type='text/javascript'%3E%3C/script%3E"));
				</script>
				<p class='content-provider'>Powered by <a href="http://www.mlcalc.com/mortgage-rates/arkansas/" style="font-weight:normal;font-size:9px;font-family:Tahoma;color:#4C4C4C;text-decoration:none;">AR Interest Rates</a></p>
			</div>
		</div>

		<div id='mcalc-container'>
			<script type="text/javascript">
			mlcalc_default_calculator = 'mortgage';
			mlcalc_currency_code = 'usd';
			mlcalc_amortization = 'year_nc';
			mlcalc_purchase_price = '300,000';
			mlcalc_down_payment = '10';
			mlcalc_mortgage_term = '30';
			mlcalc_interest_rate = '4.5';
			mlcalc_property_tax = '3,000';
			mlcalc_property_insurance = '1,500';
			mlcalc_pmi = '0.52';
			mlcalc_loan_amount = '150,000';
			mlcalc_loan_term = '15';
			</script>
			<script type="text/javascript">
				if(typeof jQuery == "undefined"){document.write(unescape("%3Cscript src='" + (document.location.protocol == 'https:' ? 'https:' : 'http:') + "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
				mlcalc_jquery_noconflict=1;};
			</script>
			<div style="font-weight:normal;font-size:9px;font-family:Tahoma;padding:0;margin:0;border:0;text-align:center;background:transparent;color:#EEEEEE;width:150px;" id="mlcalcWidgetHolder">
				<script type="text/javascript">
					document.write(unescape("%3Cscript src='" + (document.location.protocol == 'https:' ? 'https://ssl.mlcalc.com' : 'http://cdn.mlcalc.com') + "/widget-narrow.js' type='text/javascript'%3E%3C/script%3E"));
				</script>
				<p class='content-provider'>Powered by <a href="http://www.mlcalc.com/" style="font-weight:normal;font-size:9px;font-family:Tahoma;color:#4c4c4c;text-decoration:none;">Loan Calculator</a>
			</div>
		</div>
	</div><!--end leftbar-->

	<div id='contact-frame'>
		<div id='contact'>
			<div id='contact-header'>
				Thank you for contacting us. At a minimum, please provide your email address and comment or
				question below.  If you wish, you may provide your name and phone number.  If you provide
				your phone number, you may be contacted by phone concerning your comment or question.
				Otherwise, you will be responded to via email.  Also, you may email us directly at <a href='mailto:contact@kenyounghomes.com'>contact@kenyounghomes.com</a>.
			</div>
			<br><br>
			<form id='contact-form' method='post' action='contact.php'>
				<p>
					<label for='contact-name' class='label-std'>Name:</label>
					<input type="text" name='contact-name' class='l150' />
				</p>
				<p>
					<label for='contact-email' class='label-std'>Email Address:</label>
					<input type="text" name='contact-email' class='required email l150'/>
				</p>
				<p>
					<label for='contact-phone' class='label-std'>Phone Number:</label>
					<input type="text" name='contact-phone' class='l150' />
				</p>
				<p>
					<label for='contact-question' class='label-std'>Comment/Question:</label>
					<textarea rows="5" cols="50" name='contact-message' class="required l150"></textarea>
				</p>
				<input type="submit" text='Submit' value='submit'>
			</form>
		</div>
	</div>

</div>

<?php
// If this is post back, handle
if(isset($_POST['contact-email'])) {
	include('process/contact-send.php');
}
?>

</body>
<script type='text/javascript'>
	ColorMe();
</script>
</html>