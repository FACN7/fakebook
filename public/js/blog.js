getUserInfo((err, user_id, name, email) => {
  var user_signin_id = null;
  if (err) {
    //if no ones logged in
    console.log("in blog.js: no user detected");
  } else {
    // if someone is logged in
    user_signin_id = user_id;

    if (sessionStorage.getItem("seletedpostid")) {
      document.getElementById("sm-box").hidden = "";
      document.getElementById("sm-box").innerHTML = "Your Post been deleted";

      setTimeout(function() {
        document.getElementById("sm-box").hidden = "hidden";
        sessionStorage.removeItem("seletedpostid");
      }, 3000);
    }
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
      title.className = "post-title";
      var content = document.createElement("p");
      content.className = "post-content";
      var user_name = document.createElement("p");
      user_name.className = "post-owner";
      var date = document.createElement("p");
      date.className = "post-time";
      title.textContent = element.title;
      content.textContent = element.description;
      user_name.textContent = "written by: " + element.name;
      date.textContent = " on :" + element.date;

      container.appendChild(title);
      container.appendChild(content);
      container.appendChild(user_name);
      container.appendChild(date);
      parent.appendChild(container);
      console.log("\\\\\\\\\\\\\\+");
      console.log(element.user_id);

      if (user_signin_id == element.user_id) {
        var post_id = element.posts_id;
        var delet_btn = document.createElement("button");

        delet_btn.id = element.posts_id;

        delet_btn.className = "delete btn";
        delet_btn.innerHTML = "Delete";

        var edit_btn = document.createElement("button");
        edit_btn.className = "edit btn";
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
});
