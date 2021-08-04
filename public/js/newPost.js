async function createPostHandler(event) {
    event.preventDefault();
  
    location.assign("/dash/new");
  }
  
  document.querySelector("#createNew").addEventListener("click", createPostHandler);