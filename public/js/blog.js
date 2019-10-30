function getAllPosts(cb) {
  data = [
    {
      user_name: "avi",
      posts_id: 1,
      user_id: 1,
      title: "first tilte",
      description: "this is my first title",
      date: "2019-10-28T22:00:00.000Z"
    },
    {
      user_name: "karem",
      posts_id: 2,
      user_id: 2,
      title: "karems tilte",
      description: "this is my karems title",
      date: "2019-10-29T22:00:00.000Z"
    }
  ];
  cb(null, data);
}

var user_signin_id = 2;

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
      var delet_btn = document.createElement("button");
      delet_btn.className = "delete";
      delet_btn.innerHTML = "Delete";

      var edit_btn = document.createElement("button");
      edit_btn.className = "edit";
      edit_btn.innerHTML = "Edit";

      container.appendChild(delet_btn);
      container.appendChild(edit_btn);
    }
  });
});
