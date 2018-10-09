<?php
// 2 things to see info:
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// var_dump ($_SERVER);
// phpinfo();
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
$pageTitle = "Forside";
$headTitle = "Forside for php test site";
include_once $_SERVER ["DOCUMENT_ROOT"] . "/resources/include/header.php" ;

 ?>
<img src="./favicon/apple-icon.png" alt="test image"/>

<button type="button" onclick="noti()">notify me now</button>

<button id="btnAdd" type="button" onclick="">notify me now</button>

 <?php
 include_once $_SERVER ["DOCUMENT_ROOT"] . "/resources/include/footer.php" ;

  ?>
