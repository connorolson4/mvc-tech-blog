async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById("usernameSignup").value.trim();
    const password = document.getElementById("passwordSignup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
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
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector(".signUp").addEventListener("submit", signupFormHandler);