function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function signup() {
  let email = document.querySelector("#signupForm input[type=email]").value;
  let password = document.querySelector("#signupForm input[type=password]").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ email, password });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup Successful");
}

function login() {
  let email = document.querySelector("#loginForm input[type=email]").value;
  let password = document.querySelector("#loginForm input[type=password]").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let found = users.find(user => user.email === email && user.password === password);

  if (found) {
    localStorage.setItem("currentUser", JSON.stringify(found));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}