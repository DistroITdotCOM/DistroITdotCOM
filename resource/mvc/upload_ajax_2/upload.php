<?php

header('Content-type: text/xml');
if ($_FILES) {
    $title = $_POST['title'];
    $tmp_file = $_FILES['data']['tmp_name'];
    $filetype = $_FILES['data']['type'];
    $filesize = $_FILES['data']['size'];
    $filename = $_FILES['data']['name'];
    $path = pathinfo($_SERVER['PHP_SELF']);
    $destination = $path['dirname'] . '/' . $filename;
    if (move_uploaded_file($tmp_file, $_SERVER['DOCUMENT_ROOT'] . $destination))
        $status = 1;
    else
        $status = 2;
    echo "<?xml version=\"1.0\"?>\n";
    echo "<response>\n";
    echo "\t<status>$status</status>\n";
    if ($status == 1) {
        echo "\t<file>\n";
        echo "\t\t<title>$title</title>\n";
        echo "\t\t<name>$filename</name>\n";
        echo "\t\t<type>$filetype</type>\n";
        echo "\t\t<size>$filesize</size>\n";
        echo "\t</file>\n";
    }
    echo "</response>";
}
?>