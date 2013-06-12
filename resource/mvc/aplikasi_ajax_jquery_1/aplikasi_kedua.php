<html>
<head>
<title>Aplikasi Kedua</title>
<script type="text/javascript" src="jquery-1.4.2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	$("#update").click(function(e){
		$("#content").load("data.php");
		e.preventDefault();
	});
});
</script>
</head>
<body>
<input type="submit" value="Update" id="update" />
<div id="content"></div>
</body>
</html>