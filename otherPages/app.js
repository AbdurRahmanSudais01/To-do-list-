
// Registration Logic
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const userFullName = event.target.fullName.value;
    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;
    console.log('userName: ', userFullName);
    console.log('userEmail: ', userEmail);
    console.log('userPassword: ', userPassword);

    const user = {
        user_Name: userFullName,
        user_Email: userEmail,
        user_Password: userPassword,
    }


    const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage
    const existingUser = users.find(u => u.user_Email === userEmail);
    
    if (existingUser) {
        alert("User already exists!");
        return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users)); // Save updated users list
    event.target.reset();
    alert("Registration successful!"); 
    window.location.href = "../login.html"; // Redirect to login page
    
});

