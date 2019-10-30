const messages = [
  "You Sign up successfuly", //0
  "You loged out successfuly", //1
  "Your post saved", //2
  "Your post deleted", //3
  "Your post updated", //4
  "* Please insert valid Email", //5
  "* Please insert valid Password", //6
  " *Please insert your name", //7
  " * Please confirm your password", //8
  " * Password and confirm password doesnt match!!!", //9
  " * This is not valide Email!!!" //10
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

//hamburger navbar
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function showErrorBox(message_number) {
  document.getElementById("err_signin").hidden = "";
  document.getElementById("err_signin").innerHTML = messages[message_number];
}
function validateEmail(email) {
  var re = /[^@]+@[^\.]+\..+/;
  return re.test(email);
}

function signin() {
  var signin_email = document.getElementById("signin_email").value;
  var signin_password = document.getElementById("signin_password").value;
  if (signin_email == "") {
    showErrorBox(5);
  } else if (signin_password == "") {
    showErrorBox(6);
  }
  //here we check details with DB
}

function signup() {
  var signup_name = document.getElementById("signup_name").value;
  var signup_email = document.getElementById("signup_email").value;
  var signup_password = document.getElementById("signup_password").value;
  var signup_conf_password = document.getElementById("signup_conf_password")
    .value;

  if (signup_name == "") {
    showErrorBox(7);
  } else if (signup_email == "") {
    showErrorBox(5);
  } else if (signup_password == "") {
    showErrorBox(6);
  } else if (signup_conf_password == "") {
    showErrorBox(8);
  } else if (signup_password.localeCompare(signup_conf_password) != 0) {
    showErrorBox(9);
  } else if (!validateEmail(signup_email)) {
    showErrorBox(10);
  } else {
    document.getElementById("err_signin").hidden = "hidden";
  }
  //here we check details with DB
}
