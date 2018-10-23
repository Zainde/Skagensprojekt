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
    const PaintSection = document.createElement("SECTION");
    // navngiver containerne cards for at angive flex på indholdet
    PaintSection.className = "cards";

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


                        if(key.pagename == "poul.php" ){


                        let PoulHeading = document.createElement("H1");

                        PoulHeading.className = "pouloverskrift";

                            let Poulnode =  document.createTextNode(item.headTitle);

                            PoulHeading.appendChild(Poulnode);


                           let poulelement = document.getElementById("content");


                          poulelement.appendChild(PoulHeading);



                     }






                   else  if(key.pagename == "artist.php" )



                        {


                            // navngiver siden i h1 tag
                            document.getElementById("title").innerHTML = item.title;

                            //laver et link ud af hver artikels billede
                            let ImgLink = document.createElement("a");
                            // sætter de påkrævede attributter på linket
                            ImgLink.setAttribute("href", "artist_info.php?id="+item.id)

                            // fremstiller en article til at indeholde billedet af kunstneren
                            let painter = document.createElement("article");
                            // giver denne class card
                            painter.className = "card";

                            //fremstiller en figure til at indeholde billedet, og gøre siden semantisk korrekt
                            let ImgFigure = document.createElement("FIGURE");

                            //fremstiller en caption til billedet
                            let ImgCaption = document.createElement("FIGCAPTION");
                            //giver denne class artist
                            ImgCaption.className ="artists";



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
                            painter.appendChild(ImgFigure);

                            //fremstiller en container til heading
                            let headingCont =  document.createElement("span");
                            //fremstiller en heading H"
                            let NameHeading = document.createElement("h2");
                            //fremstiller en textstrang ud fra kunstnernavn i json
                            let NAMEnode =  document.createTextNode(item.name);
                            //fremstiller link til wiki
                            let wikiLink = document.createElement("a");
                            wikiLink.className ="wiki_link";
                            wikiLink.setAttribute("href", item.wiki);

                            let seeWikie = "";
                            let onWiki = "";

                            if(item.lan == "da-DK"){

                                seeWikie = "Info om";
                                onWiki = "på wikipedia"
                            } else if (item.lan == "de"){

                                seeWikie = "Infos über";
                                onWiki = "auf wikipedia"
                            }else {

                                seeWikie = "Info about";
                                onWiki = "on wikipedia"
                            }


                            wikiLink.setAttribute("title", seeWikie +' '+ item.name +' '+ onWiki);
                            wikiLink.setAttribute("target", "_blank");

                            //fremstille icon til wiki
                            let WikiIcon = document.createElement("i");
                            WikiIcon.className ="fab fa-wikipedia-w";
                            //Kobler kunstnernavn til H2
                            NameHeading.appendChild(NAMEnode);

                            // konstruering af wikilink
                            wikiLink.appendChild(WikiIcon);

                            headingCont.appendChild(NameHeading);
                            headingCont.appendChild(wikiLink);
                            //kobler denne til figcaption
                            ImgCaption.appendChild(headingCont);


                            //fremstiller en paragraph
                            let Alivepara = document.createElement("p");
                            //fremstiller en textstrang ud fra livstid i json
                            let ALIVEnode =  document.createTextNode(item.alive);
                            //Kobler livstid til paragraphen
                            Alivepara.appendChild(ALIVEnode);
                            //kobler denne til figcaption
                            ImgCaption.appendChild(Alivepara);

                            //Deffinere en variable til at holde data
                            let element = document.getElementById("content");

                            PaintSection.appendChild(painter)
                            //putter alla data fra article painter i den predeffinerede section content
                            element.appendChild(PaintSection);

                    }


                    else  if(key.pagename == "info.php" )

                        {

   // navngiver siden i h1 tag
                            document.getElementById("pricetitle").innerHTML = item.title;

 // contact-info start
                            let ContactSection = document.createElement("Address");






                            ContactSection.className ="contact contact_original";

                            //fremtstiller den horisontale ruler
                            let ContactRuler = document.createElement("HR");

                            //fremstiller Heading H3
                            let ContactHeading = document.createElement("H3");
                            //fremstiller texten til H3
                            let ContactHeadingText =  document.createTextNode(item.contact);

                            //tilføjer Ruler til Contact sectionen
                            ContactSection.appendChild(ContactRuler);

                            //tilføjer texten til H3
                            ContactHeading.appendChild(ContactHeadingText);
                            //tilføjer H3 til contactsectionen
                            ContactSection.appendChild(ContactHeading);

                            //fremstilling af links til telefonnummer samt email adresse

                            let ContactTel = document.createElement("a");
                            ContactTel.className ="phonenumer";



                            let Teltext = "";

                            if(item.lan == "da-DK"){

                                Teltext = "Tlf:";

                            } else if (item.lan == "de"){

                                Teltext = "Tel:";
                            }else{

                                Teltext = "Tel:";
                            }


                            ContactTel.setAttribute("href", "tel:"+"key.Telephonenumber");

                            let Contactnode =  document.createTextNode(Teltext + key.Telephonenumber);

                            ContactTel.appendChild(Contactnode);

                            ContactSection.appendChild(ContactTel);

                            //link til emaladresse

                            let Contactmail = document.createElement("a");
                            Contactmail.className ="email";

                            Contactmail.setAttribute("href", "mailto:"+"key.EmailAdresse");

                            let emailnode =  document.createTextNode(key.EmailAdresse);

                            Contactmail.appendChild(emailnode);

                            ContactSection.appendChild(Contactmail);


                            let FB_link = document.createElement("a");
                            FB_link.setAttribute("href", "https://www.facebook.com/skagensmuseum");
                            let FB_Icon = document.createElement("i");
                            FB_Icon.className ="fab fa-facebook-f";

                            FB_link.appendChild(FB_Icon);

                            let Flickr_link = document.createElement("a");
                            Flickr_link.setAttribute("href", "https://www.flickr.com/photos/skagensmuseum/albums");
                            let Flickr_Icon = document.createElement("i");
                            Flickr_Icon.className ="fab fa-flickr";
                            Flickr_link.appendChild(Flickr_Icon);

                            let Insta_link = document.createElement("a");
                            Insta_link.setAttribute("href", "https://www.instagram.com/skagensmuseum/");
                            let Insta_Icon = document.createElement("i");
                            Insta_Icon.className ="fab fa-instagram";
                            Insta_link.appendChild(Insta_Icon);

                            let Pinter_link = document.createElement("a");
                            Pinter_link.setAttribute("href", "https://www.pinterest.dk/skagenskunstmus/");
                            let Pinter_Icon = document.createElement("i");
                            Pinter_Icon.className ="fab fa-pinterest";
                            Pinter_link.appendChild(Pinter_Icon);

                            let Twitter_link = document.createElement("a");
                            Twitter_link.setAttribute("href", "https://twitter.com/skagensmuseum");
                            let Twitter_Icon = document.createElement("i");
                            Twitter_Icon.className ="fab fa-twitter";
                            Twitter_link.appendChild(Twitter_Icon);

                            ContactSection.appendChild(FB_link);
                            ContactSection.appendChild(Flickr_link);
                            ContactSection.appendChild(Insta_link);
                            ContactSection.appendChild(Pinter_link);
                            ContactSection.appendChild(Twitter_link);



                            let ContactClone = ContactSection.cloneNode(true)
                            ContactSection.className ="contact contact_clone";









// contact-info slut


//figure sammensætning start

                            //fremstiller en figure til at indeholde billedet, og gøre siden semantisk korrekt
                            let InfoFigure = document.createElement("FIGURE");
                            InfoFigure.className ="Pricing_card center";

                            //fremstiller en caption til billedet
                            let InfoCaption = document.createElement("FIGCAPTION");
                            //giver denne class artist
                            InfoCaption.className ="Infos";

                            let InfoCaptionHeading = document.createElement("H2");
                            let InfoCaptionHeadingText =  document.createTextNode(item.title);

                            InfoCaptionHeading.appendChild(InfoCaptionHeadingText);
                            InfoCaption.appendChild(InfoCaptionHeading);


                            //fremstiller et billede

                            let Infoimage = document.createElement("IMG");
                            //vedhæfter sourcecode til billedet
                            Infoimage.setAttribute("src", key.pagepicture);
                            //sætter bredden på dette
                            Infoimage.setAttribute("width", "100%");
                            //sætter højden på dette
                            Infoimage.setAttribute("height", "auto");
                            //sætter alt på dette
                            Infoimage.setAttribute("alt", item.opening_hours);
                            //tilføj billede til figure
                            InfoFigure.appendChild(Infoimage);
                            InfoFigure.appendChild(ContactSection);
                            InfoFigure.appendChild(InfoCaption);
//figure sammensætning ends

//Åbningstider start start
                            let LineIcone = document.createElement("i");
                            LineIcone.className ="far fa-clock";
                            let LineHeading = document.createElement("div");
                            LineHeading.className ="LineThrough";

                            let Headingspan = document.createElement("span");
                            let OpeningHeading = document.createElement("h3");

                            let Opennode =  document.createTextNode(item.opening_hours);

                            OpeningHeading.appendChild(Opennode);
                            Headingspan.appendChild(OpeningHeading);
                            LineHeading.appendChild(Headingspan);

                            //åbningstider skagen
                            let OpeningSectionSkagen = document.createElement("SECTION");
                            OpeningSectionSkagen.className = "Pricing_card center";
                            let OpeningSkagen = document.createElement("article");

                            OpeningSkagen.innerHTML = item.Open_skagen+ item.Open_ancher + item.Open_drachmann;

                            OpeningSectionSkagen.appendChild(LineIcone);
                            OpeningSectionSkagen.appendChild(LineHeading);
                            OpeningSectionSkagen.appendChild(OpeningSkagen);
//Åbningstider start slut

//priser start start

                            //pricing skagen
                            let PriceIcone = document.createElement("i");
                            PriceIcone.className ="fas fa-dollar-sign";
                            let Linethrough = document.createElement("div");
                            Linethrough.className ="LineThrough";

                            let Linespan = document.createElement("span");
                            let PricingHeading = document.createElement("h3");

                            let Pricingnode =  document.createTextNode(item.pricing);
                            PricingHeading.appendChild(Pricingnode);
                            Linespan.appendChild(PricingHeading);
                            Linethrough.appendChild(Linespan);

                            //Combopricing start

                            let ComboPrice = document.createElement("article");
                            ComboPrice.className ="combo";
                            ComboPrice.innerHTML = item.combo;





                            //Entrepriser skagen
                            let AdmissionHeading = document.createElement("h3");

                            let Admissionnode =  document.createTextNode(item.admission);
                            AdmissionHeading.appendChild(Admissionnode);


                            let PricingSectionSkagen = document.createElement('SECTION');
                            PricingSectionSkagen.className = "Pricing_card center";
                            let PriceingSkagen = document.createElement("article");


                            PriceingSkagen.innerHTML = item.Price_skagen + item.Price_ancher + item.Price_drachmann;

                            PricingSectionSkagen.appendChild(PriceIcone);
                            PricingSectionSkagen.appendChild(Linethrough);
                            PricingSectionSkagen.appendChild(ComboPrice);
                            PricingSectionSkagen.appendChild(AdmissionHeading);
                            PricingSectionSkagen.appendChild(PriceingSkagen);
                            PricingSectionSkagen.appendChild(ContactClone);
//priser start slut



//sammensætning af siden start

                            //tilføjer figure til info
                            PaintSection.appendChild(InfoFigure);


                            //tilføj Åbningsheader til info
                            PaintSection.appendChild(OpeningSectionSkagen);


                            //tilføj pricing til section
                            PaintSection.appendChild(PricingSectionSkagen);



//sammensætning af siden start

//indsætning af siden i containteren content
                            let element = document.getElementById("content");

                            element.appendChild(PaintSection);


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
console.log(sessionStorage.getItem('ArtistId'));



    //Henter array med alle child elementer til #contentarea og kører en foreach på arrayet
    document.querySelectorAll(".nav-list i").forEach( function(element) {
        //Toggler class tx-color-red til elementernes classList


      if( element.parentNode.getAttribute("href") == filename){


        element.classList.add('active');}


    });

