//hamburger navbar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const messages = [
  "You Sign up successfuly",
  "You loged out successfuly",
  "Your post saved",
  "Your post deleted",
  "Your post updated"
];
(function show_alert() {
  if (sessionStorage.getItem("logout")) {
    document.getElementById("sm_box").innerHTML = messages[1];
    document.getElementById("sm_box").style.backgroundColor = "green";
    document.getElementById("sm_box").hidden = "";

    setTimeout(function() {
      document.getElementById("sm_box").hidden = "hidden";
      sessionStorage.removeItem("logout");
    }, 3000);
  }
})();
