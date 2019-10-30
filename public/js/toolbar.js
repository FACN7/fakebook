// (
function loadfunc() {
  var y = document.cookie;
  console.log(y);

  console.log("bananaaaa");
  var x = document.getElementById("whenconnect");
  jwt = y.split("=")[0];
  console.log("jwt= " + jwt);
  if (jwt != "") {
    //connect
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
// )();
