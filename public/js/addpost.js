function addNewPost() {
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;

  if (title != "" && content != "") {
    fetch("/addPost", {
      method: "POST",
      body: JSON.stringify({
        title,
        content
      })
    }).catch(err => console.log(err));
    location.href = "blog.html";
  }
}
