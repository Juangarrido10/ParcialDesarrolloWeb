document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const errorMessage = document.getElementById("error-message");
  
      const users = [
        { user: "cafeteria", pass: "1234", redirect: "index.html" },
      ];
  
      const validUser = users.find(u => u.user === username && u.pass === password);
  
      if (validUser) {
        window.location.href = validUser.redirect; 
      } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos";
      }
    });
  });
  