

<!DOCTYPE html>
<html lang="da-DK">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">

    <link rel="manifest" href="./manifest.webmanifest">

    <title></title>
      <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
              crossorigin="anonymous"></script>
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

      <link rel="shortcut icon" href="favicon/96x96.png" type="image/x-icon" />

<link rel="stylesheet" href="resources/css/main.css">
<script>
var url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
</script>
  </head>
  <body onload="noti();">



  <ul class="flag">
        <li><a class="language" data-lan="da-DK" onclick="getPage(filename, 'da-DK');getMedia(sessionStorage.getItem('ArtistId'));"><img  src="resources/img/dk.svg" alt="Dannebrog"></a></li>
        <li><a class="language" data-lan="en-gb" onclick="getPage(filename, 'en-gb');getMedia(sessionStorage.getItem('ArtistId'));"><img  src="resources/img/uk.svg" alt="union jack"></a></li>
        <li><a class="language" data-lan="de" onclick="getPage(filename, 'de');getMedia(sessionStorage.getItem('ArtistId'));"><img  src="resources/img/de.svg" alt="Deutche flagge"></a></li>
    </ul>

        <!-- Placeholder for sidens titel -->
        <h1 id="title"></h1>
<h1 id="pricetitle"></h1>





    
