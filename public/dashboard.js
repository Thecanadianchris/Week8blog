const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login.html";
}




const postForm = document.getElementById("post-form");
const postTitle = document.getElementById("post-title");
const postContent = document.getElementById("post-content");
const postCategory = document.getElementById("post-category");
const myPostsDiv = document.getElementById("my-posts");
const message = document.getElementById("message");




let editingId = null;

document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "/";
});






const loadCategories = async () => {
  const response = await fetch("/api/categories");
  const categories = await response.json();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    postCategory.appendChild(option);
  });
};





const loadMyPosts = async () => {
  const response = await fetch("/api/posts/mine", {
    headers: { Authorization: "Bearer " + token },
  });


  if (response.status === 401) {
    window.location.href = "/login.html";
    return;
  }



  const posts = await response.json();
  myPostsDiv.innerHTML = "";

  posts.forEach((post) => {
    const postDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = post.title;

    const content = document.createElement("p");
    content.textContent = post.content;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      // put the post into the form so it can be changed
      editingId = post.id;
      postTitle.value = post.title;
      postContent.value = post.content;
      postCategory.value = post.categoryId;
    });






    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await fetch("/api/posts/" + post.id, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      loadMyPosts();
    });

    postDiv.appendChild(title);
    postDiv.appendChild(content);
    postDiv.appendChild(editButton);
    postDiv.appendChild(deleteButton);
    postDiv.appendChild(document.createElement("hr"));
    myPostsDiv.appendChild(postDiv);
  });
};






postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const body = JSON.stringify({
    title: postTitle.value,
    content: postContent.value,
    categoryId: postCategory.value,
  });

  let response;

  if (editingId) {
    // we are editing an existing post
    response = await fetch("/api/posts/" + editingId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  } else {
    // we are creating a new post
    response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: body,
    });
  }

  if (response.ok) {
    editingId = null;
    postForm.reset();
    loadMyPosts();
  } else {
    message.textContent = "Could not save the post";
  }
});

loadCategories();
loadMyPosts();