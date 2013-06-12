<?php
header("Cache-Control: no-cache");
$data = array("Indonesia", "Singapura", "Malaysia", "Thailand", "Filipina", "Jepang", 
	"Korea Selatan", "Hongkong", "Myanmar", "India", "Kamboja", "Pakistan", "Bangladesh");
echo 'Negara di Asia: ' . $data[rand(0, count($data)-1)];
?>