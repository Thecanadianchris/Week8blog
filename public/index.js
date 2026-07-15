const postsDiv = document.getElementById("posts");
const categorySelect = document.getElementById("category-select");





const loadCategories = async () => {
  const response = await fetch("/api/categories");
  const categories = await response.json();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
};




const loadPosts = async () => {
  let url = "/api/posts";
  if (categorySelect.value) {
    url = url + "?categoryId=" + categorySelect.value;
  }

  const response = await fetch(url);
  const posts = await response.json();

  postsDiv.innerHTML = "";

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.innerHTML =
      "<h2>" + post.title + "</h2>" +
      "<p>" + post.content + "</p>" +
      "<p><em>by " + post.user.username + " in " + post.category.name + "</em></p>" +
      "<hr>";
    postsDiv.appendChild(postDiv);
  });
};





categorySelect.addEventListener("change", loadPosts);

loadCategories();
loadPosts();