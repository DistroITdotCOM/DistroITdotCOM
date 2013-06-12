<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'ajax';

header("Content-type: text/xml");
header("Cache-Control: no-cache");
$conn = mysql_connect($host, $user, $pass);
mysql_select_db($dbname, $conn);
foreach ($_POST as $key => $value) {
	$$key = mysql_real_escape_string($value, $conn);
}

if (!empty($nama))
{
	mysql_query("INSERT INTO pesan (nama, isi) VALUES ('" . $nama . "', '" . $isi . "')");
}

$pesan = mysql_query("SELECT * from pesan", $conn);
if (mysql_num_rows($pesan) == 0) $status = 2;
else $status = 1;

echo "<?xml version=\"1.0\"?>\n";
echo "<response>\n";
echo "\t<status>$status</status>\n";
while ($row = mysql_fetch_array($pesan))
{
	echo "\t<pesan>\n";
	echo "\t\t<nama>$row[nama]</nama>\n";
	echo "\t\t<isi>$row[isi]</isi>\n";
	echo "\t</pesan>\n";
}
echo "</response>";
?>