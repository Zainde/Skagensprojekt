function getpage (page, langu) {
    fetch("/Artists/resources/jsons/artists.json").then(response =>{
        return response.json();
    }).then(data => {
        for (let key of data){
            // console.table(key);
            // console.log(key.pagename);
            if(key.pagename === page) {
                for(let item of key.content) {
                    console.log(item); 
                    if(item.lang === langu) {
                        document.getElementById("title").innerText = item.title; 
                        document.getElementById("content").innerHTML = item.content; 
                    }
                }
                // console.table(key.content);
            }
        }
        // console.log(data);
      }).catch(error =>{
        console.error(error);
      });
}
    
    getpage("artists.php", "dk"); 
    
    
    function getart (lan) {
    
        fetch("/Artists/resources/jsons/artists.json").then(response =>{
            return response.json();
        }).then(data => {
            let html = "<ul>";
            let ref = "href=" + '"' + "biography.php" + '"'; 
            let figur1 = "<figure><img href="; 
            let figcap1 = "><figcaption><h2>";
    
            for (let key of data) {
                // console.table(key);
                // console.log(key.pagename);
                for (let item of key.content) {
                    if(item.lan === lan) {
                        // console.log(key.pagename + " >> " + item.title); 
                        // figcap1 += key.name + "</h2><p>" + key.alive + "</p>"; 

                        html += "<li><a " + ref + "></a>" + figur1 + '"' + key.image + '"' + figcap1 + '"' + key.name + '"</h2><p>' + '"' + key.alive + '"</p></figcaption></figure></li>'; 

                        // html += "<li><a onclick=\"biography.php('" + key.pagename + "','" + item.lang + "')\">" + item.title + "</a></li>"; 
                        // html += "<li><a onclick=\"biography.php('" + figur1 + key.image + '"' <figure><img href="img"></figure></li>"
                }
                }
                    // console.table(key.content);
                    // <li><a href="biography.php"></a><figure><img href="img"></img><figcaption><h2>name</h2><p>alive</p></figcaption></figure></li>
            }
            // console.log(data);
            html += "</ul>"; 
            console.log(html); 
            document.getElementById("wrapper").innerHTML = html;
          }).catch(error =>{
            console.error(error);
          });
        }
        
        // getnav("de"); 