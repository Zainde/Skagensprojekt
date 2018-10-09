fetch("/resources/jsons/songs.json").then(response =>{
  return response.json();
}).then(data=>{
  for (let key of data){
  console.table(key);
  }
});
