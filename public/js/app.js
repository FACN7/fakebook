function getAllPosts(cb) {
    var parsedData = {};
    fetch('/getAllPosts').then(data => data.json()).then(data => { cb(null, data); }).catch(err => console.log(err));

}

getAllPosts((err, data) => {
    console.log(data);

})


function getUserInfo(cb) {
    fetch("/getuserinfo", {
        method: "POST",
        body: null
    }).then(data => data.json()).then(userData => {
        let user_id=userData.user_id;
        let name= userData.name;
        let email=userData.email;

        console.log(userData);
        cb(user_id,name,email);

    }).catch(err => console.log(err));

}





getUserInfo(()=>{})
