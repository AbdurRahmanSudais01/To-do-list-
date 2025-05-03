
// Registration Logic
window.onload = function(){
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser){

        window.location.href = "./home.html";
    }

}
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const userFullName = event.target.fullName.value;
    const userEmail = event.target.email.value;
    const userPassword = event.target.password.value;


    
    
    const users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage
    const existingUser = users.find(u => u.user_Email === userEmail);
    
    if (existingUser) {
        alert("User already exists!");
    }else{
        const user = {
            user_Name: userFullName,
            user_Email: userEmail,
            user_Password: userPassword,
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users)); // Save updated users list
        event.target.reset();
        alert("Registration successful!"); 
        window.location.href = "../index.html"; // Redirect to login page
    }
    
});

