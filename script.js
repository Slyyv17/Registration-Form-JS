const mailerSendApiKey = 'c86c87623b3c2c033e323cb9377c24b369a9c3d838534c71134c0376144687a3';

async function sendOTPEmail(toEmail, otp) {
    try {
        const response = await axios.get('emailConfig.json');
        const emailConfig = response.data;

        emailConfig.to[0].email = toEmail;
        emailConfig.to[0].username = toEmail.split('@')[0]; // Assuming username is part of the email before @
        emailConfig.personalization[0].email = toEmail;

        const emailData = {
            from: emailConfig.from,
            to: emailConfig.to,
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: ${otp}</p>`,
            personalization: emailConfig.personalization
        };

        await axios.post('https://api.mailersend.com/v1/email', emailData, {
            headers: {
                'Authorization': `Bearer ${mailerSendApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        showSnackbar('OTP sent to your email');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        showSnackbar('Error sending OTP email');
    }
}

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
        showSnackbar('Signup successful! Please log in.');

        document.getElementById("signup").style.display = "none";
        document.getElementById("login").style.display = "grid";
    } else {
        showSnackbar("Please fill in all fields");
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
            showSnackbar("Login successful");
            // Proceed to the next step or page
        } else {
            showSnackbar("Invalid username, email or password");
        }
    } else {
        showSnackbar("No user found, please sign up first");
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

            // Send OTP via email
            sendOTPEmail(forgetEmail, otp);

            document.getElementById("otpInput").style.display = "block";
            document.getElementById("verifyOTP-btn").style.display = "block";
        } else {
            showSnackbar("Invalid Email");
        }
    } else {
        showSnackbar("No user found, please sign up first");
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
        showSnackbar("OTP verified successfully. You can now reset your password.");
        // Show the new password section
        document.getElementById("forget-div").style.display = "none";
        document.getElementById("new-psw-div").style.display = "grid";
    } else {
        showSnackbar("Invalid OTP. Please try again.");
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
            showSnackbar("Password reset successfully. Please log in with your new password.");
            // Redirect to login
            document.getElementById("new-psw-div").style.display = "none";
            document.getElementById("login").style.display = "grid";
            clearForms();
        } else {
            showSnackbar("No user found, please sign up first");
        }
    } else {
        showSnackbar("Please enter a new password");
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

function showSnackbar(message) {
    const snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    snackbar.innerText = message;
    setTimeout(() => { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}
