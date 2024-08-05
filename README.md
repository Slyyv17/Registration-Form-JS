MY CASE STUDY
### Project Features

1. **User Signup**:
    - **Input Fields**: Username, Email, and Password fields for user registration.
    - **Local Storage**: Stores user details (username, email, password) in the browser's local storage.
    - **Snackbar Notifications**: Displays a snackbar message upon successful signup or error in filling fields.

2. **User Login**:
    - **Input Fields**: Username, Email, and Password fields for user login.
    - **Validation**: Checks credentials against data stored in local storage.
    - **Snackbar Notifications**: Displays a snackbar message upon successful login or invalid credentials.

3. **Forgot Password**:
    - **Email Verification**: Prompts the user to enter their registered email.
    - **OTP Generation**: Generates a random 4-digit OTP and stores it in local storage.
    - **OTP Email Sending**: Uses MailerSend API to send the OTP to the user's email.
    - **Snackbar Notifications**: Displays a snackbar message for successful OTP email or errors.

4. **OTP Verification**:
    - **Input Field**: Field for the user to enter the OTP received via email.
    - **Verification**: Validates the entered OTP against the one stored in local storage.
    - **Snackbar Notifications**: Displays a snackbar message for successful OTP verification or invalid OTP.

5. **Password Reset**:
    - **Input Field**: Field for the user to enter a new password.
    - **Password Update**: Updates the user's password in local storage.
    - **Snackbar Notifications**: Displays a snackbar message upon successful password reset or errors.

6. **Snackbar Notifications**:
    - **Design**: Custom CSS for a visually appealing snackbar.
    - **Functionality**: Displays messages for user actions and errors, enhancing user experience.

TECHNOLOGIES:
 - Javascript
 - JSON

Tools:
 - VSCode
 - MailerSend API
 - Git
