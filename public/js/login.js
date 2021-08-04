async function loginHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        location.assign("/dash");
      } else {
        let result = await response.json();
        alert(result.message);
      }
    }
  }
  
  document.querySelector(".login").addEventListener("submit", loginHandler);