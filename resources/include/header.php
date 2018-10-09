<?php
if (!isset($pageTitle)) {
  $pageTitle="PHP test site";
};
if (!isset($headTitle)) {
  $headTitle="PHP test site";
};
 ?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <!-- <?php include_once $_SERVER ["DOCUMENT_ROOT"] . "/resources/include/favicon.php" ; ?> -->
    <link rel="icon" href="./favicon/favicon.ico" />
    <link rel="manifest" href="./manifest.webmanifest">
    <title><?php echo $headTitle; ?></title>
  </head>
  <body>
    <header>
      <h1>
        <?php echo $pageTitle ?>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="index.php">forside</a>
          </li>
          <li>
            <a href="kontakt.php">kontakt os</a>
          </li>
        </ul>
      </nav>
    </header>
