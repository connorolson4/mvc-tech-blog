async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="postTitle"]').value;
    const content = document.querySelector('textarea[name="postContent"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      location.assign("/dash");
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector(".newPost").addEventListener("submit", newFormHandler);