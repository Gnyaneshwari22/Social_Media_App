document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("postForm");
  const postsContainer = document.getElementById("posts");

  postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const imageLink = document.getElementById("imageLink").value;
    const description = document.getElementById("description").value;

    try {
      const response = await axios.post("http://localhost:3000/posts", {
        imageLink,
        description,
      });
      loadPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });

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
        postElement.className = "post";
        postElement.innerHTML = `
                    <img src="${post.imageLink}" alt="Post Image">
                    <p>${post.description}</p>
                    <div class="comments">
                        ${post.comments
                          .map(
                            (comment) => `
                            <div class="comment">${comment.text}</div>
                        `
                          )
                          .join("")}
                    </div>
                    <form class="commentForm" data-post-id="${post.id}">
                        <input type="text" class="form-control" placeholder="Add a comment" required>
                        <button type="submit" class="btn btn-secondary">Comment</button>
                    </form>
                `;
        postsContainer.appendChild(postElement);
      });

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
