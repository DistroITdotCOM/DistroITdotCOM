<html>
<head>
<title>Aplikasi Ketiga</title>
<script type="text/javascript" src="jquery-1.4.2.min.js"></script>
<script type="text/javascript">
function updateList(xml)
{
	if ($("status", xml).text() == "1")
	{
		$("#d2").empty();
		tmp = "<table border=\"1\">";
		tmp += "<tr><th>Nama</th><th>Isi Pesan</th></tr>";
		$("pesan", xml).each(function(id){
			pesan = $("pesan", xml).get(id);
			tmp += "<tr><td>" + $("nama", pesan).text() + "</td>";
			tmp += "<td>" + $("isi", pesan).text() + "</td></tr>";
		});
		tmp += "</table>";
		$("#d2").append(tmp);
	}
}

$(document).ready(function(){
	$("#formdata").submit(function(e){
		$.ajax({
			url: "proses_data.php",
			type: "POST",
			dataType: "XML",
			data: {nama: $("#nama").val(), isi: $("#isi").val()},
			success: function(xml) {
				$("#nama, #isi").val("");
				updateList(xml);
			}
		});		
		e.preventDefault();
	});
});
</script>
</head>
<body>
<div id="d1">
<form id="formdata">
Nama: <input type="text" name="nama" id="nama" />
Isi Pesan: <input type="text" name="isi" id="isi" />
<input type="submit" value="Kirim" />
</form>
</div>
<div id="d2"></div>
</body>
</html>