<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_mysqlLocal = "localhost";
$database_mysqlLocal = "kenyoung_primary";
$username_mysqlLocal = "kenyoung_www";
$password_mysqlLocal = "l1ttl3gr33n";
$mysqlLocal = mysql_pconnect($hostname_mysqlLocal, $username_mysqlLocal, $password_mysqlLocal) or trigger_error(mysql_error(),E_USER_ERROR); 
?>