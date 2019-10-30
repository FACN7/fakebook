const urlParams = new URLSearchParams(window.location.search);
const post_id = urlParams.get("post_id");

function deletPostFromDB(e) {
  var parsedData = {};
  fetch("/delete_post", {
    method: "POST",
    body: JSON.stringify({ post_id })
  }).catch(err => console.log(err));
  sessionStorage.setItem("seletedpostid", "true");

  location.href = "blog.html";
}
