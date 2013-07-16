<?php

//Grab vars and make local

$_email = $_POST["contact-email"];
$_phone = $_POST["contact-phone"];
$_name = $_POST["contact-name"];
$_message = $_POST["contact-message"];

require_once "Mail.php";

$to = "contact@kenyounghomes.com";
$subject = "KYH Website Contact";
//Sandra Sender <s5test@techpractical.com>
$reply = $_name . " <$_email>";
$from = "contact@kenyounghomes.com";
$body = "NAME: " . $from . "\nPHONE: " . $_phone . "\nEMAIL: " . $_email . "\n\n\n" . $_message;

$host = "kenyounghomes.com";
$username = "contact@kenyounghomes.com";
//$port = "2525";
$password = "50!3!55!84";

 $headers = array ('From' => $from,
   'To' => $to,
   'Subject' => $subject,
	'Reply-To' => $reply);
 $smtp = Mail::factory('smtp',
   array ('host' => $host,
	 'port' => $port,
     'auth' => true,
     'username' => $username,
     'password' => $password));

 $mail = $smtp->send($to, $headers, $body);

 if (PEAR::isError($mail)) {
   echo("<p class='status-message'>" . $mail->getMessage() . "</p>");
  } else {
   echo("<p class='status-message'>Message successfully sent!</p>");
  }
?>