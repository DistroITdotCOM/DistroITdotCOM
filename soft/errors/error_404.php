<!--
To change this template, choose Tools | Templates
and open the template in the editor.
-->
<!DOCTYPE html>
<html>
    <head>
        <title>DistroITdotCOM - Page Not Found</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
            body {
                background-color: #D2DECA;
                text-align:center;
                font: 13px lucida grande,tahoma,verdana,arial,sans-serif;
                color:#3F420E;
            }

            #error {
                width:400px;
                margin:60px auto;
            }


            a{
                color:#506755;
                text-decoration:none;
                font-size:18px;
                font-weight: bold;
            }

            a:hover{
                color: #6D6E3E;
            }
        </style>
    </head>
    <body>
        <div id="error">
            <img src="<?= config_item('base_url') ?>res/img/404.png" alt="404 page not found"/>
            <p>Sepertinya ada yang mencuri halaman ini, laporkan kepada kami jika Anda menemui makhluk yang mencurigakan</p>
            <p><a href="<?= config_item('base_url') ?>">- DistroITdotCOM -</a></p>
        </div>
    </body>
</html>
