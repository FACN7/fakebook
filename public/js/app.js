function getAllPosts(cb) {
  var parsedData = {};
  fetch("/getAllPosts")
    .then(data => data.json())
    .then(data => {
      cb(null, data);
    })
    .catch(err => console.log(err));
}

getAllPosts((err, data) => {
  console.log(data);
});

function getUserInfo(cb) {
  fetch("/getuserinfo", {
    method: "POST",
    body: null
  })
    .then(data => data.json())
    .then(userData => {
      console.log(userData);

      if (userData == {}) {
        cb(new Error("user not found"));
      } else {
        let user_id = userData.user_id;
        let name = userData.name;
        let email = userData.email;

        console.log("arrived as user " + userData);
        cb(null, user_id, name, email);
      }
    })
    .catch(err => console.log(err));
}

getUserInfo(() => {});
