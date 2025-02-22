document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");

  // Create Post
  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const imageLink = document.getElementById("imageLink").value;
    const description = document.getElementById("description").value;

    try {
      await axios.post("http://localhost:3000/posts", {
        imageLink,
        description,
      });
      alert("Post Added successfully Scroll down to check!");
      loadPosts();
      postForm.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });

  // Load Posts
  const loadPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const posts = response.data;
      posts.map((post) => {
        console.log(post);
      });
      postsContainer.innerHTML = "";

      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post card p-3";

        postElement.innerHTML = `
          <div class="text-center">
            <img src="${
              post.imageLink
            }" alt="Post Image" class="post-image img-fluid mb-3">
          </div>
          <p  class="text-center fw-bold fs-4">${post.description}</p>

          <div class="comments">
            ${post.comments
              .map(
                (comment) =>
                  `<div class="comment"><p><strong>Anonymus</strong> - ${comment.text}</p></div>`
              )
              .join("")}
          </div>

          <form class="commentForm mt-3" data-post-id="${post.id}">
            <div class="row g-2">
              <div class="col-8">
                <input type="text" class="form-control" placeholder="Add a comment" required>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-secondary w-100">Comment</button>
              </div>
            </div>
          </form>
        `;

        postsContainer.appendChild(postElement);
      });

      // Handling comment form submission
      document.querySelectorAll(".commentForm").forEach((form) => {
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const postId = form.getAttribute("data-post-id");
          const text = form.querySelector("input").value;

          try {
            await axios.post("http://localhost:3000/comments", {
              text,
              postId,
            });
            alert("Comment added successfully!");
            loadPosts();
          } catch (error) {
            console.error("Error adding comment:", error);
          }
        });
      });
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  loadPosts();
});
