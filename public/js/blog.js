var user_signin_id = 1;

if (sessionStorage.getItem("seletedpostid")) {
  document.getElementById("sm-box").hidden = "";
  document.getElementById("sm-box").innerHTML = "Your Post been deleted";

  setTimeout(function() {
    document.getElementById("sm-box").hidden = "hidden";
    sessionStorage.removeItem("seletedpostid");
  }, 3000);
}

getAllPosts(function(err, data) {
  if (err) console.log(err);

  var container = document.getElementById("results-container");
  var parent = document.getElementById("bigcont");
  container.remove();

  data.map(function(element) {
    console.log(element);

    container = document.createElement("div");
    container.id = "results-container-" + element.posts_id;
    container.className = "results_container";
    var title = document.createElement("h3");
    var content = document.createElement("p");
    var user_name = document.createElement("p");
    var date = document.createElement("p");

    title.textContent = element.title;
    content.textContent = element.description;
    user_name.textContent = "written by: " + element.user_name;
    date.textContent = " on :" + element.date;

    container.appendChild(title);
    container.appendChild(content);
    container.appendChild(user_name);
    container.appendChild(date);
    parent.appendChild(container);

    if (user_signin_id == element.user_id) {
      var post_id = element.posts_id;
      var delet_btn = document.createElement("button");
      delet_btn.className = "delete";
      delet_btn.id = element.posts_id;

      delet_btn.innerHTML = "Delete";

      var edit_btn = document.createElement("button");
      edit_btn.className = "edit";
      edit_btn.innerHTML = "Edit";

      container.appendChild(delet_btn);
      container.appendChild(edit_btn);

      delet_btn.onclick = function(e) {
        console.log(e.target.id);
        location.href = "delete_post.html?post_id=" + e.target.id;
      };
    }
  });
});
