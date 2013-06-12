<?php
header('Content-type: text/xml');
echo "<?xml version=\"1.0\"?>\n";
echo "<response>\n";
if ($_FILES)
{
   $path = pathinfo($_SERVER['PHP_SELF']);
   $numfile = count ($_FILES['file']['name']);   
   echo "\t<status>1</status>\n";
   for ($i = 0; $i < $numfile; $i++)
   {
   	  $tmpfile = $_FILES['file']['tmp_name'][$i];
      $filetype = $_FILES['file']['type'][$i];
      $filesize = $_FILES['file']['size'][$i];
      $filename = $_FILES['file']['name'][$i];
      $destination = $path['dirname'] . '/' . $filename;
      if (move_uploaded_file($tmpfile, $_SERVER['DOCUMENT_ROOT'] . $destination))
      {
         echo "\t<file>\n";
         echo "\t\t<name>$filename</name>\n";
         echo "\t\t<type>$filetype</type>\n";
         echo "\t\t<size>$filesize</size>\n";
         echo "\t</file>\n";
      }
   }   
}
else echo "\t<status>2</status>\n";
echo "</response>";
?>