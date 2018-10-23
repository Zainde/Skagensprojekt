<?php
// 2 things to see info:
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
// var_dump ($_SERVER);
// phpinfo();
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

include_once "includes/header.php" ;

?>

<!-- Placeholder for sidens indhold -->
<div id="content" ></div>


<script>



    let request =location.search.split("&")[0].replace("?","").split("=")[1];

    sessionStorage.setItem('ArtistId', request);

getMedia(sessionStorage.getItem('ArtistId'));

   console.log(sessionStorage.getItem('ArtistId'));

    function getMedia(id) {



        const PaintInfoSection = document.createElement("SECTION");
        PaintInfoSection.className = "info_cards";

        fetch("pages.json").then(response => {
//Returner data som json object
            return response.json();
        })
            .then(response => {
                for(let key of response) {

                    if (key.pagename == "artist.php"){

                        document.getElementById("content").innerHTML = "";

                        for(let item of key.content) {

                            if(item.lan === localStorage.getItem("lan")) {

                                if(item.id === id ) {




                                    // opret figure med billede og figcaption
                                    let painter = document.createElement("article");
                                    painter.className = "info_pic";
                                    // opret figure med billede og figcaption
                                    let ImgFigure = document.createElement("FIGURE");
                                    ImgFigure.className ="flex";
                                    let ImgCaption = document.createElement("FIGCAPTION");
                                    ImgCaption.className ="artists";
                                    let image = document.createElement("IMG");
                                    image.setAttribute("src", item.image);
                                    image.setAttribute("width", "100%");
                                    image.setAttribute("height", "auto");
                                    image.setAttribute("alt", item.name);
                                    ImgFigure.appendChild(image);
                                    ImgFigure.appendChild(ImgCaption);
                                    painter.appendChild(ImgFigure);


                                    let NameHeading = document.createElement("h2");
                                    let NAMEnode =  document.createTextNode(item.name);
                                    NameHeading.appendChild(NAMEnode);
                                    ImgCaption.appendChild(NameHeading);


                                    let element = document.getElementById("content");
                                    PaintInfoSection.appendChild(painter);
                                    element.appendChild(PaintInfoSection);





                                    //opret text om pågældende kunstner
                                    let paintinfo = document.createElement("article");

                                    paintinfo.className = "info_card";



                                    paintinfo.innerHTML = item.content;
                                   // paraNode.appendChild(artistinfo);




                                    PaintInfoSection.appendChild(paintinfo);
                                    element.appendChild(PaintInfoSection);



                                }}
                        }}}
            }).catch(error => {
            console.log(error);
        })


    }
</script>

<?php include_once "includes/footer.php"?>


