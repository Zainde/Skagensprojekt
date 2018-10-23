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

    sessionStorage.setItem('ExhibitId', request);

getMedia(sessionStorage.getItem('ExhibitId'));

   console.log(sessionStorage.getItem('ExhibitId'));

    function getMedia(id) {



        const ExhibitInfoSection = document.createElement("SECTION");
        ExhibitInfoSection.className = "info_cards";

        fetch("pages.json").then(response => {
//Returner data som json object
            return response.json();
        })
            .then(response => {
                for(let key of response) {

                    if (key.pagename == "exhibitions.php"){

                        document.getElementById("content").innerHTML = "";

                        for(let item of key.content) {

                            if(item.lan === localStorage.getItem("lan")) {

                                if(item.id === id ) {


                                     console.log("byg exhibit-info");

                                    // opret figure med billede og figcaption
                                    let exhibit = document.createElement("article");
                                    exhibit.className = "info_pic";
                                    // opret figure med billede og figcaption
                                    let ImgFigure = document.createElement("FIGURE");
                                    ImgFigure.className ="flex";
                                    let ImgCaption = document.createElement("FIGCAPTION");
                                    ImgCaption.className ="Exhibitions";
                                    let image = document.createElement("IMG");
                                    image.setAttribute("src", item.image);
                                    image.setAttribute("width", "100%");
                                    image.setAttribute("height", "auto");
                                    image.setAttribute("alt", item.name);
                                    ImgFigure.appendChild(image);
                                    ImgFigure.appendChild(ImgCaption);
                                    exhibit.appendChild(ImgFigure);


                                    let NameHeading = document.createElement("h2");
                                    let NAMEnode =  document.createTextNode(item.name);
                                    NameHeading.appendChild(NAMEnode);
                                    ImgCaption.appendChild(NameHeading);


                                    let element = document.getElementById("content");
                                    ExhibitInfoSection.appendChild(exhibit);
                                    element.appendChild(ExhibitInfoSection);





                                    //opret text om pågældende udstilling
                                    let exhibitinfo = document.createElement("article");

                                    exhibitinfo.className = "info_card";



                                    exhibitinfo.innerHTML = item.content;
                                   // paraNode.appendChild(Exhibitioninfo);




                                    ExhibitInfoSection.appendChild(exhibitinfo);
                                    element.appendChild(ExhibitInfoSection);



                                }}
                        }}}
            }).catch(error => {
            console.log(error);
        })


    }
</script>

<?php include_once "includes/footer.php"?>


