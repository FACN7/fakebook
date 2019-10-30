function getAllPosts(cb){
var parsedData={};
fetch('/getAllPosts').then(data=>data.json()).then(data=>{cb(null,data);}).catch(err=>console.log(err));

}

getAllPosts((err,data)=>{
console.log(data);

})