// (
function loadfunc() {
  var y = document.cookie;
  console.log(y);

  var whenconnect = document.getElementById("whenconnect");
  var notconnect = document.getElementById("notconnect");

  jwt = y.split("=")[0];
  console.log("jwt= " + jwt);

  if (jwt != "") {
    //connect
    whenconnect.style.display = "none";
    notconnect.style.display = "block";
    getUserInfo((user_id, name, email) => {
      welcoming_tag = document.getElementById("welcoming");
      if (welcoming_tag) {
        // if the welcoming tab exists, write the name
        welcoming_tag.textContent = "[ wekcome back " + name + " ]";
      }
    });
  } else {
    whenconnect.style.display = "block";
    notconnect.style.display = "none";
  }
}
// )();
notconnect;
