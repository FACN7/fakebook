function getAllPosts(cb) {
  data = [{
      user_name: "avi",
      posts_id: 1,
      user_id: 1,
      title: "first tilte",
      description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
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

getAllPosts(function (err, data) {
  if (err) console.log(err);

  var container = document.getElementById("results-container");
  var parent = document.getElementById("bigcont");
  container.remove();

  data.map(function (element) {
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
    date.className = "post-time"
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
      delet_btn.className = "delete btn";
      delet_btn.innerHTML = "Delete";

      var edit_btn = document.createElement("button");
      edit_btn.className = "edit btn";
      edit_btn.innerHTML = "Edit";

      container.appendChild(delet_btn);
      container.appendChild(edit_btn);
    }
  });
});