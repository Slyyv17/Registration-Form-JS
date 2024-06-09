function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  const email = document.getElementById("signupEmail").value;

  if (username && email && password) {
    const user = {
      username: username,
      email: email,
      password: password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "grid";
  } else {
    alert("Please fill in all fields");
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);

    if (
      username === user.username &&
      email === user.email &&
      password === user.password
    ) {
      alert("Login successful");
      // Proceed to the next step or page
    } else {
      alert("Invalid username, email or password");
    }
  } else {
    alert("No user found, please sign up first");
  }
}

function showForgotPassword() {
  document.getElementById("signup").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("forget-div").style.display = "grid";
}

function generateOTP() {
  const forgetEmail = document.getElementById("forgetEmail").value;
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    if (user.email === forgetEmail) {
      const otp = generateRandomOTP();
      localStorage.setItem("otp", otp);
      alert(`Generated OTP: ${otp}`); // In a real application, send this via email
      document.getElementById("otpInput").style.display = "block";
      document.getElementById("verifyOTP-btn").style.display = "block";
    } else {
      alert("Invalid Email");
    }
  } else {
    alert("No user found, please sign up first");
  }
}

function generateRandomOTP() {
  const otpLength = 4;
  let otp = "";

  for (let i = 0; i < otpLength; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

function verifyOTP() {
  const enteredOTP = document.getElementById("otpInput").value;
  const storedOTP = localStorage.getItem("otp");

  if (enteredOTP === storedOTP) {
    alert("OTP verified successfully. You can now reset your password.");
    // Show the new password section
    document.getElementById("forget-div").style.display = "none";
    document.getElementById("new-psw-div").style.display = "grid";
  } else {
    alert("Invalid OTP. Please try again.");
  }
}

function newPassword() {
  const newPsw = document.getElementById("newPsw").value;
  if (newPsw) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.password = newPsw;
      localStorage.setItem("user", JSON.stringify(user));
      alert(
        "Password reset successfully. Please log in with your new password."
      );
      // Redirect to login
      document.getElementById("new-psw-div").style.display = "none";
      document.getElementById("login").style.display = "grid";
      clearForms();
    } else {
      alert("No user found, please sign up first");
    }
  } else {
    alert("Please enter a new password");
  }
}

function clearForms() {
  document.getElementById("signupUsername").value = "";
  document.getElementById("signupEmail").value = "";
  document.getElementById("signupPassword").value = "";
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginEmail").value = "";
  document.getElementById("loginPassword").value = "";
  document.getElementById("forgetEmail").value = "";
  document.getElementById("otpInput").value = "";
}

function showLogin() {
  document.getElementById("signup").style.display = "none";
  document.getElementById("forget-div").style.display = "none";
  document.getElementById("new-psw-div").style.display = "none";
  document.getElementById("login").style.display = "grid";
}
