/**
 * Funktion til at hente sider med
 * Bruger fetch API til at hente data fra pages.json
 * @param page - Pagenamne der skal hentes
 * @param lan - Sprog som siden skal hentes på
 */



// tjekker om sprog er deffineret i localstorage, hvis ikke sættes sproget til da-DK som default
if(!localStorage.getItem("lan")){

    localStorage.setItem("lan", "da-DK");
}

// deffinere nyt sprog ved tryk på flagknapperne med classen language
let buttons = document.querySelectorAll(".language");

for(let btn of buttons) {
    btn.addEventListener("click", function() {
        localStorage.setItem("lan", this.dataset.lan);

    })




//Kalder ovenstående funktioner når siden loader

    let url = window.location.pathname;

//fjerner støj fra URL så filen med extension
    let filename = url.substring(url.lastIndexOf('/')+1);



//tjekker om url indeholder et filnavn
    if(filename == ''){
// hvis intet filnavn er i URL er brugeren i roden af domænet
// hvilket er ensbetydende med index filen
        filename = 'index.php';
        getPage("index.php", localStorage.getItem("lan"));

    }else {
// Ellers bruges filnavn der er i URL
        filename = filename;
    };




    if(!localStorage.getItem("lan")){
        // tjekker sprog browseren er installeret med
        getPage(filename, navigator.language);
    }
    else
    {
        // tager sideværdien fra local storage

        getPage(filename, localStorage.getItem("lan"));


    };



}




function getPage(page, lan) {

    // setter en constant til at indholde alle artikler som senre deffineres herunder
    const ExhibitSection = document.createElement("SECTION");
    // navngiver containerne cards for at angive flex på indholdet
    ExhibitSection.className = "cards";

    //Henter data fra pages.json
    fetch("pages.json").then(response => {
        //Returner data som json object i tilfælde af at filen er formateret anderledes
        return response.json()
    }).then(response => {
        //Loop igennem json objektet
        for (let key of response) {
            //Hvis pagename er lig med parameter page...
            if (key.pagename === page) {

                // eftersom siden vil appende hver gang der trykkes på en knap,
                // så tømmes kontaineren inden for ikke at floade denne med et loop af samme indhold

                document.getElementById("content").innerHTML = "";
                //Loop gennem key.content for at vælge sprog og indhold
                for(let item of key.content) {
                    //Hvis item.lan er lig med det parameter lan
                    if(item.lan === lan) {




                        // sætter titlen på siden i head title tagget
                        document.title = item.headTitle;


                        if(key.pagename == "exhibitions.php" )



                        {


                            // navngiver siden i h1 tag
                            document.getElementById("title").innerHTML = item.title;

                            //laver et link ud af hver artikels billede
                            let ImgLink = document.createElement("a");
                            // sætter de påkrævede attributter på linket
                            ImgLink.setAttribute("href", "exhibitions_info.php?id="+item.id)

                            // fremstiller en article til at indeholde et billede fra udstillingen
                            let exhibit = document.createElement("article");
                            // giver denne class card
                            exhibit.className = "card";

                            //fremstiller en figure til at indeholde billedet, og gøre siden semantisk korrekt
                            let ImgFigure = document.createElement("FIGURE");

                            //fremstiller en caption til billedet
                            let ImgCaption = document.createElement("FIGCAPTION");
                            //giver denne class exhibition
                            ImgCaption.className ="exhibitions";



                            //fremstiller et billede
                            let image = document.createElement("IMG");
                            //vedhæfter sourcecode til billedet
                            image.setAttribute("src", item.image);
                            //sætter bredden på dette
                            image.setAttribute("width", "100%");
                            //sætter højden på dette
                            image.setAttribute("height", "auto");
                            //sætter alt på dette
                            image.setAttribute("alt", item.name);


                            //tilføjer billede til linket
                            ImgLink.appendChild(image);
                            //Tilføjer billede til figuretag
                            ImgFigure.appendChild(ImgLink);
                            //tilføjer figcaption til figuretag
                            ImgFigure.appendChild(ImgCaption);
                            //tilføjer figure til articlen
                            exhibit.appendChild(ImgFigure);

                            //fremstiller en container til heading
                            let headingCont =  document.createElement("span");
                            //fremstiller en heading H"
                            let NameHeading = document.createElement("h2");
                            //fremstiller en textstrang ud fra navn på udstilling i json
                            let NAMEnode =  document.createTextNode(item.name);
                            
                            //Kobler navn på udstilling til H2
                            NameHeading.appendChild(NAMEnode);

                            headingCont.appendChild(NameHeading);
                            //kobler denne til figcaption
                            ImgCaption.appendChild(headingCont);


                            //fremstiller en paragraph
                            let Durationpara = document.createElement("p");
                            //fremstiller en textstrang ud fra varighed og lokation i json
                            let Durationnode =  document.createTextNode(item.duration + " | " + item.location); 
                            //Kobler varighed til paragraphen
                            Durationpara.appendChild(Durationnode);
                            //kobler denne til figcaption
                            ImgCaption.appendChild(Durationpara);

                            //Deffinere en variable til at holde data
                            let element = document.getElementById("content");

                            ExhibitSection.appendChild(exhibit)
                            //putter alla data fra article exhibit i den predeffinerede section content
                            element.appendChild(ExhibitSection);

                        }


                    }



                }
            }
        }

        //Viser eventuelle fejl fra fetch
    }).catch(error => {
        console.error(error);
    });
}


console.log(localStorage.getItem("lan"));
console.log(sessionStorage.getItem('ExhibitId'));



//Henter array med alle child elementer til #contentarea og kører en foreach på arrayet
document.querySelectorAll(".nav-list i").forEach( function(element) {
    //Toggler class tx-color-red til elementernes classList


    if( element.parentNode.getAttribute("href") == filename){


        element.classList.add('active');}


});

